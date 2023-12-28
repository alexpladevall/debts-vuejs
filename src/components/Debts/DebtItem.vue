<script lang="ts" setup>
// Imports
import { computed } from 'vue';

// Props
interface IDebtItemProps {
  name: string;
  balance: number
}

const props = defineProps<IDebtItemProps>();

const message = computed((): string =>
  (props.balance > 0)
    ? `${props.name} owes me ${props.balance}.`
    : `I owe ${props.name} ${Math.abs(props.balance)}.`
);
</script>

<template>
  <v-alert
    :type="balance > 0 ? 'success' : 'warning'"
    :icon="balance > 0 ? 'mdi-cash-plus' : 'mdi-cash-minus'"
    density="compact"
    prominent
  >
    {{ message }}
  </v-alert>
</template>