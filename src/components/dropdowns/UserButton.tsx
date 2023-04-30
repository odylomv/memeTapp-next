import { useClerk, useUser } from '@clerk/nextjs';
import { LogOut, Settings, User } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export default function UserButton({ loading }: { loading: JSX.Element }) {
  const clerk = useClerk();
  const { user } = useUser();
  const { resolvedTheme } = useTheme();

  if (!user) return loading;

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
            void (async () =>
              clerk.openUserProfile({
                appearance: {
                  baseTheme: resolvedTheme === 'dark' ? (await import('@clerk/themes')).dark : undefined,
                },
              }))()
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
