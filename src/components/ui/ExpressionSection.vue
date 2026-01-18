<template>
  <div class="border-border space-y-3 rounded-lg border p-6">
    <div class="flex items-center gap-3">
      <span class="badge badge-primary">표현{{ index + 1 }}</span>
    </div>

    <p class="text-xl font-bold leading-relaxed md:text-2xl">
      {{ expr.en }}
    </p>

    <p class="text-md md:text-md leading-relaxed text-gray-500">
      {{ expr.ko }}
    </p>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import type { Expression } from '@/types';

export default {
  name: 'ExpressionSection',
  props: {
    expr: {
      type: Object as PropType<Expression>,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
};
</script>
