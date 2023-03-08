import { buildClerkProps, getAuth } from '@clerk/nextjs/server';
import MemeCard from '@mtp/components/MemeCard/MemeCard';
import { Navbar } from '@mtp/components/Navbar/Navbar';
import { appRouter } from '@mtp/server/api/root';
import { createInnerTRPCContext } from '@mtp/server/api/trpc';
import { api } from '@mtp/utils/api';
import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { InView } from 'react-intersection-observer';
import superjson from 'superjson';

const Home: NextPage = () => {
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } = api.meme.getPaginated.useInfiniteQuery(
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
                return page.memes.map(meme => (
                  <MemeCard
                    key={meme.id}
                    meme={meme}
                    content={
                      <>
                        <MemeCard.Header></MemeCard.Header>
                        <MemeCard.Image priority={index < 2}></MemeCard.Image>
                        <MemeCard.Footer></MemeCard.Footer>
                      </>
                    }
                  />
                ));
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
                  void fetchNextPage();
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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const auth = getAuth(req);

  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({ auth }),
    transformer: superjson,
  });

  await ssg.meme.getPaginated.prefetchInfinite({ limit: 5 });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      ...buildClerkProps(req),
    },
  };
};

export default Home;
