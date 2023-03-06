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
        layout: { socialButtonsPlacement: 'bottom', socialButtonsVariant: 'iconButton' },
        elements: {
          formButtonPrimary: 'bg-red-700 hover:bg-red-600',
          logoBox: 'h-12 justify-center',
          modalBackdrop: 'flex justify-center pt-12 h-screen',
          card: 'bg-neutral-900',
          formFieldLabel: 'pb-2',
        },
      }}
    >
      <ServerErrorProvider>
        <Component {...pageProps} />
      </ServerErrorProvider>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
