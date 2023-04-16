import banner from '@assets/memeTapp_banner.png';
import banner_black from '@assets/memeTapp_banner_black.png';
import ThemeSwitch from '@mtp/components/ThemeSwitch';
import { Button } from '@mtp/components/ui/Button';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';

export default function NewHome() {
  const { resolvedTheme } = useTheme();

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4">
      <div className="absolute right-4 top-4">
        <ThemeSwitch />
      </div>

      <Image
        className="block h-24 w-auto"
        src={resolvedTheme === 'light' ? banner_black : banner}
        alt="memeTapp"
        sizes="350px"
      />
      <p>
        A meme social media platform created by{' '}
        <Link href="https://github.com/odylomv" className="underline-offset-4 hover:underline">
          @odylomv
        </Link>
      </p>
      <Link href="/explore">
        <Button variant={'destructive'}>Explore memes</Button>
      </Link>
    </div>
  );
}
