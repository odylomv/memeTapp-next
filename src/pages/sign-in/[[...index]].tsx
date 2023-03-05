import { SignIn } from '@clerk/nextjs';

const SignInPage = () => {
  console.log('sign in!');

  return (
    <div className="flex h-[100vh] w-[100vw] items-center justify-center">
      <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
    </div>
  );
};

export default SignInPage;
