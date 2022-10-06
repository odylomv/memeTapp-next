import { createProxySSGHelpers } from '@trpc/react/ssg';
import type { InferGetStaticPropsType, NextPage } from 'next';
import Image from 'next/future/image';
import Head from 'next/head';
import superjson from 'superjson';
import { Navbar } from '../components/Navbar';
import { createContextInner } from '../server/trpc/context';
import { appRouter } from '../server/trpc/router';

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ memes }) => {
  return (
    <>
      <Head>
        <title>memeTapp</title>
        <meta name="description" content="memeTapp is a Meme social media platform" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className="flex min-h-screen flex-col bg-neutral-900 text-gray-100">
        <Navbar />

        <div className="flex w-full flex-col items-center p-4">
          {memes ? (
            memes.map(meme => (
              <div key={meme.id} className="flex justify-center pb-4">
                <Image priority src={meme.imageURL} alt="meme" width={450} height={450} className="h-auto w-[400px]" />
              </div>
            ))
          ) : (
            <p>Loading..</p>
          )}
        </div>
      </main>
    </>
  );
};

export async function getStaticProps() {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createContextInner(),
    transformer: superjson,
  });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      memes: await ssg.meme.getAll.fetch(),
    },
    revalidate: 1,
  };
}

export default Home;
