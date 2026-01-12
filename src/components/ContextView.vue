<template>
  <div>
    <p>장소</p>
    <p>{{ place?.ko }} ({{ place?.en }})</p>
  </div>
  <div>
    <p>상대</p>
    <p>{{ partner?.ko }} ({{ partner?.en }})</p>
  </div>
  <div v-for="(expr, index) in expressions" :key="expr.id">
    <p>표현{{ index + 1 }}</p>
    <p>{{ expr?.en }} ({{ expr?.ko }})</p>
  </div>
  <button v-if="!hideRefresh" @click="$emit('refresh')">새로 뽑기</button>
</template>
<script lang="ts">
import type { Expression, Partner, Place } from '@/types';
import type { PropType } from 'vue';

export default {
  name: 'ContextView',
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
