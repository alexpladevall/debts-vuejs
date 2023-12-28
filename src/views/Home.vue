<script lang="ts" setup>
// Imports
import { onMounted, ref } from 'vue';

import DefaultLayout from '@/layouts/DefaultLayout.vue';
import Loading from '@/components/Loading.vue';
import Debts from '@/components/Debts/Debts.vue';
import Operate from '@/components/Debts/Operate.vue';
import { useDebtsStore } from '@/store';

// Store
const debtsStore = useDebtsStore();

// Data
let loading = ref<boolean>(false);

// Hooks
onMounted(async (): Promise<void> => {
  await loadHomeInfo();
});

// Methods
const loadHomeInfo = async (): Promise<void> => {
  loading.value = true;
  await debtsStore.findDebts();
  await debtsStore.searchUsers();
  loading.value = false;
};
</script>

<template>
  <DefaultLayout>
    <v-responsive
      class="mx-auto mt-6"
      max-width="1200"
    >
      <h1 class="mb-4">
        Debts App
      </h1>
      
      <v-row
        class="mb-6"
        no-gutters
      >
        <v-col
          cols="12"
          md="6"
          class="mr-8"
        >
          <Operate
            :users="debtsStore.getUsers"
            :add-debt="debtsStore.addDebt"
            :load-home-info="loadHomeInfo"
          />
        </v-col>

        <v-col
          cols="12"
          md="5"
        >
          <Debts :debts="debtsStore.getDebts" />
        </v-col>
      </v-row>

      <Loading :active="loading" />
    </v-responsive>
  </DefaultLayout>
</template>
