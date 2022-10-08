import { BookmarkIcon, ChatBubbleLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { EllipsisVerticalIcon, HeartIcon } from '@heroicons/react/24/outline';
import { inferProcedureOutput } from '@trpc/server';
import Image from 'next/future/image';
import { AppRouter } from '../server/trpc/router';

type ArrayElement<ArrayType> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type MemeCardModel = ArrayElement<inferProcedureOutput<AppRouter['meme']['getPaginated']>['memes']>;

const MemeCard: React.FC<{
  meme: Partial<MemeCardModel>;
  mock?: boolean;
}> = ({ meme, mock = false }) => {
  const onProfile = () => {
    if (mock) return;

    console.log('clicked');
    return;
  };

  const onOptions = () => {
    if (mock) return;

    console.log('clicked');
    return;
  };

  const onLike = () => {
    if (mock) return;

    console.log('clicked');
    return;
  };

  const onComments = () => {
    if (mock) return;

    console.log('clicked');
    return;
  };

  const onBookmark = () => {
    if (mock) return;

    console.log('clicked');
    return;
  };

  return (
    <div className="flex flex-col rounded-lg bg-neutral-800 text-white">
      {/* Card Header */}
      <div className="flex justify-between p-2">
        {meme.author ? (
          <button className="group flex items-center" onClick={onProfile}>
            {meme.author.image ? (
              <Image
                src={meme.author.image}
                alt="meme author"
                width={50}
                height={50}
                className="h-6 w-6 rounded-full"
              />
            ) : (
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-900">
                {meme.author.name?.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="px-2 text-sm">{meme.author.name}</span>
            <ChevronRightIcon className="hidden h-4 w-4 group-hover:block" />
          </button>
        ) : (
          <button className="group flex items-center" onClick={onProfile}>
            <div className="h-6 w-6 rounded-full bg-neutral-600" />
            <span className="px-2 text-sm">You</span>
            <ChevronRightIcon className="hidden h-4 w-4 group-hover:block" />
          </button>
        )}

        <button className="rounded-full hover:bg-neutral-700" aria-label="meme options" onClick={onOptions}>
          <EllipsisVerticalIcon className="h-6 w-6 text-neutral-500" />
        </button>
      </div>
      {/* Card Image */}
      <div className="flex justify-center">
        {meme.imageURL ? (
          <Image priority src={meme.imageURL} alt="meme" width={450} height={450} className="h-auto w-[400px]" />
        ) : (
          <div className="h-[400px] w-[400px] bg-neutral-600"></div>
        )}
      </div>
      {/* Card Footer */}
      <div className="flex justify-between p-2">
        <div className="flex items-center">
          <button className="group flex" aria-label="like meme" onClick={onLike}>
            <HeartIcon className="h-5 w-5 text-neutral-500 group-hover:text-neutral-400" />
            <span className="px-2 text-sm text-neutral-300">{meme._count ? meme._count.likes : 0}</span>
          </button>
          <button className="group flex" aria-label="meme comments" onClick={onComments}>
            <ChatBubbleLeftIcon className="ml-2 h-5 w-5 text-neutral-600 group-hover:text-neutral-400" />
            <span className="px-2 text-sm text-neutral-300">{meme._count ? meme._count.comments : 0}</span>
          </button>
        </div>
        <button aria-label="bookmark meme" onClick={onBookmark}>
          <BookmarkIcon className="h-5 w-5 text-neutral-600 hover:text-amber-500" />
        </button>
      </div>
    </div>
  );
};

export default MemeCard;
