import { SignUp } from '@clerk/nextjs';

const SignUpPage = () => (
  <div className="flex h-[100vh] w-[100vw] items-center justify-center">
    <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
  </div>
);

export default SignUpPage;
