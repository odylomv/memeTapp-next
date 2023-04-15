import { buildClerkProps, getAuth } from '@clerk/nextjs/server';
import MemeCard from '@mtp/components/MemeCard/MemeCard';
import { Navbar } from '@mtp/components/Navbar/Navbar';
import { api } from '@mtp/lib/api';
import { appRouter } from '@mtp/server/api/root';
import { createInnerTRPCContext } from '@mtp/server/api/trpc';
import { createServerSideHelpers } from '@trpc/react-query/server';

import { type GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import SuperJSON from 'superjson';

const MemePage = () => {
  const router = useRouter();
  const { memeid } = router.query;
  const { data } = api.meme.getMeme.useQuery({ id: memeid as string });

  return (
    <>
      <Head>
        <title>Meme | memeTapp</title>
        <meta name="description" content="memeTapp is a Meme social media platform" />
        <link rel="icon" href="favicon.ico" />
      </Head>

      <main className="absolute inset-0 flex flex-col items-center bg-neutral-900 text-gray-100">
        <Navbar />
        <div className="flex w-full flex-col items-center justify-center gap-4 overflow-y-scroll p-4">
          <p>Meme: {memeid}</p>
          {data && (
            <MemeCard
              meme={data}
              content={
                <>
                  <MemeCard.Header></MemeCard.Header>
                  <MemeCard.Image priority></MemeCard.Image>
                  <MemeCard.Footer></MemeCard.Footer>
                </>
              }
            />
          )}
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  if (!params?.memeid)
    return {
      props: {
        ...buildClerkProps(req),
      },
    };

  const auth = getAuth(req);

  const ssg = createServerSideHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({ auth }),
    transformer: SuperJSON,
  });

  await ssg.meme.getMeme.prefetch({ id: params.memeid as string });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      ...buildClerkProps(req),
    },
  };
};

export default MemePage;
