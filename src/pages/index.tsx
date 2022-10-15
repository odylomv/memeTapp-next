import { createProxySSGHelpers } from '@trpc/react/ssg';
import type { NextPage } from 'next';
import Head from 'next/head';
import { InView } from 'react-intersection-observer';
import superjson from 'superjson';
import MemeCard from '../components/MemeCard/MemeCard';
import { Navbar } from '../components/Navbar/Navbar';
import { createContextInner } from '../server/trpc/context';
import { appRouter } from '../server/trpc/router/_app';
import { trpc } from '../utils/trpc';

const Home: NextPage = () => {
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } = trpc.meme.getPaginated.useInfiniteQuery(
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

      <main className="flex h-screen flex-col items-center bg-neutral-900 text-gray-100">
        <Navbar page="Browse" />

        <div className="flex w-full justify-center overflow-y-scroll p-4">
          <div className="flex max-w-7xl flex-col gap-4">
            {data ? (
              data.pages.map((page, index) => {
                return page.memes.map(meme => <MemeCard key={meme.id} meme={meme} priority={index < 2} />);
              })
            ) : (
              <p>Loading..</p>
            )}

            {/* Intersection Observer for Infinite Scroll */}
            <InView
              as="div"
              className="flex justify-center pb-4"
              onChange={inView => {
                if (inView) {
                  console.log('more memes');
                  fetchNextPage();
                }
              }}
            >
              <span>
                {isFetchingNextPage ? 'Loading more memes...' : hasNextPage ? 'Older memes' : 'Nothing more to load'}
              </span>
            </InView>
          </div>
        </div>
      </main>
    </>
  );
};

export async function getStaticProps() {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createContextInner({ session: null }),
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
