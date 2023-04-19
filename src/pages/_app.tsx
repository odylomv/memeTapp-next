import RootLayout from '@mtp/components/layouts/RootLayout';
import ServerErrorProvider from '@mtp/components/providers/ServerErrorContext';
import ThemedClerkProvider from '@mtp/components/providers/ThemedClerkProvider';
import { TooltipProvider } from '@mtp/components/ui/tooltip';
import { api } from '@mtp/lib/api';
import '@mtp/styles/globals.css';
import { ThemeProvider } from 'next-themes';
import { type AppType } from 'next/app';
import { Commissioner } from 'next/font/google';
import NextNProgress from 'nextjs-progressbar';

const font = Commissioner({
  subsets: ['latin'],
  display: 'fallback',
});

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
            <TooltipProvider>
              <RootLayout>
                <NextNProgress height={2} color="#dc2626" startPosition={0.5} stopDelayMs={100} />
                <Component {...pageProps} />
              </RootLayout>
            </TooltipProvider>
          </ServerErrorProvider>
        </ThemedClerkProvider>
      </ThemeProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
