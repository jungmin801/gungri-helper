<template>
  <div class="p-4">
    <h2 class="mb-4 text-xl font-bold">저장된 궁리 목록</h2>

    <ul class="space-y-3">
      <li v-for="e in entries" :key="e.id" class="rounded border p-3">
        <div class="text-sm opacity-70">
          {{ new Date(e.createdAt).toLocaleString() }}
          · place: {{ e.placeId }} · partner: {{ e.partnerId }} · expr: {{ e.exprId1 }},
          {{ e.exprId2 }}
        </div>
        <div class="mt-2 whitespace-pre-wrap">{{ e.content }}</div>
      </li>
    </ul>

    <div v-if="isLoading" class="py-4 text-center opacity-70">불러오는 중...</div>
    <div v-else-if="!hasMore && entries.length > 0" class="py-4 text-center opacity-70">끝!</div>
    <div v-else-if="entries.length === 0 && !isLoading" class="py-8 text-center opacity-70">
      아직 저장된 항목이 없어.
    </div>

    <!-- 무한스크롤 트리거 -->
    <div ref="sentinel" class="h-10"></div>
  </div>
</template>

<script lang="ts">
import type { GungRiEntry } from '@/db/types';
import { fetchEntriesPage, type EntryCursor } from '@/service/fetchEntriesPage';

const PAGE_SIZE = 20;

export default {
  name: 'EntryListView',
  data() {
    return {
      entries: [] as GungRiEntry[],
      cursor: null as EntryCursor,
      hasMore: true,
      isLoading: false,
      io: null as IntersectionObserver | null,
    };
  },
  async mounted() {
    await this.loadNext(); // 첫 페이지
    this.setupInfiniteScroll();
  },
  beforeUnmount() {
    this.io?.disconnect();
  },
  methods: {
    async loadNext() {
      if (this.isLoading || !this.hasMore) return;

      this.isLoading = true;
      try {
        const { items, nextCursor } = await fetchEntriesPage({
          limit: PAGE_SIZE,
          cursor: this.cursor,
        });

        // 더 이상 없으면 hasMore=false
        if (items.length === 0) {
          this.hasMore = false;
          return;
        }

        // 누적
        this.entries.push(...items);
        this.cursor = nextCursor;

        if (items.length < PAGE_SIZE) this.hasMore = false;
      } finally {
        this.isLoading = false;
      }
    },

    setupInfiniteScroll() {
      const el = this.$refs.sentinel as HTMLDivElement | undefined;
      if (!el) return;

      this.io = new IntersectionObserver(
        (entries) => {
          const first = entries[0];
          if (first?.isIntersecting) {
            this.loadNext();
          }
        },
        { root: null, threshold: 0.1 },
      );

      this.io.observe(el);
    },
  },
};
</script>
