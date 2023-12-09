'use client';

import MemeCard from '@mtp/components/MemeCard';
import { UploadMemeButton } from '@mtp/components/UploadMemeButton';
import { api } from '@mtp/trpc/react';

import { InView } from 'react-intersection-observer';

export default function Explore() {
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } = api.meme.getPaginated.useInfiniteQuery(
    { limit: 5 },
    { getNextPageParam: lastPage => lastPage.nextCursor }
  );

  return (
    <div className="flex justify-center py-4">
      <div className="flex max-w-7xl flex-col items-center gap-4 px-2">
        <div className="flex w-full items-center justify-between">
          <span className="pl-4 text-xl font-semibold">Latest Memes</span>

          <UploadMemeButton />
        </div>

        {data ? (
          data.pages.map(page => {
            return page.memes.map((meme, index) => <MemeCard key={meme.id} meme={meme} priority={index < 2} />);
          })
        ) : (
          <p>Loading...</p>
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
  );
}
