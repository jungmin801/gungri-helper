<template>
  <ContextView
    :place="place"
    :partner="partner"
    :expressions="expressions"
    @refresh="refreshContext"
  />
  <EditorView @save="handleSave" v-model="content" :isSaving="isSaving" />
</template>
<script lang="ts">
import { gungri } from '@/db/gungriDb';
import type { GungRiEntry } from '@/db/types';
import { loadGungriData, pickRandomContext } from '@/service/randomContext';
import type { Expression, Partner, Place } from '@/types';
import ContextView from './ContextView.vue';
import EditorView from './EditorView.vue';

const makeId = () =>
  crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export default {
  name: 'HomeView',
  components: {
    ContextView,
    EditorView,
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
  methods: {
    async handleSave() {
      if (!this.place?.id || !this.partner?.id || !this.expressions) {
        alert('랜덤 데이터가 아직 준비되지 않았어.');
        return;
      }
      const trimmed = this.content.trim();
      if (!trimmed) {
        alert('내용을 입력해줘!');
        return;
      }

      const entry: GungRiEntry = {
        id: makeId(),
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
        alert('저장완료');
        this.content = '';
      } catch (e) {
        console.error(e);
        alert('저장실패');
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
