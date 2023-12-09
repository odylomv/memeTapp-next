'use client';

import ThemeSwitch from '@mtp/components/ThemeSwitch';

import { Button } from '@mtp/components/ui/Button';
import { Separator } from '@mtp/components/ui/Separator';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@mtp/components/ui/navigation-menu';
import { cn } from '@mtp/lib/utils';
import { Github } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import banner from '@assets/memeTapp_banner.png';
import banner_black from '@assets/memeTapp_banner_black.png';
import { useUser } from '@clerk/nextjs';
import { CustomSignInButton } from '@mtp/components/CustomSignInButton';
import { MobileNavbarMenu } from '@mtp/components/MobileNavbarMenu';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Explore', href: '/explore' },
  { name: 'Profile', href: '/profile' },
  { name: 'Search', href: '#' },
] as const;

export default function NavbarLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <>
      {/* Header navbar */}
      <div className="sticky top-0 bg-muted transition-colors">
        {/* Header contents */}
        <div className="container flex justify-between p-2">
          <div className="md:hidden">
            <MobileNavbarMenu />
          </div>

          <div className="flex gap-6">
            {/* memeTapp logo */}
            <Link href={user ? '/explore' : '/'}>
              <Image
                priority
                className="hidden h-10 w-auto object-contain dark:inline-block"
                src={banner}
                sizes="200px"
                alt="memeTapp"
              />
              <Image
                priority
                className="inline-block h-10 w-auto object-contain dark:hidden"
                src={banner_black}
                sizes="200px"
                alt="memeTapp"
              />
              {process.env.NODE_ENV === 'development' && <span className="text-xs font-bold">DEV</span>}
            </Link>

            <NavigationMenu className="hidden md:block">
              <NavigationMenuList>
                {navigation.map(item => (
                  <NavigationMenuItem key={item.name}>
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={cn(navigationMenuTriggerStyle(), pathname === item.href && 'bg-secondary')}
                      >
                        {item.name}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center gap-2">
            <CustomSignInButton />
            <Link href="https://github.com/odylomv" legacyBehavior passHref>
              <Button variant={'ghost'} size={'sm'} aria-label="Developer GitHub profile">
                <Github className="h-5 w-5 text-muted-foreground" fill="currentColor" />
              </Button>
            </Link>
            <div className="hidden md:block">
              <ThemeSwitch />
            </div>
          </div>
        </div>
        <Separator />
      </div>
      <div className="flex-1">{children}</div>
    </>
  );
}
