<template>
  <div>
    <div class="rounded-xl border bg-white p-8 shadow-md">
      <h2 class="border-b pb-6 text-xl font-bold">🎯 오늘의 구문</h2>
      <div class="my-6">
        <SituationSection :place="place" :partner="partner" />
      </div>
      <div class="space-y-6">
        <ExpressionSection
          v-for="(expr, index) in expressions"
          :key="expr.id ?? index"
          :expr="expr"
          :index="index"
        />
      </div>
      <div class="mt-8 flex justify-end">
        <button class="btn btn-outline" v-if="!hideRefresh" @click="$emit('refresh')">
          <RefreshCcw :size="14" />
          새로 뽑기
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import type { Expression, Partner, Place } from '@/types';
import type { PropType } from 'vue';
import { RefreshCcw } from 'lucide-vue-next';
import SituationSection from '../ui/SituationSection.vue';
import ExpressionSection from '../ui/ExpressionSection.vue';

export default {
  name: 'ContextBlock',
  components: {
    RefreshCcw,
    SituationSection,
    ExpressionSection,
  },
  props: {
    place: {
      type: Object as PropType<Place | null>,
      required: false,
      default: null,
    },
    partner: {
      type: Object as PropType<Partner | null>,
      required: false,
      default: null,
    },
    expressions: {
      type: Array as PropType<Expression[]>,
      required: true,
      default: () => [],
    },
    hideRefresh: { type: Boolean, default: false },
  },
  emits: ['refresh'],
};
</script>
<style></style>
