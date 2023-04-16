export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex h-screen w-screen flex-col bg-white text-neutral-800 transition-colors dark:bg-neutral-950 dark:text-white">
      {children}
    </main>
  );
}
