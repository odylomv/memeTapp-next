import banner from '@assets/memeTapp_banner.png';
import banner_black from '@assets/memeTapp_banner_black.png';
import { Github, Laptop, LogOut, Menu, Moon, Settings, Sun, User } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import ThemeSwitch from '../ThemeSwitch';
import { Button } from '../ui/button';
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
} from '../ui/dropdown-menu';
import { Separator } from '../ui/separator';

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
} from '../ui/navigation-menu';

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
                className="hidden h-10 w-auto dark:inline-block"
                src={banner}
                sizes="200px"
                alt="memeTapp"
              />
              <Image
                priority
                className="inline-block h-10 w-auto dark:hidden"
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
      <Button variant={'ghost'} aria-label="Navigation menu">
        <Menu className="text-muted-foreground" />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'} aria-label="Navigation menu">
          <Menu className="text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44 sm:w-72">
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
                  <Sun className="h-4 w-4" />
                  Light
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="dark">
                  <Moon className="h-4 w-4" />
                  Dark
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="system">
                  <Laptop className="h-4 w-4" />
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
        <Button variant={'ghost'} size={'sm'} className="rounded-full p-0">
          <div className="h-8 w-8 animate-pulse rounded-full bg-secondary" />
        </Button>
      );

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'ghost'} size={'sm'} className="rounded-full p-0">
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
            <User className="h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <Settings className="h-4 w-4" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => void clerk.signOut()}>
            <LogOut className="h-4 w-4" />
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
