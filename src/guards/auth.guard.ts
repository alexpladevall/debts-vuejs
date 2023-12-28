import { useAuthStore } from '@/store';

const isAuthenticatedGuard = async (to: any, from: any, next: any): Promise<void> => {
  const { checkAuthentication } = useAuthStore();
  const { ok } = await checkAuthentication();

  if (to.name === 'signin' || to.name === 'signup') {
    if (ok) next({ name: 'home' });
    else next();
    return;
  }

  if (ok) next();
  else next({ name: 'signin' });
};

export default isAuthenticatedGuard;