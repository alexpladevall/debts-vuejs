<script lang="ts" setup>
// Imports

// Props
interface IAuthAlertProps {
  active: boolean;
  message: string;
}

defineProps<IAuthAlertProps>();
</script>

<template>
  <v-alert
    v-if="active"
    class="text-body-2"
    type="error"
    :text="message"
    variant="tonal"
  />
</template>