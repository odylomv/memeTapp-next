import { Navbar } from '@mtp/components/Navbar/Navbar';
import Head from 'next/head';
import { useRouter } from 'next/router';

const MemePage = () => {
  const router = useRouter();
  const { memeid } = router.query;

  return (
    <>
      <Head>
        <title>Meme | memeTapp</title>
        <meta name="description" content="memeTapp is a Meme social media platform" />
        <link rel="icon" href="favicon.ico" />
      </Head>

      <main className="flex h-screen flex-col items-center bg-neutral-900 text-gray-100">
        <Navbar page=""></Navbar>
        <div className="flex w-full justify-center overflow-y-scroll p-4">
          <p>Meme: {memeid}</p>
        </div>
      </main>
    </>
  );
};

export default MemePage;
