<script setup lang="ts">
// Imports
import router from '@/router';

// Props
interface IAuthNavigationProps {
  title: string;
  goTo: string;
  arrowDirection: 'left' | 'right';
}

defineProps<IAuthNavigationProps>();
</script>

<template>
  <a
    class="text-primary text-decoration-none pointer"
    @click="router.push({ name: goTo })"
  >
    <v-icon
      v-if="arrowDirection === 'left'"
      icon="mdi-chevron-left"
    /> {{ title }} <v-icon
      v-if="arrowDirection === 'right'"
      icon="mdi-chevron-right"
    />
  </a>
</template>

<style lang="css" scoped>
.pointer {
  cursor: pointer;
}
</style>