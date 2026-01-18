<template>
  <div class="p-4">
    <h1 class="md:text-3x mb-4 text-3xl font-bold">저장 목록</h1>
    <ul class="space-y-4">
      <li
        v-for="e in entries"
        :key="e.id"
        class="cursor-pointer rounded-lg border bg-white p-6 shadow-md"
        @click="goDetail(e.id)"
      >
        <p class="text-xs text-gray-400">
          {{ new Date(e.createdAt).toLocaleString() }}
        </p>
        <div class="whitespace-pre-wrap py-4">{{ e.content }}</div>
        <div class="space-x-2">
          <span class="badge badge-ghost">{{ getExpressionById(e.exprId1)?.en || '-' }}</span>
          <span class="badge badge-ghost">{{ getExpressionById(e.exprId2)?.en || '-' }}</span>
          <span class="badge badge-ghost">📍 {{ getPlaceById(e.placeId)?.ko || '-' }}</span>
          <span class="badge badge-ghost">👤 {{ getPartnerById(e.partnerId)?.ko || '-' }}</span>
        </div>
      </li>
    </ul>

    <div v-if="isLoading" class="py-4 text-center opacity-70">불러오는 중...</div>
    <div v-else-if="entries.length === 0 && !isLoading" class="py-8 text-center opacity-70">
      저장된 항목이 없습니다.
    </div>

    <!-- 무한스크롤 트리거 -->
    <div ref="sentinel" class="h-10"></div>
  </div>
</template>

<script lang="ts">
import type { GungRiEntry } from '@/db/types';
import { fetchEntriesPage, type EntryCursor } from '@/service/fetchEntriesPage';
import { getPartnerById, getPlaceById, getExpressionById } from '@/service/randomContext';

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

    goDetail(id: string) {
      this.$router.push(`/records/${id}`);
    },
    getPartnerById(id: string) {
      return getPartnerById(id);
    },
    getPlaceById(id: string) {
      return getPlaceById(id);
    },
    getExpressionById(id: string) {
      return getExpressionById(id);
    },
  },
};
</script>
