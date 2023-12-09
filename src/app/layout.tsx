import { Toaster } from '@mtp/components/Toaster';
import DialogProvider from '@mtp/components/providers/DialogProvider';
import { ThemeProvider } from '@mtp/components/providers/ThemeProvider';
import ThemedClerkProvider from '@mtp/components/providers/ThemedClerkProvider';
import { TooltipProvider } from '@mtp/components/ui/Tooltip';
import '@mtp/styles/globals.css';
import { TRPCReactProvider } from '@mtp/trpc/react';

import { type Metadata } from 'next';
import { Commissioner } from 'next/font/google';
import { cookies } from 'next/headers';
import NextTopLoader from 'nextjs-toploader';

export const metadata: Metadata = {
  title: 'memeTapp',
  description: 'memeTapp is a Meme social media platform',
};

const font = Commissioner({
  subsets: ['latin'],
  display: 'fallback',
  variable: '--font-sans',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemedClerkProvider>
      <html suppressHydrationWarning lang="en">
        <body className={`font-sans ${font.variable}`}>
          <ThemeProvider attribute="class" defaultTheme="system">
            <TRPCReactProvider cookies={cookies().toString()}>
              <DialogProvider>
                <TooltipProvider>
                  <NextTopLoader height={2} color="#dc2626" />
                  <main className="flex h-screen w-screen flex-col overflow-y-scroll transition-colors">
                    {children}
                  </main>
                  <Toaster />
                </TooltipProvider>
              </DialogProvider>
            </TRPCReactProvider>
          </ThemeProvider>
        </body>
      </html>
    </ThemedClerkProvider>
  );
}
