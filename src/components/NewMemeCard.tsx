import { api, type RouterOutputs } from '@mtp/lib/api';
import { dateFromNow } from '@mtp/lib/utils';
import { Bookmark, Heart, MessageCircle, MoreVertical } from 'lucide-react';
import Image from 'next/image';
import { useServerError } from './ServerErrorContext';
import { Avatar, AvatarFallback, AvatarImage } from './ui/Avatar';
import { Button } from './ui/Button';

export default function NewMemeCard({ meme, priority }: { meme: RouterOutputs['meme']['getMeme']; priority: boolean }) {
  const { onServerError } = useServerError();
  const mutateLikes = api.meme.likeMeme.useMutation();

  const onLike = () => {
    console.log('clicked');
    if (!meme) return;

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

  if (!meme) return <div>No meme</div>;

  return (
    <div className="flex flex-col rounded-md bg-neutral-100 text-neutral-500 shadow-lg dark:bg-neutral-900">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 pl-2">
          <Button variant={'link'} size={'sm'} className="gap-2 p-0 text-sm">
            <Avatar className="h-6 w-6">
              <AvatarImage src={meme.author.image} />
              <AvatarFallback>{meme.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <p>{meme.author.name}</p>
          </Button>
          {/* Meme post elapsed time */}
          <span className="text-xs">&bull;</span>
          <span className="text-xs">{dateFromNow(meme.createdAt, false)}</span>
        </div>

        <Button variant={'ghost'} size={'sm'}>
          <MoreVertical className="h-5 w-5 text-neutral-500" />
        </Button>
      </div>
      <Image
        priority={priority}
        src={meme.imageURL}
        sizes="(max-width: 768px) 100vw, 600px"
        alt="meme"
        width={0}
        height={0}
        className="max-h-[700px] w-[600px] object-cover"
      />
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button variant={'ghost'} size={'sm'} className="gap-2" onClick={onLike}>
            <Heart
              className={`h-5 w-5 ${meme.isLiked ? 'text-red-500' : 'text-neutral-500'}`}
              fill={meme.isLiked ? 'currentColor' : 'none'}
            />
            <span>{meme._count.likes}</span>
          </Button>
          <Button variant={'ghost'} size={'sm'} className="gap-2">
            <MessageCircle className="h-5 w-5 text-neutral-500" fill="currentColor" />
            <span>{meme._count.comments}</span>
          </Button>
        </div>
        <div>
          <Button variant={'ghost'} size={'sm'}>
            <Bookmark className="h-5 w-5 text-neutral-500" fill="currentColor" />
          </Button>
        </div>
      </div>
    </div>
  );
}
