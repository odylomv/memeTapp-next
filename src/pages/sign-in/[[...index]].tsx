import { SignIn } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import ThemeSwitch from '@mtp/components/ThemeSwitch';
import RootLayout from '@mtp/components/layouts/RootLayout';
import { Button } from '@mtp/components/ui/Button';
import { useTheme } from 'next-themes';
import Link from 'next/link';

const SignInPage = () => {
  const { resolvedTheme } = useTheme();

  return (
    <RootLayout>
      <div className="absolute right-4 top-4">
        <ThemeSwitch />
      </div>

      <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-4">
        <Link href={'/'}>
          <Button variant={'secondary'}>
            <span className="text-sm">Back to homepage</span>
          </Button>
        </Link>
        <SignIn
          path="/sign-in"
          routing="path"
          signUpUrl="/sign-up"
          appearance={{ baseTheme: resolvedTheme === 'dark' ? dark : undefined }}
        />
      </div>
    </RootLayout>
  );
};

export default SignInPage;
