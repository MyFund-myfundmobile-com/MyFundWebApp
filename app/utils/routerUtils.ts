import { useRouter } from 'next/router';

export const useRouterSafe = () => {
  const router = useRouter();
  if (!router) {
    throw new Error('useRouter cannot be used outside of a Next.js app.');
  }
  return router;
};
