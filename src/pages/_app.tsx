import RootLayout from '@mtp/components/RootLayout';
import ServerErrorProvider from '@mtp/components/ServerErrorContext';
import ThemedClerkProvider from '@mtp/components/ThemedClerkProvider';
import { api } from '@mtp/lib/api';
import '@mtp/styles/globals.css';
import { ThemeProvider } from 'next-themes';
import { type AppType } from 'next/app';
import { Commissioner } from 'next/font/google';
import NextNProgress from 'nextjs-progressbar';

const font = Commissioner({ subsets: ['latin'] });

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${font.style.fontFamily};
        }
      `}</style>

      <ThemeProvider attribute="class">
        <ThemedClerkProvider pageProps={pageProps}>
          <ServerErrorProvider>
            <RootLayout>
              <NextNProgress height={2} color="red" startPosition={0.5} stopDelayMs={100} />
              <Component {...pageProps} />
            </RootLayout>
          </ServerErrorProvider>
        </ThemedClerkProvider>
      </ThemeProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
