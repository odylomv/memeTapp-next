import { createProxySSGHelpers } from '@trpc/react/ssg';
import type { NextPage } from 'next';
import Head from 'next/head';
import superjson from 'superjson';
import MemeCard from '../components/MemeCard';
import { Navbar } from '../components/Navbar';
import { createContextInner } from '../server/trpc/context';
import { appRouter } from '../server/trpc/router';
import { trpc } from '../utils/trpc';

const Home: NextPage = () => {
  const memes = trpc.meme.getPaginated.useInfiniteQuery(
    { limit: 5 },
    { getNextPageParam: lastPage => lastPage.nextCursor }
  );

  return (
    <>
      <Head>
        <title>memeTapp</title>
        <meta name="description" content="memeTapp is a Meme social media platform" />
        <link rel="icon" href="favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col items-center bg-neutral-900 text-gray-100">
        <Navbar page="Browse" />

        <div className="flex max-w-7xl flex-col items-start justify-center gap-4 p-4">
          {memes.data ? (
            memes.data.pages.map(page => {
              return page.memes.map(meme => <MemeCard key={meme.id} meme={meme} />);
            })
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

  await ssg.meme.getPaginated.prefetchInfinite({ limit: 5 });

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 10,
  };
}

export default Home;
