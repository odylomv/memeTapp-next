import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import ServerErrorProvider from '@mtp/components/ServerErrorContext';
import '@mtp/styles/globals.css';
import { api } from '@mtp/utils/api';
import { type AppType } from 'next/app';

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider
      {...pageProps}
      appearance={{
        baseTheme: dark,
        layout: { socialButtonsPlacement: 'bottom' },
      }}
    >
      <ServerErrorProvider>
        <Component {...pageProps} />
      </ServerErrorProvider>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
