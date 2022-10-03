import type { NextPage } from 'next';
import Head from 'next/head';
import AuthShowcase from '../components/AuthShowcase';
import LoginButton from '../components/LoginButton';
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
        <div className="flex flex-wrap items-center justify-between bg-neutral-800 px-8 py-2 shadow-lg">
          <h1 className="text-2xl font-extrabold leading-normal text-gray-300">
            meme<span className="text-red-500">T</span>app
          </h1>

          <LoginButton />
        </div>

        <div className="flex flex-col items-center justify-center pt-6 text-xl text-blue-500  break-all">
          {memes.data ? <p className="text-2xl">{memes.data.map(meme => meme.imageURL)}</p> : <p>Loading..</p>}
        </div>

        <AuthShowcase />
      </main>
    </>
  );
};

export default Home;
