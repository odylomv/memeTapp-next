'use client';

import { useAuth, useClerk, useUser } from '@clerk/nextjs';
import { useTheme } from 'next-themes';
import UserButton from './dropdowns/UserButton';
import { Button } from './ui/Button';

export function CustomSignInButton() {
  const clerk = useClerk();
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const { resolvedTheme } = useTheme();

  const Skeleton = () => (
    <Button variant={'ghost'} size={'sm'} className="rounded-full p-0">
      <div className="h-8 w-8 animate-pulse rounded-full bg-secondary" />
    </Button>
  );

  if (isSignedIn) {
    return user ? <UserButton loading={<Skeleton />} /> : <Skeleton />;
  }

  return (
    <>
      <Button
        variant={'ghost'}
        onClick={() =>
          void (async () =>
            clerk.openSignIn({
              appearance: {
                baseTheme: resolvedTheme === 'dark' ? (await import('@clerk/themes')).dark : undefined,
              },
            }))()
        }
      >
        <span>Login</span>
      </Button>
    </>
  );
}
