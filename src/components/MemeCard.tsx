import { BookmarkIcon, ChatBubbleLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { EllipsisVerticalIcon, HeartIcon } from '@heroicons/react/24/outline';
import { inferProcedureOutput } from '@trpc/server';
import Image from 'next/future/image';
import { AppRouter } from '../server/trpc/router';

type ArrayElement<ArrayType> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

const MemeCard: React.FC<{ meme: ArrayElement<inferProcedureOutput<AppRouter['meme']['getPaginated']>['memes']> }> = ({
  meme,
}) => {
  return (
    <div className="flex flex-col rounded-lg bg-neutral-800">
      {/* Card Header */}
      <div className="group flex justify-between p-2">
        <button className="flex items-center">
          {meme.author.image ? (
            <Image src={meme.author.image} alt="meme author" width={50} height={50} className="h-6 w-6 rounded-full" />
          ) : (
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-900">
              {meme.author.name?.charAt(0).toUpperCase()}
            </div>
          )}
          <span className="px-2 text-sm">{meme.author.name}</span>
          <ChevronRightIcon className="hidden h-4 w-4 group-hover:block" />
        </button>

        <button className="rounded-full hover:bg-neutral-700" aria-label="meme options">
          <EllipsisVerticalIcon className="h-6 w-6 text-neutral-500" />
        </button>
      </div>
      {/* Card Image */}
      <div className="flex justify-center">
        <Image priority src={meme.imageURL} alt="meme" width={450} height={450} className="h-auto w-[400px]" />
      </div>
      {/* Card Footer */}
      <div className="flex justify-between p-2">
        <div className="flex items-center">
          <button className="flex" aria-label="like meme">
            <HeartIcon className="h-5 w-5 text-neutral-500" />
            <span className="px-2 text-sm text-neutral-300">{meme._count.likes}</span>
          </button>
          <button className="group flex" aria-label="meme comments">
            <ChatBubbleLeftIcon className="ml-2 h-5 w-5 text-neutral-600 group-hover:text-neutral-400" />
            <span className="px-2 text-sm text-neutral-300">{meme._count.comments}</span>
          </button>
        </div>
        <button aria-label="bookmark meme">
          <BookmarkIcon className="h-5 w-5 text-neutral-600 hover:text-yellow-300" />
        </button>
      </div>
    </div>
  );
};

export default MemeCard;
