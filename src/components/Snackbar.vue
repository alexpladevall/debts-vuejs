<script lang="ts" setup>
// Imports
import { ref, watch } from 'vue';
import { ISnackbarComponent } from '@/interfaces';

// Props
interface ISnackbarProps {
  snackbar: ISnackbarComponent
}

const props = defineProps<ISnackbarProps>();

// Emits
const emit = defineEmits(['close']);

// Data
let active = ref<boolean>(false);

// Watchers
watch(props, (): void => {
  active.value = props.snackbar.active;
});
</script>

<template>
  <v-snackbar
    v-model="active"
    :color="snackbar.success ? 'success' : 'error'"
    :timeout="snackbar.timeout"
  >
    {{ snackbar.message }}

    <template #actions>
      <v-btn
        icon="mdi-close"
        size="small"
        @click="emit('close')"
      />
    </template>
  </v-snackbar>
</template>