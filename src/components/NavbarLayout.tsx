import banner from '@assets/memeTapp_banner.png';
import banner_black from '@assets/memeTapp_banner_black.png';
import { Menu, Moon, Sun, SunMoon } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import ThemeSwitch from './ThemeSwitch';
import { Button } from './ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './ui/DropdownMenu';
import { Separator } from './ui/Separator';

const navigation = [
  { name: 'Explore', href: '/new/explore' },
  { name: 'Upload', href: '/new/upload' },
  { name: 'Search', href: '#' },
] as const;

import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';

export default function NavbarLayout({
  children,
  currentLink,
}: {
  children: React.ReactNode;
  currentLink: (typeof navigation)[number]['name'];
}) {
  const { resolvedTheme } = useTheme();

  return (
    <>
      <Head>
        <title>{`${currentLink} | memeTapp`}</title>
        <meta name="description" content="memeTapp is a Meme social media platform" />
      </Head>

      <div className="flex flex-1 flex-col overflow-auto">
        <div className="flex justify-center bg-neutral-100 dark:bg-neutral-900">
          <div className="flex w-full max-w-7xl justify-between p-2">
            <div className="mr-4 md:hidden">
              <NavbarMenu />
            </div>

            <Link href="/new" className="flex items-center">
              <Image
                className="block h-8 w-auto md:h-10"
                src={resolvedTheme === 'light' ? banner_black : banner}
                alt="memeTapp"
                sizes="150px"
                priority
              />
              {process.env.NODE_ENV === 'development' && <span className="text-xs font-bold">DEV</span>}
            </Link>

            <div className="hidden gap-4 pl-8 md:flex">
              {navigation.map(item => (
                <Link key={item.name} href={item.href} passHref legacyBehavior>
                  <Button variant={item.name === currentLink ? 'subtle' : 'ghost'}>{item.name}</Button>
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3 md:ml-auto">
              <div className="hidden md:block">
                <ThemeSwitch />
              </div>
              <AuthButton />
            </div>
          </div>
        </div>
        <Separator />
        <div className="flex-1 overflow-x-hidden overflow-y-scroll">{children}</div>
      </div>
    </>
  );
}

function NavbarMenu() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant={'ghost'}>
        <Menu className="text-neutral-400" />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'}>
          <Menu className="text-neutral-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="ml-4 w-44 sm:w-72">
        <DropdownMenuLabel>Menu</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {navigation.map(item => (
          <DropdownMenuItem key={item.name}>
            <Link href={item.href}>{item.name}</Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                <DropdownMenuRadioItem value="light">
                  <Sun className="mr-2 h-4 w-4" />
                  Light
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="dark">
                  <Moon className="mr-2 h-4 w-4" />
                  Dark
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="system">
                  <SunMoon className="mr-2 h-4 w-4" />
                  System
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function AuthButton() {
  return (
    <>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <Button variant={'ghost'}>Login</Button>
        </SignInButton>
      </SignedOut>
    </>
  );
}
