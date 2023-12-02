import { useUser } from '@clerk/nextjs';
import { dateFromNow } from '@mtp/lib/utils';
import { Bookmark, Heart, MessageCircle, MoreVertical } from 'lucide-react';
import Image from 'next/image';
import { Button } from './ui/Button';

export default function MockMemeCard({ imageUrl }: { imageUrl: string }) {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="flex flex-col rounded-md bg-muted text-muted-foreground shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 pl-2">
          <Button variant={'link'} size={'sm'} className="gap-2 p-0 text-sm">
            <Image
              src={user.imageUrl}
              width={50}
              height={50}
              className="h-6 w-6 rounded-full object-cover"
              alt="Profile picture"
            />
            <p>{user.username}</p>
          </Button>

          <span className="text-xs">&bull;</span>
          <span className="text-xs">{dateFromNow(new Date())}</span>
        </div>

        <Button variant={'ghost'} size={'sm'} aria-label="Options">
          <MoreVertical className="h-5 w-5 text-muted-foreground" />
        </Button>
      </div>
      <Image
        src={imageUrl}
        sizes="(max-width: 768px) 100vw, 600px"
        alt="meme"
        width={0}
        height={0}
        className="max-h-[500px] w-[600px] object-cover"
      />
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button variant={'ghost'} size={'sm'} className="gap-2">
            <Heart className={'h-5 w-5 text-muted-foreground'} fill="none" />
            <span>0</span>
          </Button>

          <Button variant={'ghost'} size={'sm'} className="gap-2">
            <MessageCircle className="h-5 w-5 text-muted-foreground" fill="currentColor" />
            <span>0</span>
          </Button>
        </div>
        <div>
          <Button variant={'ghost'} size={'sm'} aria-label="Bookmark">
            <Bookmark className="h-5 w-5 text-muted-foreground" fill="currentColor" />
          </Button>
        </div>
      </div>
    </div>
  );
}
