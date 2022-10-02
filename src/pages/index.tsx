import type { NextPage } from 'next';
import Head from 'next/head';
import AuthShowcase from '../components/AuthShowcase';
import { trpc } from '../utils/trpc';

const Home: NextPage = () => {
  const hello = trpc.user.hello.useQuery({ text: 'from tRPC by memeTapp' });

  return (
    <>
      <Head>
        <title>memeTapp</title>
        <meta name="description" content="memeTapp is a Meme social media platform" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className="flex min-h-screen min-w-full flex-col bg-neutral-900 text-gray-100">
        <div className="flex flex-wrap items-center bg-neutral-800 px-8 py-4 shadow-lg">
          <h1 className="text-2xl font-extrabold leading-normal text-gray-300">
            meme<span className="text-red-500">T</span>app
          </h1>

          <h2 className="text-l pl-8">Home</h2>
          <h2 className="text-l pl-8">Search</h2>
          <h2 className="text-l pl-8">About</h2>
          <h2 className="text-l ml-auto">Login</h2>
        </div>

        <div className="flex items-center justify-center pt-6 text-xl text-blue-500">
          {hello.data ? <p>{hello.data.greeting}</p> : <p>Loading..</p>}
        </div>

        <AuthShowcase />
      </main>
    </>
  );
};

export default Home;
