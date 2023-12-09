'use client';

import { SignUp } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import ThemeSwitch from '@mtp/components/ThemeSwitch';
import { Button } from '@mtp/components/ui/Button';
import { useTheme } from 'next-themes';
import Link from 'next/link';

export default function SignUpPage() {
  const { resolvedTheme } = useTheme();

  return (
    <>
      <div className="absolute right-4 top-4">
        <ThemeSwitch />
      </div>

      <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-4">
        <Link href={'/'}>
          <Button variant={'secondary'}>
            <span className="text-sm">Back to homepage</span>
          </Button>
        </Link>
        <div className="h-3/5 sm:h-auto">
          <SignUp
            path="/sign-up"
            routing="path"
            signInUrl="/sign-in"
            appearance={{ baseTheme: resolvedTheme === 'dark' ? dark : undefined }}
          />
        </div>
      </div>
    </>
  );
}
