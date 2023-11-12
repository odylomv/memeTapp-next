import banner from '@assets/memeTapp_banner.png';
import banner_black from '@assets/memeTapp_banner_black.png';
import { Github, Menu } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

import { cn } from '@mtp/lib/utils';
import Head from 'next/head';
import React, { useState } from 'react';

import { useAuth, useClerk, useUser } from '@clerk/nextjs';
import ThemeSwitch from '../ThemeSwitch';
import NavDropdown from '../dropdowns/NavDropdown';
import UserButton from '../dropdowns/UserButton';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '../ui/navigation-menu';
import RootLayout from './RootLayout';

const navigation = [
  { name: 'Explore', href: '/explore' },
  { name: 'Profile', href: '/profile' },
  { name: 'Search', href: '#' },
] as const;

export default function NavbarLayout({
  children,
  currentLink,
}: {
  children: React.ReactNode;
  currentLink: (typeof navigation)[number]['name'];
}) {
  return (
    <RootLayout>
      <Head>
        <title>{`${currentLink} | memeTapp`}</title>
        <meta name="description" content="memeTapp is a Meme social media platform" />
      </Head>

      {/* Header navbar */}
      <div className="sticky top-0 bg-muted transition-colors">
        {/* Header contents */}
        <div className="container flex justify-between p-2">
          <div className="md:hidden">
            <MobileNavbarMenu />
          </div>

          <div className="flex gap-6">
            {/* memeTapp logo */}
            <Link href="/">
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
                        className={cn(navigationMenuTriggerStyle(), currentLink === item.name && 'bg-secondary')}
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
    </RootLayout>
  );
}

function MobileNavbarMenu() {
  const [dropdown, setDropdown] = useState(false);

  const MenuButton = () => (
    <Button variant={'ghost'} aria-label="Navigation menu" onClick={() => setDropdown(true)}>
      <Menu className="text-muted-foreground" />
    </Button>
  );

  return dropdown ? <NavDropdown open={dropdown} onClose={() => setDropdown(false)} /> : <MenuButton />;
}

export function CustomSignInButton() {
  const clerk = useClerk();
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const { resolvedTheme } = useTheme();

  const Skeleton = () => (
    <Button variant={'ghost'} size={'sm'} className="rounded-full p-0">
      <div className="h-8 w-8 animate-pulse rounded-full bg-secondary" />
    </Button>
  );

  if (isSignedIn) {
    return user ? <UserButton loading={<Skeleton />} /> : <Skeleton />;
  }

  return (
    <>
      <Button
        variant={'ghost'}
        onClick={() =>
          void (async () =>
            clerk.openSignIn({
              appearance: {
                baseTheme: resolvedTheme === 'dark' ? (await import('@clerk/themes')).dark : undefined,
              },
            }))()
        }
      >
        <span>Login</span>
      </Button>
    </>
  );
}
