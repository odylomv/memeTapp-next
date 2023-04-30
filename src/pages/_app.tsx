import ThemedClerkProvider from '@mtp/components/providers/ThemedClerkProvider';
import { api } from '@mtp/lib/api';
import '@mtp/styles/globals.css';
import { ThemeProvider } from 'next-themes';
import { type AppType } from 'next/app';
import { Commissioner } from 'next/font/google';
import Head from 'next/head';

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

      <Head>
        <title>memeTapp</title>
        <meta name="description" content="memeTapp is a Meme social media platform" />
      </Head>

      <ThemeProvider attribute="class">
        <ThemedClerkProvider pageProps={pageProps}>
          <Component {...pageProps} />
        </ThemedClerkProvider>
      </ThemeProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
