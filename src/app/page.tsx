import ThemeSwitch from '@mtp/components/ThemeSwitch';
import Image from 'next/image';

import banner from '@assets/memeTapp_banner.png';
import banner_black from '@assets/memeTapp_banner_black.png';
import { Button } from '@mtp/components/ui/Button';
import Link from 'next/link';

export default async function Home() {
  console.log('Hi app dir');
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4">
      <div className="absolute right-4 top-4">
        <ThemeSwitch />
      </div>

      <Image
        priority
        className="hidden h-24 w-auto object-contain dark:inline-block"
        src={banner}
        sizes="200px"
        alt="memeTapp"
      />
      <Image
        priority
        className="inline-block h-24 w-auto object-contain dark:hidden"
        src={banner_black}
        sizes="200px"
        alt="memeTapp"
      />

      <p>
        A meme social media platform created by{' '}
        <Link href="https://github.com/odylomv" className="underline-offset-4 hover:underline">
          @odylomv
        </Link>
      </p>
      <Link href="/explore" legacyBehavior passHref>
        <Button variant={'destructive'}>Explore memes</Button>
      </Link>
    </div>
  );
}
