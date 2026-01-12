<template>
  <div class="space-y-4 p-4">
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-bold">궁리 상세</h2>

      <div class="flex gap-2">
        <button class="rounded border px-3 py-1" @click="goBack">목록</button>
        <button class="rounded border px-3 py-1" @click="goEdit">수정</button>
      </div>
    </div>

    <div v-if="isLoading" class="py-8 text-center opacity-70">불러오는 중...</div>

    <div v-else-if="!entry" class="py-8 text-center opacity-70">존재하지 않는 기록이야.</div>

    <template v-else>
      <div class="text-sm opacity-70">
        {{ new Date(entry.createdAt).toLocaleString() }}
      </div>
      <ContextView
        :place="place"
        :partner="partner"
        :expressions="expressions"
        :hideRefresh="true"
      />

      <div class="whitespace-pre-wrap rounded border p-3">
        {{ entry.content }}
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { gungri } from '@/db/gungriDb';
import type { GungRiEntry } from '@/db/types';

import type { Expression, Partner, Place } from '@/types';
import {
  loadGungriData,
  getPlaceById,
  getPartnerById,
  getExpressionById,
} from '@/service/randomContext';
import ContextView from './ContextView.vue';

export default {
  name: 'RecordDetailView',

  props: {
    id: { type: String, required: true },
  },

  components: { ContextView },

  data() {
    return {
      isLoading: false,
      entry: null as GungRiEntry | null,

      place: null as Place | null,
      partner: null as Partner | null,
      expressions: [] as Expression[],
    };
  },

  async mounted() {
    await this.loadDetail();
  },

  watch: {
    // 라우트가 같은 컴포넌트를 재사용할 수도 있어서 방어적으로 watch
    id() {
      this.loadDetail();
    },
  },

  methods: {
    async loadDetail() {
      this.isLoading = true;
      try {
        await loadGungriData();

        const entry = await gungri.entries.get(this.id);
        this.entry = entry ?? null;

        if (!entry) {
          this.place = null;
          this.partner = null;
          this.expressions = [];
          return;
        }

        this.place = getPlaceById(entry.placeId);
        this.partner = getPartnerById(entry.partnerId);

        const e1 = getExpressionById(entry.exprId1);
        const e2 = getExpressionById(entry.exprId2);
        this.expressions = [e1, e2].filter(Boolean) as Expression[];
      } catch (e) {
        console.error(e);
        this.entry = null;
      } finally {
        this.isLoading = false;
      }
    },

    goEdit() {
      this.$router.push(`/records/${this.id}/edit`);
    },

    goBack() {
      this.$router.push('/records');
    },
  },
};
</script>
