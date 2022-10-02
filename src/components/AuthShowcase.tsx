import { signIn, signOut, useSession } from 'next-auth/react';
import { trpc } from '../utils/trpc';

const AuthShowcase: React.FC = () => {
  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery();

  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {sessionData && <p className="text-2xl text-blue-500">Logged in as {sessionData?.user?.name}</p>}
      {secretMessage && <p className="text-2xl text-blue-500">{secretMessage}</p>}
      <button
        className="px-4 py-2 border border-black text-xl rounded-md bg-violet-50 hover:bg-violet-100 shadow-lg text-black"
        onClick={sessionData ? () => signOut() : () => signIn()}>
        {sessionData ? 'Sign out' : 'Sign in'}
      </button>
    </div>
  );
};

export default AuthShowcase;
