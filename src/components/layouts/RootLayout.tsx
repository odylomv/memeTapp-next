import Head from 'next/head';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>memeTapp</title>
        <meta name="description" content="memeTapp is a Meme social media platform" />
      </Head>
      <main className="flex h-screen w-screen flex-col overflow-y-scroll transition-colors">{children}</main>
    </>
  );
}
