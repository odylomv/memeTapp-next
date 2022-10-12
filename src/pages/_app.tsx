import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import type { AppType } from 'next/app';
import ServerErrorProvider from '../components/ServerErrorContext';
import '../styles/globals.css';
import { trpc } from '../utils/trpc';

const MyApp: AppType<{ session: Session | null }> = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <SessionProvider session={session}>
      <ServerErrorProvider>
        <Component {...pageProps} />
      </ServerErrorProvider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
