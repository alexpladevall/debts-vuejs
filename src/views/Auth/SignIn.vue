<script lang="ts" setup>
// Imports
import { ref } from 'vue';

import DefaultLayout from '@/layouts/DefaultLayout.vue';
import AuthAlert from '@/components/Auth/AuthAlert.vue';
import router from '@/router';
import { useAuthStore } from '@/store';
import AuthNavigation from '@/components/Auth/AuthNavigation.vue';

// Store
const authStore = useAuthStore();

// Data
let form = ref<boolean>(false);
let username = ref<string>('');
let password = ref<string>('');
let loading = ref<boolean>(false);
let visible = ref<boolean>(false);
let error = ref<boolean>(false);
let messageError = ref<string>('');

// Methods
const onSubmit = async (): Promise<void> => {
  loading.value = true;
  if (!form.value) return;
  const { ok, message } = await authStore.signIn(username.value, password.value);

  if (!ok) {
    error.value = true;
    messageError.value = message;
  } else {
    await router.push({ name: 'home' });
  }

  loading.value = false;
};

const required = (v: boolean) => {
  return !!v || 'Field is required';
};
</script>

<template>
  <DefaultLayout>
    <v-responsive
      class="mx-auto pt-6"
      max-width="444"
    >
      <h2 class="mb-4">
        Sign In
      </h2>

      <AuthAlert
        class="mb-2"
        :active="error"
        :message="messageError"
      />

      <v-form
        v-model="form"
        @submit.prevent="onSubmit"
      >
        <div class="text-subtitle-2 text-medium-emphasis">
          Username
        </div>

        <v-text-field
          v-model="username"
          :rules="[required]"
          density="comfortable"
          placeholder="Enter your username"
          variant="solo"
        />

        <div class="mt-1 text-subtitle-2 text-medium-emphasis d-flex align-center justify-space-between">
          Password
        </div>

        <v-text-field
          v-model="password"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          :rules="[required]"
          density="comfortable"
          placeholder="Enter your password"
          variant="solo"
          @click:append-inner="visible = !visible"
        />

        <v-btn
          :disabled="!form"
          :loading="loading"
          class="text-body-1 mt-4"
          block
          density="comfortable"
          color="primary"
          type="submit"
          size="x-large"
          variant="flat"
        >
          Sign In
        </v-btn>
      </v-form>

      <div class="text-center pt-12">
        <AuthNavigation
          title="Sign up now"
          go-to="signup"
          arrow-direction="right"
        />
      </div>
    </v-responsive>
  </DefaultLayout>
</template>
