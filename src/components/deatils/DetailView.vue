<template>
  <div class="space-y-4 p-4">
    <div class="flex items-center justify-between">
      <button class="btn btn-ghost" @click="goBack">
        <ArrowLeft :size="14" />
        목록으로
      </button>
    </div>
    <div v-if="isLoading" class="py-8 text-center opacity-70">불러오는 중...</div>

    <div v-else-if="!entry" class="py-8 text-center opacity-70">존재하지 않는 기록입니다.</div>

    <template v-else>
      <div class="rounded-xl border bg-white p-8 shadow-md">
        <div class="text-sm opacity-70">
          {{ new Date(entry.createdAt).toLocaleString() }}
        </div>
        <div class="my-6">
          <SituationSection :place="place" :partner="partner" />
        </div>
        <div class="space-y-4">
          <ExpressionSection
            v-for="(expr, index) in expressions"
            :key="expr.id ?? index"
            :expr="expr"
            :index="index"
          />
        </div>
        <div class="mt-6">
          <h2 class="pb-2 text-xl font-bold">나의 작문</h2>
          <p class="h-40 whitespace-pre-wrap rounded border p-3">
            {{ entry.content }}
          </p>
        </div>
        <div class="mt-4 flex justify-end gap-4">
          <button class="btn btn-outline" @click="goEdit">
            <SquarePen :size="14" />
            수정
          </button>
          <button class="btn btn-outline btn-error" @click="deleteEntry">
            <Trash2 :size="14" />
            삭제
          </button>
        </div>
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

import { ArrowLeft, SquarePen, Trash2 } from 'lucide-vue-next';
import { showToast } from '@/utils/toast';
import SituationSection from '../ui/SituationSection.vue';
import ExpressionSection from '../ui/ExpressionSection.vue';

export default {
  name: 'RecordDetailView',

  props: {
    id: { type: String, required: true },
  },

  components: { SituationSection, ExpressionSection, ArrowLeft, Trash2, SquarePen },

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
    async deleteEntry() {
      if (!this.entry) return;

      const ok = confirm('이 기록을 삭제할까요?');
      if (!ok) return;

      try {
        await gungri.entries.delete(this.entry.id);

        // 삭제 후 이동 or 갱신
        this.$router.back(); // 또는 emit / reload
      } catch (e) {
        console.error(e);
        showToast('삭제에 실패했습니다.', 'alert-error');
      }
    },
  },
};
</script>
