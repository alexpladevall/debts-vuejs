<script lang="ts" setup>
// Imports
import { ref } from 'vue';

import DebtItem from '@/components/Debts/DebtItem.vue';
import { IDebt } from '@/interfaces';

// Props
interface IDebtsProps {
  debts: IDebt[];
}

defineProps<IDebtsProps>();

// Data
let search = ref<string>();
</script>

<template>
  <v-row
    no-gutters
  >
    <v-col
      cols="7"
    >
      <h2 class="mb-4">
        Debts
      </h2>
    </v-col>
    <v-col cols="5">
      <v-text-field
        v-model="search"
        density="compact"
        hide-details
        placeholder="Search"
        prepend-inner-icon="mdi-magnify"
        style="max-width: 220px;"
        variant="solo"
      />
    </v-col>
  </v-row>

  <v-data-iterator
    :items="debts"
    :items-per-page="5"
    :search="search"
  >
    <template #no-data>
      <p>
        No pending debts.
      </p>
    </template>

    <template #default="{ items }">
      <template
        v-for="({ raw }) in items"
        :key="raw.id"
      >
        <DebtItem
          :name="raw.name"
          :balance="raw.balance"
          class="mb-2"
        />
      </template>
    </template>

    <template #footer="{ page, pageCount, prevPage, nextPage }">
      <div class="d-flex align-center justify-center pa-4">
        <v-btn
          :disabled="page === 1"
          icon="mdi-arrow-left"
          density="comfortable"
          variant="tonal"
          rounded
          @click="prevPage"
        />

        <div class="mx-2 text-caption">
          Page {{ page }} of {{ pageCount }}
        </div>

        <v-btn
          :disabled="page >= pageCount"
          icon="mdi-arrow-right"
          density="comfortable"
          variant="tonal"
          rounded
          @click="nextPage"
        />
      </div>
    </template>
  </v-data-iterator>
</template>