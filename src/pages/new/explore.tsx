import { buildClerkProps, getAuth } from '@clerk/nextjs/server';
import NavbarLayout from '@mtp/components/NavbarLayout';
import NewMemeCard from '@mtp/components/NewMemeCard';
import { api } from '@mtp/lib/api';
import { appRouter } from '@mtp/server/api/root';
import { createInnerTRPCContext } from '@mtp/server/api/trpc';
import { createServerSideHelpers } from '@trpc/react-query/server';
import { type GetServerSideProps } from 'next';
import { InView } from 'react-intersection-observer';
import SuperJSON from 'superjson';

export default function Explore() {
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } = api.meme.getPaginated.useInfiniteQuery(
    { limit: 5 },
    { getNextPageParam: lastPage => lastPage.nextCursor }
  );

  return (
    <NavbarLayout currentLink="Explore">
      <div className="flex justify-center pt-4">
        <div className="flex max-w-7xl flex-col items-center gap-4 px-2">
          {/* <ProtectedButton onClick={() => console.log('test')}>Test</ProtectedButton> */}
          {data ? (
            data.pages.map(page => {
              return page.memes.map((meme, index) => <NewMemeCard key={meme.id} meme={meme} priority={index < 2} />);
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
    </NavbarLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const auth = getAuth(req);

  const ssg = createServerSideHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({ auth }),
    transformer: SuperJSON,
  });

  await ssg.meme.getPaginated.prefetchInfinite({ limit: 5 });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      ...buildClerkProps(req),
    },
  };
};
