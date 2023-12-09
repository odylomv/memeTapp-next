'use client';

import { useUser } from '@clerk/nextjs';
import { dateFromNow } from '@mtp/lib/utils';
import { api } from '@mtp/trpc/react';
import { type RouterOutputs } from '@mtp/trpc/shared';
import { Bookmark, Heart, MessageCircle, MoreVertical, Trash2, Wrench } from 'lucide-react';
import Image from 'next/image';
import DesktopTooltip from './DesktopTooltip';
import { useDialog } from './providers/DialogProvider';
import { Button } from './ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export default function MemeCard({ meme, priority }: { meme: RouterOutputs['meme']['getMeme']; priority: boolean }) {
  const { serverError } = useDialog();
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
        onError: error => serverError(error),
      }
    );
  };

  if (!meme) return <div>No meme</div>;

  return (
    <div className="flex flex-col rounded-md bg-muted text-muted-foreground shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 pl-2">
          <Button variant={'link'} size={'sm'} className="gap-2 p-0 text-sm">
            <Image
              src={meme.author.image}
              width={50}
              height={50}
              className="h-6 w-6 rounded-full object-cover"
              alt="Profile picture"
            />
            <p>{meme.author.name}</p>
          </Button>
          {/* Meme post elapsed time */}
          <span className="cursor-default text-xs text-card-foreground">&bull;</span>
          <DesktopTooltip content={meme.createdAt.toLocaleString()}>
            <div className="cursor-default text-xs text-card-foreground">{dateFromNow(meme.createdAt)}</div>
          </DesktopTooltip>
        </div>

        <OptionsButton meme={meme} />
      </div>

      <Image
        priority={priority}
        src={meme.imageURL}
        sizes="(max-width: 600px) 100vw, 600px"
        alt="meme"
        width={600}
        height={700}
        className="max-h-[700px] object-cover"
      />

      <div className="flex justify-between">
        <div className="flex gap-2">
          <DesktopTooltip content={meme.isLiked ? 'Unlike meme' : 'Like meme'}>
            <Button variant={'ghost'} size={'sm'} className="gap-2" onClick={onLike}>
              <Heart
                className={`h-5 w-5 ${meme.isLiked ? 'text-red-500' : 'text-muted-foreground'}`}
                fill={meme.isLiked ? 'currentColor' : 'none'}
              />
              <span>{meme._count.likes}</span>
            </Button>
          </DesktopTooltip>

          <DesktopTooltip content="View comments">
            <Button variant={'ghost'} size={'sm'} className="gap-2">
              <MessageCircle className="h-5 w-5 text-muted-foreground" fill="currentColor" />
              <span>{meme._count.comments}</span>
            </Button>
          </DesktopTooltip>
        </div>
        <div>
          <DesktopTooltip content="Bookmark meme (coming soon)">
            <Button variant={'ghost'} size={'sm'} aria-label="Bookmark">
              <Bookmark className="h-5 w-5 text-muted-foreground" fill="currentColor" />
            </Button>
          </DesktopTooltip>
        </div>
      </div>
    </div>
  );
}

function OptionsButton({ meme }: { meme: RouterOutputs['meme']['getMeme'] }) {
  const { deleteMeme } = useDialog();
  const { user } = useUser();

  return (
    meme && (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={'ghost'} size={'sm'} aria-label="Options">
              <MoreVertical className="h-5 w-5 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" alignOffset={2} className="">
            <DropdownMenuLabel>Options</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => console.log(meme)}>
              <Wrench className="h-4 w-4" />
              Log debug info
            </DropdownMenuItem>
            {user?.id === meme.authorId && (
              <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => deleteMeme(meme)}>
                <Trash2 className="h-4 w-4" />
                Delete meme
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    )
  );
}
