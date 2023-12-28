<script lang="ts" setup>
// Imports
import { reactive, ref } from 'vue';

import DefaultLayout from '@/layouts/DefaultLayout.vue';
import AuthAlert from '@/components/Auth/AuthAlert.vue';
import router from '@/router';
import { useAuthStore } from '@/store';
import AuthNavigation from '@/components/Auth/AuthNavigation.vue';
import { ISignUpUserDto } from '@/interfaces';

// Store
const authStore = useAuthStore();

// Data
let form = ref<boolean>(false);
let user = reactive<ISignUpUserDto>({ username: '', firstName: '', password: '' });
let loading = ref<boolean>(false);
let passwordVisible = ref<boolean>(false);
let error = ref<boolean>(false);
let messageError = ref<string>('');

// Methods
const onSubmit = async (): Promise<void> => {
  loading.value = true;
  if (!form.value) return;
  const { ok, message } = await authStore.signUp(user);

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
        Sign Up
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
          v-model="user.username"
          :rules="[required]"
          density="comfortable"
          placeholder="Enter your username"
          variant="solo"
        />

        <div class="mt-1 text-subtitle-2 text-medium-emphasis">
          First Name
        </div>

        <v-text-field
          v-model="user.firstName"
          :rules="[required]"
          density="comfortable"
          placeholder="Enter your first name"
          variant="solo"
        />

        <div class="mt-1 text-subtitle-2 text-medium-emphasis">
          Last Name
        </div>

        <v-text-field
          v-model="user.lastName"
          density="comfortable"
          placeholder="Enter your last name"
          variant="solo"
        />

        <div class="mt-1 text-subtitle-2 text-medium-emphasis d-flex align-center justify-space-between">
          Password
        </div>

        <v-text-field
          v-model="user.password"
          :append-inner-icon="passwordVisible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="passwordVisible ? 'text' : 'password'"
          :rules="[required]"
          density="comfortable"
          placeholder="Enter your password"
          variant="solo"
          @click:append-inner="passwordVisible = !passwordVisible"
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
          Sign Up
        </v-btn>
      </v-form>

      <div class="text-center pt-12">
        <AuthNavigation
          title="Sign in now"
          go-to="signin"
          arrow-direction="left"
        />
      </div>
    </v-responsive>
  </DefaultLayout>
</template>
