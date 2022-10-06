import { createProxySSGHelpers } from '@trpc/react/ssg';
import type { NextPage } from 'next';
import Image from 'next/future/image';
import Head from 'next/head';
import superjson from 'superjson';
import { Navbar } from '../components/Navbar';
import { createContextInner } from '../server/trpc/context';
import { appRouter } from '../server/trpc/router';
import { trpc } from '../utils/trpc';

const Home: NextPage = () => {
  // const memes = trpc.meme.getAll.useQuery();
  const memes = trpc.meme.getPaginated.useInfiniteQuery(
    { limit: 5 },
    { getNextPageParam: lastPage => lastPage.nextCursor }
  );

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
          {memes.data ? (
            memes.data.pages.map(page => {
              return page.memes.map(meme => (
                <div key={meme.id} className="flex justify-center pb-4">
                  <Image
                    priority
                    src={meme.imageURL}
                    alt="meme"
                    width={450}
                    height={450}
                    className="h-auto w-[400px]"
                  />
                </div>
              ));
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

  await ssg.meme.getAll.prefetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 10,
  };
}

export default Home;
