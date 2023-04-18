export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <main className="flex h-screen w-screen flex-col overflow-y-scroll transition-colors">{children}</main>;
}
