import { useSession } from 'next-auth/react';
import { trpc } from '../utils/trpc';

const AuthShowcase: React.FC = () => {
  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery();

  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {sessionData && <p className="text-2xl text-blue-500">Logged in as {sessionData?.user?.name}</p>}
      {secretMessage && <p className="text-2xl text-blue-500">{secretMessage}</p>}
    </div>
  );
};

export default AuthShowcase;
