<script lang="ts" setup>
// Imports
import { ref, watch } from 'vue';

// Props
interface ILoadingProps {
  active: boolean;
}

const props = defineProps<ILoadingProps>();

// Data
let overlay = ref<boolean>(false);

// Watchers
watch(props, (): void => {
  overlay.value = props.active;
});
</script>

<template>
  <v-overlay
    :model-value="overlay"
    class="align-center justify-center"
    persistent
  >
    <v-progress-circular
      color="primary"
      indeterminate
      size="64"
    />
  </v-overlay>
</template>