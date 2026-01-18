<template>
  <div class="flex flex-col gap-8">
    <div class="text-center">
      <h1 class="mb-4 text-4xl font-bold md:text-3xl">궁리 도우미</h1>
      <p>상황과 표현을 뽑아 바로 써보는 영어 아웃풋 연습 도우미</p>
    </div>
    <ContextBlock
      :place="place"
      :partner="partner"
      :expressions="expressions"
      @refresh="refreshContext"
    />
    <EditorBlock @save="handleSave" v-model="content" :isSaving="isSaving" />
  </div>
</template>
<script lang="ts">
import { gungri } from '@/db/gungriDb';
import type { GungRiEntry } from '@/db/types';
import {
  getExpressionById,
  getPartnerById,
  getPlaceById,
  loadGungriData,
  pickRandomContext,
} from '@/service/randomContext';
import type { Expression, Partner, Place } from '@/types';

import { showToast } from '@/utils/toast';
import ContextBlock from '../block/ContextBlock.vue';
import EditorBlock from '../block/EditorBlock.vue';

const makeId = () =>
  crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export default {
  name: 'HomeView',
  components: {
    ContextBlock,
    EditorBlock,
  },
  props: {
    id: {
      type: String,
      required: false,
    },
  },
  computed: {
    isEditMode(): boolean {
      return !!this.id;
    },
  },

  data() {
    return {
      place: null as Place | null,
      partner: null as Partner | null,
      expressions: [] as Expression[],
      content: '',
      isSaving: false,
    };
  },
  async mounted() {
    await loadGungriData();

    if (!this.isEditMode) {
      this.refreshContext();
    } else {
      try {
        const entry = await gungri.entries.get(this.id as string);
        if (!entry) {
          this.place = null;
          this.partner = null;
          this.expressions = [];
          return;
        }
        this.content = entry.content ?? '';
        this.place = getPlaceById(entry.placeId);
        this.partner = getPartnerById(entry.partnerId);
        const e1 = getExpressionById(entry.exprId1);
        const e2 = getExpressionById(entry.exprId2);
        this.expressions = [e1, e2].filter(Boolean) as Expression[];
      } catch (e) {
        console.error(e);
        showToast('기록을 불러오는데 실패했습니다.', 'alert-error');
      }
    }
  },
  methods: {
    isQuotaError(e: unknown) {
      // DOMException / Error / 기타 객체 케이스를 최대한 넓게 커버
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const anyErr = e as any;
      const name = anyErr?.name ?? '';
      const message = String(anyErr?.message ?? '');

      return (
        name === 'QuotaExceededError' ||
        name === 'NS_ERROR_DOM_QUOTA_REACHED' || // 일부 브라우저
        message.toLowerCase().includes('quota') ||
        message.toLowerCase().includes('storage') ||
        message.toLowerCase().includes('exceeded')
      );
    },
    async handleSave() {
      if (!this.place?.id || !this.partner?.id || !this.expressions) {
        showToast('랜덤 데이터가 아직 준비되지 않았습니다.', 'alert-warning');
        return;
      }
      const trimmed = this.content.trim();
      if (!trimmed) {
        showToast('내용을 입력하세요.', 'alert-warning');
        return;
      }

      const entry: GungRiEntry = {
        id: this.isEditMode ? (this.id as string) : makeId(),
        content: trimmed,
        createdAt: Date.now(),
        placeId: this.place.id,
        partnerId: this.partner.id,
        exprId1: (this.expressions[0] && this.expressions[0].id) || 'expr_001',
        exprId2: (this.expressions[1] && this.expressions[1].id) || 'expr_002',
      };

      this.isSaving = true;
      try {
        await gungri.entries.put(entry);
        showToast('저장이 완료되었습니다.', 'alert-success');
        this.content = '';
      } catch (e) {
        console.error(e);
        if (this.isQuotaError(e)) {
          showToast(
            '저장공간이 부족해서 저장에 실패했어요.\n' +
              '불필요한 기록을 삭제한 뒤 다시 시도해주세요.',
            'alert-error',
          );
        } else {
          showToast('저장에 실패했습니다. 잠시 후 다시 시도해주세요.', 'alert-error');
        }
      } finally {
        this.isSaving = false;
      }
    },
    refreshContext() {
      const context = pickRandomContext();
      if (context.place) {
        this.place = context.place;
      }
      if (context.partner) {
        this.partner = context.partner;
      }
      const ex = context.expressions;
      if (ex && ex.length >= 2) {
        this.expressions = [ex[0]!, ex[1]!] as Expression[];
      }
    },
  },
};
</script>
<style></style>
