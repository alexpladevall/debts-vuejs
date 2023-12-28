<script lang="ts" setup>
// Imports
import router from '@/router';
import { useAuthStore, useDebtsStore } from '@/store';

// Store
const authStore = useAuthStore();
const debtsStore = useDebtsStore();

// Methods
const handleClickSignOff = async (): Promise<void> => {
  authStore.signOff();
  debtsStore.clearDebtsStore();
  await router.push({ name: 'signin' });
};
</script>

<template>
  <v-app-bar
    density="comfortable"
    flat
  >
    <v-spacer />

    <v-list-item
      v-if="authStore.getUsername && authStore.getFullName"
      lines="two"
      :title="authStore.getFullName"
      :subtitle="'@' + authStore.getUsername"
    />

    <v-btn
      v-if="authStore.getUsername && authStore.getFullName"
      icon
      @click="handleClickSignOff"
    >
      <v-icon size="small">
        mdi-logout
      </v-icon>
    </v-btn>
  </v-app-bar>
</template>
