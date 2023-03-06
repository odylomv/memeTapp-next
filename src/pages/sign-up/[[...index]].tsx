import { SignUp } from '@clerk/nextjs';
import Link from 'next/link';

const SignUpPage = () => (
  <main className="flex h-screen flex-col items-center bg-neutral-800 text-gray-100">
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 overflow-y-scroll p-4">
      <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
      <Link href={'/'}>
        <span className="text-sm">Back to homepage</span>
      </Link>
    </div>
  </main>
);

export default SignUpPage;
