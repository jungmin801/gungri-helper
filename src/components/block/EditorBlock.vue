<template>
  <div class="rounded-xl border bg-white p-8 shadow-md">
    <h2 class="border-b pb-6 text-xl font-bold">✍️ 작문하기</h2>
    <textarea
      class="my-6 h-40 w-full resize-none rounded-md border p-4"
      maxlength="300"
      placeholder="위의 표현들을 활용해서 주어진 상황에 맞는 문장을 만들어보세요. (최대 300자)"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    ></textarea>
    <div class="flex justify-end">
      <button @click="$emit('save')" :disabled="isSaving" class="btn btn-active btn-neutral">
        <Save :size="14" />
        {{ isSaving ? '저장중...' : '저장' }}
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { Save } from 'lucide-vue-next';
import type { PropType } from 'vue';

export default {
  name: 'EditorBlock',
  components: {
    Save,
  },
  props: {
    isSaving: { type: Boolean as PropType<boolean>, default: false },
    modelValue: { type: String as PropType<string>, default: '' },
  },
  emits: ['update:modelValue', 'save'],
};
</script>
<style></style>
