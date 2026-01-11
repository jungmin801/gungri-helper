<template>
  <textarea
    class="border"
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
  ></textarea>
  <button @click="$emit('save')" :disabled="isSaving">
    {{ isSaving ? '저장중...' : '저장' }}
  </button>
</template>
<script lang="ts">
import type { PropType } from 'vue';

export default {
  name: 'EditorView',
  props: {
    isSaving: { type: Boolean as PropType<boolean>, default: false },
    modelValue: { type: String as PropType<string>, default: '' },
  },
  emits: ['update:modelValue', 'save'],
};
</script>
<style></style>
