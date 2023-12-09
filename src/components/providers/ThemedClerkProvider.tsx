import { ClerkProvider } from '@clerk/nextjs';

export default function ThemedClerkProvider({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        layout: { socialButtonsPlacement: 'top', socialButtonsVariant: 'iconButton' },
        variables: {
          colorPrimary: '#dc2626', // text-destructive
        },
        elements: {
          formButtonPrimary: 'bg-destructive hover:bg-destructive/80',
          logoBox: 'h-12 justify-center',
          modalBackdrop: 'flex justify-center pt-12 h-screen bg-black/50 backdrop-blur-sm',
          card: 'bg-muted text-muted-foreground',
          formFieldLabel: 'pb-1',
          footerActionLink: 'text-destructive hover:text-destructive/80',
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
