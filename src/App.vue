<script setup lang="ts"></script>
<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/list">전체보기</RouterLink>
  </nav>
  <main>
    <RouterView></RouterView>
  </main>
</template>

<style scoped></style>
