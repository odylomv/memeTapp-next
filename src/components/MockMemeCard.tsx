import { useUser } from '@clerk/nextjs';
import { dateFromNow } from '@mtp/lib/utils';
import { Bookmark, Heart, MessageCircle, MoreVertical } from 'lucide-react';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from './ui/Avatar';
import { Button } from './ui/Button';

export default function MockMemeCard({ imageUrl }: { imageUrl: string }) {
  const { user } = useUser();

  return (
    <div className="flex flex-col rounded-md bg-neutral-100 text-neutral-500 shadow-lg dark:bg-neutral-900">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 pl-2">
          <Button variant={'link'} size={'sm'} className="gap-2 p-0 text-sm">
            <Avatar className="h-6 w-6">
              <AvatarImage src={user?.profileImageUrl} />
              <AvatarFallback>{user?.username?.charAt(0)}</AvatarFallback>
            </Avatar>
            <p>{user?.username}</p>
          </Button>
          {/* Meme post elapsed time */}
          <span className="text-xs">&bull;</span>
          <span className="text-xs">{dateFromNow(new Date(), false)}</span>
        </div>

        <Button variant={'ghost'} size={'sm'}>
          <MoreVertical className="h-5 w-5 text-neutral-500" />
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
            <Heart className={`h-5 w-5 text-neutral-500`} />
            <span>0</span>
          </Button>
          <Button disabled variant={'ghost'} size={'sm'} className="gap-2">
            <MessageCircle className="h-5 w-5 text-neutral-500" fill="currentColor" />
            <span>0</span>
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
