import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/future/image';

const LoginButton: React.FC = () => {
  const { data: sessionData } = useSession();

  if (sessionData) {
    return (
      <button
        className="flex flex-row h-8 w-8 items-center rounded-full bg-neutral-700 hover:opacity-80"
        onClick={() => signOut()}>
        <Image src={sessionData.user?.image ?? ''} alt="avatar" width={100} height={100} className="rounded-full" />
      </button>
    );
  } else {
    return <button onClick={() => signIn()}>Sign in</button>;
  }
};

export default LoginButton;
