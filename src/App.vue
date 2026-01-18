<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useToasts } from '@/utils/toast';
import { loadGungriData } from './service/randomContext';
import { onMounted } from 'vue';

const route = useRoute();
const isActive = (path: string) => route.path.startsWith(path);

const { toasts } = useToasts();
onMounted(() => {
  loadGungriData().catch(console.error);
});
</script>

<template>
  <nav class="sticky top-0 z-10 border-b bg-white/80 backdrop-blur">
    <div class="flex h-12 items-center gap-2 px-4 md:px-8">
      <RouterLink
        to="/practice"
        class="btn btn-ghost btn-sm"
        :class="{ 'btn-active': isActive('/practice') }"
      >
        연습하기
      </RouterLink>

      <RouterLink
        to="/records"
        class="btn btn-ghost btn-sm"
        :class="{ 'btn-active': isActive('/records') }"
      >
        저장목록
      </RouterLink>

      <RouterLink
        to="/help"
        class="btn btn-ghost btn-sm"
        :class="{ 'btn-active': isActive('/help') }"
      >
        도움말
      </RouterLink>
    </div>
  </nav>
  <main class="min-h-[calc(100vh-3rem)] bg-blue-100/40 p-6 md:p-8">
    <RouterView></RouterView>
  </main>
  <div class="toast toast-top toast-end z-50">
    <div v-for="t in toasts" :key="t.id" class="alert" :class="t.type">
      <span>{{ t.message }}</span>
    </div>
  </div>
</template>
