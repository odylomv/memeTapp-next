import {
  BookmarkIcon,
  ChatBubbleLeftIcon,
  ChevronRightIcon,
  EllipsisVerticalIcon,
  HeartIcon,
} from '@heroicons/react/20/solid';
import { useSession } from 'next-auth/react';
import Image from 'next/future/image';

const MockMemeCard: React.FC<{ imageURL: string }> = ({ imageURL }) => {
  const session = useSession();

  return (
    <div className="flex flex-col rounded-lg bg-neutral-800 text-white">
      {/* Card Header */}
      <div className="flex justify-between p-2">
        {session.data?.user && (
          <button className="group flex items-center">
            {session.data.user.image && (
              <Image
                src={session.data.user.image}
                alt="meme author"
                width={50}
                height={50}
                className="h-6 w-6 rounded-full"
              />
            )}
            <span className="px-2 text-sm">{session.data.user.name}</span>
            <ChevronRightIcon className="hidden h-4 w-4 group-hover:block" />
          </button>
        )}

        <EllipsisVerticalIcon className="h-6 w-6 text-neutral-500" />
      </div>

      {/* Card Image */}
      <div className="flex justify-center">
        <Image priority src={imageURL} alt="meme" width={450} height={450} className="h-auto w-[400px]" />
      </div>

      {/* Card Footer */}
      <div className="flex justify-between p-2">
        <div className="flex items-center">
          <button className="group flex" aria-label="like meme">
            <HeartIcon className="h-5 w-5 text-red-500 group-hover:text-red-400" />

            <span className="px-2 text-sm text-neutral-300">420</span>
          </button>
          <button className="group flex" aria-label="meme comments">
            <ChatBubbleLeftIcon className="ml-2 h-5 w-5 text-neutral-600 group-hover:text-neutral-400" />
            <span className="px-2 text-sm text-neutral-300">24</span>
          </button>
        </div>
        <button aria-label="bookmark meme">
          <BookmarkIcon className="h-5 w-5 text-neutral-600 hover:text-amber-500" />
        </button>
      </div>
    </div>
  );
};

export default MockMemeCard;
