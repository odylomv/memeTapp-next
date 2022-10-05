import type { NextPage } from 'next';
import Head from 'next/head';
import AuthShowcase from '../components/AuthShowcase';
import { Navbar } from '../components/Navbar';
import { trpc } from '../utils/trpc';

const Home: NextPage = () => {
  const memes = trpc.meme.getAll.useQuery();

  return (
    <>
      <Head>
        <title>memeTapp</title>
        <meta name="description" content="memeTapp is a Meme social media platform" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className="flex min-h-screen flex-col bg-neutral-900 text-gray-100">
        <Navbar />

        <div className="flex flex-col items-center justify-center pt-6 text-xl text-blue-500  break-all">
          {memes.data ? <p className="text-2xl">{memes.data.map(meme => meme.imageURL)}</p> : <p>Loading..</p>}
        </div>

        <AuthShowcase />
      </main>
    </>
  );
};

export default Home;
