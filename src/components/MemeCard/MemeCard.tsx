import { BookmarkIcon, ChatBubbleLeftIcon, ChevronRightIcon, HeartIcon } from '@heroicons/react/20/solid';
import { HeartIcon as HeartOutlineIcon } from '@heroicons/react/24/outline';
import { api, type RouterOutputs } from '@mtp/utils/api';
import Image from 'next/image';
import { useServerError } from '../ServerErrorContext';
import OptionsPopup from './OptionsPopup';

// Get type from type[]
type ArrayElement<ArrayType> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type MemeCardModel = ArrayElement<RouterOutputs['meme']['getPaginated']['memes']>;

const MemeCard: React.FC<{ meme: MemeCardModel; priority: boolean }> = ({ meme, priority }) => {
  const mutateLikes = api.meme.likeMeme.useMutation();
  const { onServerError } = useServerError();

  const onProfile = () => {
    console.log('clicked');
  };

  const onLike = () => {
    console.log('clicked');

    mutateLikes.mutate(
      {
        memeId: meme.id,
        action: meme.isLiked ? 'unlike' : 'like',
      },
      {
        onSuccess: () => {
          meme._count.likes += meme.isLiked ? -1 : 1;
          meme.isLiked = !meme.isLiked;
        },
        onError: error => onServerError(error),
      }
    );
  };

  const onComments = () => {
    console.log('clicked');
  };

  const onBookmark = () => {
    console.log('clicked');
  };

  return (
    <>
      <div className="flex flex-col rounded-lg bg-neutral-800 text-neutral-300">
        {/* Card Header */}
        <div className="flex justify-between p-2">
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

          <OptionsPopup meme={meme} />
        </div>

        {/* Card Image */}
        <div className="flex justify-center">
          <Image
            priority={priority}
            src={meme.imageURL}
            sizes="(max-width: 768px) 100vw, 400px"
            alt="meme"
            width={0}
            height={0}
            className="max-h-[600px] w-[400px] object-cover"
          />
        </div>

        {/* Card Footer */}
        <div className="flex justify-between p-2">
          <div className="flex items-center">
            <button className="group flex" aria-label="like meme" onClick={onLike}>
              {meme.isLiked ? (
                <HeartIcon className="h-5 w-5 text-red-500 group-hover:text-red-400" />
              ) : (
                <HeartOutlineIcon className="h-5 w-5 text-neutral-500 group-hover:text-neutral-400" />
              )}

              <span className="px-2 text-sm">{meme._count.likes}</span>
            </button>
            <button className="group flex" aria-label="meme comments" onClick={onComments}>
              <ChatBubbleLeftIcon className="ml-2 h-5 w-5 text-neutral-600 group-hover:text-neutral-400" />
              <span className="px-2 text-sm">{meme._count.comments}</span>
            </button>
          </div>
          <button aria-label="bookmark meme" onClick={onBookmark}>
            <BookmarkIcon className="h-5 w-5 text-neutral-600 hover:text-neutral-400" />
          </button>
        </div>
      </div>
      {/* Comments */}
      <div className="flex rounded-lg bg-neutral-800 p-2 text-neutral-300"></div>
    </>
  );
};

export default MemeCard;
