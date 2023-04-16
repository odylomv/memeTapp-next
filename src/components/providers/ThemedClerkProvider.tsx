import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useTheme } from 'next-themes';

export default function ThemedClerkProvider({ children, pageProps }: { children: React.ReactNode; pageProps: object }) {
  const { resolvedTheme } = useTheme();

  return (
    <ClerkProvider
      {...pageProps}
      appearance={{
        baseTheme: resolvedTheme === 'dark' ? dark : undefined,
        layout: { socialButtonsPlacement: 'bottom', socialButtonsVariant: 'iconButton' },
        variables: {
          colorPrimary: '#b91c1c',
        },
        elements: {
          formButtonPrimary: 'bg-red-600 hover:bg-red-700',
          logoBox: 'h-12 justify-center',
          modalBackdrop: 'flex justify-center pt-12 h-screen bg-black/50 backdrop-blur-sm',
          card: 'dark:bg-neutral-900',
          formFieldLabel: 'pb-2',
          footerActionLink: 'text-red-500 hover:text-red-600',
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
