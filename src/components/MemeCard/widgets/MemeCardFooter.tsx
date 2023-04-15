import { BookmarkIcon, ChatBubbleLeftIcon, HeartIcon } from '@heroicons/react/20/solid';
import { HeartIcon as HeartOutlineIcon } from '@heroicons/react/24/outline';
import { api } from '@mtp/lib/api';
import { useServerError } from '../../ServerErrorContext';
import { useMemeCardContext } from '../MemeCardContext';

export const MemeCardFooter: React.FC<{ disabled?: boolean }> = ({ disabled = false }) => {
  const { onServerError } = useServerError();
  const { meme } = useMemeCardContext();

  const mutateLikes = api.meme.likeMeme.useMutation();

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
    <div className="flex justify-between p-2">
      <div className="flex items-center">
        <button disabled={disabled} className="group flex" aria-label="like meme" onClick={onLike}>
          {meme.isLiked ? (
            <HeartIcon className="h-5 w-5 text-red-500 group-hover:text-red-400" />
          ) : (
            <HeartOutlineIcon className="h-5 w-5 text-neutral-500 group-hover:text-neutral-400" />
          )}

          <span className="px-2 text-sm">{meme._count.likes}</span>
        </button>
        <button disabled={disabled} className="group flex" aria-label="meme comments" onClick={onComments}>
          <ChatBubbleLeftIcon className="ml-2 h-5 w-5 text-neutral-600 group-hover:text-neutral-400" />
          <span className="px-2 text-sm">{meme._count.comments}</span>
        </button>
      </div>
      <button disabled={disabled} aria-label="bookmark meme" onClick={onBookmark}>
        <BookmarkIcon className="h-5 w-5 text-neutral-600 hover:text-neutral-400" />
      </button>
    </div>
  );
};
