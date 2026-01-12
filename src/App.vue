<script setup lang="ts"></script>
<template>
  <nav>
    <RouterLink to="/records/new">새글쓰기</RouterLink>
    <RouterLink to="/records">전체보기</RouterLink>
  </nav>
  <main>
    <RouterView></RouterView>
  </main>
</template>

<style scoped></style>
