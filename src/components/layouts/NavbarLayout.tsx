import banner from '@assets/memeTapp_banner.png';
import banner_black from '@assets/memeTapp_banner_black.png';
import { Github, LogOut, Menu, Moon, Settings, Sun, SunMoon, User } from 'lucide-react';
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

import { cn } from '@mtp/lib/utils';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';

import { useAuth, useClerk, useUser } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '../ui/NavigationMenu';

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
    <>
      <Head>
        <title>{`${currentLink} | memeTapp`}</title>
        <meta name="description" content="memeTapp is a Meme social media platform" />
      </Head>

      <div className="flex flex-1 flex-col overflow-auto">
        <div className="flex justify-center bg-neutral-100 transition-colors dark:bg-neutral-900">
          <div className="flex w-full max-w-7xl justify-between p-2">
            <MobileNavbarMenu />
            <div className="flex">
              {/* memeTapp logo */}
              <Link href="/" className="flex items-center">
                <Image className=" hidden h-auto w-[150px] dark:block" src={banner} alt="memeTapp" priority />
                <Image className="block h-auto w-[150px] dark:hidden" src={banner_black} alt="memeTapp" priority />
                {process.env.NODE_ENV === 'development' && <span className="text-xs font-bold">DEV</span>}
              </Link>

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

            <div className="flex items-center gap-2">
              <CustomSignInButton />
              <Link
                href="https://github.com/odylomv"
                aria-label="Developer GitHub profile"
                className="rounded-md p-2 hover:bg-neutral-200 dark:hover:bg-neutral-800"
              >
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
      <Button variant={'ghost'} className="md:hidden">
        <Menu className="text-neutral-400" />
      </Button>
    );
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'} aria-label="Navigation menu" className="md:hidden">
          <Menu className="text-neutral-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="ml-4 w-44 sm:w-72">
        <DropdownMenuLabel>Menu</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {navigation.map(item => (
          <DropdownMenuItem key={item.name} asChild>
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

export function CustomSignInButton() {
  const clerk = useClerk();
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const { resolvedTheme } = useTheme();

  if (isSignedIn) {
    if (!user)
      return (
        <Button variant={'ghost'} size={'sm'} className="gap-2 rounded-full p-0">
          <div className="h-8 w-8 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-800" />
        </Button>
      );

    return (
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant={'ghost'} size={'sm'} className="gap-2 rounded-full p-0">
            <Image
              src={user.profileImageUrl}
              width={50}
              height={50}
              className="h-8 w-8 rounded-full object-cover"
              alt={user.username ?? 'user'}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="">
          <DropdownMenuLabel>{user.username}</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() =>
              clerk.openUserProfile({ appearance: { baseTheme: resolvedTheme === 'dark' ? dark : undefined } })
            }
          >
            <User className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem className="text-red-500" onClick={() => void clerk.signOut()}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <>
      <Button
        variant={'ghost'}
        onClick={() => clerk.openSignIn({ appearance: { baseTheme: resolvedTheme === 'dark' ? dark : undefined } })}
      >
        <span className="">Login</span>
      </Button>
    </>
  );
}
