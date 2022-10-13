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
    <div className="flex flex-col rounded-lg bg-neutral-800 text-neutral-300">
      {/* Card Header */}
      <div className="flex justify-between p-2">
        {session.data?.user ? (
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
        ) : (
          <div className="group flex items-center">
            <div className="h-6 w-6 rounded-full bg-neutral-600"></div>
            <span className="cursor-default px-2 text-sm">You</span>
          </div>
        )}

        <EllipsisVerticalIcon className="h-6 w-6 text-neutral-600" />
      </div>

      {/* Card Image */}
      <div className="flex justify-center">
        <Image src={imageURL} alt="meme" width={400} height={600} className="max-h-[600px] object-cover" />
      </div>

      {/* Card Footer */}
      <div className="flex justify-between p-2">
        <div className="flex items-center">
          <button className="group flex" aria-label="like meme">
            <HeartIcon className="h-5 w-5 text-red-500 group-hover:text-red-400" />

            <span className="px-2 text-sm">420</span>
          </button>
          <button className="group flex" aria-label="meme comments">
            <ChatBubbleLeftIcon className="ml-2 h-5 w-5 text-neutral-600 group-hover:text-neutral-400" />
            <span className="px-2 text-sm">24</span>
          </button>
        </div>
        <button aria-label="bookmark meme">
          <BookmarkIcon className="h-5 w-5 text-neutral-600 hover:text-neutral-400" />
        </button>
      </div>
    </div>
  );
};

export default MockMemeCard;
