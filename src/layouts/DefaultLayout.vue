<script lang="ts" setup>
// Imports
import AppBar from '@/components/AppBar.vue';
</script>

<template>
  <AppBar />

  <v-main>
    <v-container>
      <slot />
    </v-container>
  </v-main>
</template>
