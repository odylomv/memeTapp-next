import { ClerkProvider } from '@clerk/nextjs';

export default function ThemedClerkProvider({ children, pageProps }: { children: React.ReactNode; pageProps: object }) {
  return (
    <ClerkProvider
      {...pageProps}
      appearance={{
        layout: { socialButtonsPlacement: 'bottom', socialButtonsVariant: 'iconButton' },
        variables: {
          colorPrimary: '#b91c1c',
        },
        elements: {
          formButtonPrimary: 'bg-red-600 hover:bg-red-700',
          logoBox: 'h-12 justify-center',
          modalBackdrop: 'flex justify-center pt-12 h-screen bg-black/50 backdrop-blur-sm',
          card: 'dark:bg-neutral-900 dark:text-white',
          formFieldLabel: 'pb-2',
          footerActionLink: 'text-red-500 hover:text-red-600',
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
