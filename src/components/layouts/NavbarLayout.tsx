import banner from '@assets/memeTapp_banner.png';
import banner_black from '@assets/memeTapp_banner_black.png';
import { Github, Menu, Moon, Sun, SunMoon } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import ThemeSwitch from '../ThemeSwitch';
import { Button } from '../ui/Button';
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
} from '../ui/DropdownMenu';
import { Separator } from '../ui/Separator';

const navigation = [
  { name: 'Explore', href: '/explore' },
  { name: 'Profile', href: '/profile' },
  { name: 'Search', href: '#' },
] as const;

import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { cn } from '@mtp/lib/utils';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '../ui/NavigationMenu';

export default function NavbarLayout({
  children,
  currentLink,
}: {
  children: React.ReactNode;
  currentLink: (typeof navigation)[number]['name'];
}) {
  return (
    <>
      <Head>
        <title>{`${currentLink} | memeTapp`}</title>
        <meta name="description" content="memeTapp is a Meme social media platform" />
      </Head>

      <div className="flex flex-1 flex-col overflow-auto">
        <div className="flex justify-center bg-neutral-100 transition-colors dark:bg-neutral-900">
          <div className="flex w-full max-w-7xl justify-between p-2">
            <div className="flex">
              <MobileNavbarMenu />
              <NavbarLogo />

              <NavigationMenu className="hidden pl-8 md:block">
                <NavigationMenuList>
                  {navigation.map(item => (
                    <NavigationMenuItem key={item.name}>
                      <Link href={item.href} legacyBehavior passHref>
                        <NavigationMenuLink
                          className={cn(
                            navigationMenuTriggerStyle(),
                            currentLink === item.name && 'bg-neutral-200 dark:bg-neutral-800'
                          )}
                        >
                          {item.name}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            <div className="flex items-center gap-4">
              <AuthButton />
              <Link href="https://github.com/odylomv" aria-label="Developer GitHub profile">
                <Github className="h-5 w-5 text-neutral-500 dark:text-neutral-400" fill="currentColor" />
              </Link>
              <div className="hidden md:block">
                <ThemeSwitch />
              </div>
            </div>
          </div>
        </div>
        <Separator />
        <div className="flex-1 overflow-x-hidden overflow-y-scroll">{children}</div>
      </div>
    </>
  );
}

function MobileNavbarMenu() {
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
        <Button variant={'ghost'} aria-label="Navigation menu" className="md:hidden">
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

function NavbarLogo() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <div className="flex items-center">
        <div className="w-[120px]"></div>
        {process.env.NODE_ENV === 'development' && <span className="text-xs font-bold">DEV</span>}
      </div>
    );

  return (
    <Link href="/" className="flex items-center">
      <Image
        className="block h-auto w-[120px] "
        src={resolvedTheme === 'light' ? banner_black : banner}
        alt="memeTapp"
        sizes="150px"
        priority
      />
      {process.env.NODE_ENV === 'development' && <span className="text-xs font-bold">DEV</span>}
    </Link>
  );
}
