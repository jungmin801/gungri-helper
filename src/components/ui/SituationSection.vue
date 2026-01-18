<template>
  <div class="border-borderflex flex-wrap items-center gap-4">
    <div class="flex items-center gap-2">
      <span class="text-muted-foreground text-md font-medium">상황 : </span>
    </div>
    <div class="flex flex-wrap items-center gap-2">
      <span class="badge badge-ghost">📍 {{ place?.ko }}</span>
      <span class="badge badge-ghost">👤 {{ partner?.ko }}</span>
    </div>
  </div>
</template>
<script lang="ts">
import type { Partner, Place } from '@/types';
import type { PropType } from 'vue';

export default {
  name: 'SituationSection',
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
  },
};
</script>
<style></style>
