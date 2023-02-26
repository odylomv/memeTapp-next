import ServerErrorProvider from '@mtp/components/ServerErrorContext';
import '@mtp/styles/globals.css';
import { api } from '@mtp/utils/api';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { type AppType } from 'next/app';

const MyApp: AppType<{ session: Session | null }> = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <SessionProvider session={session}>
      <ServerErrorProvider>
        <Component {...pageProps} />
      </ServerErrorProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
