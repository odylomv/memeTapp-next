import logo from '@assets/logo.png';
import { useClerk } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import { Separator } from './ui/separator';

export default function SignUpDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const clerk = useClerk();
  const { resolvedTheme } = useTheme();

  return (
    <AlertDialog
      open={open}
      onOpenChange={isOpen => {
        if (!isOpen) onClose();
      }}
    >
      <AlertDialogContent className="gap-0 p-0">
        <AlertDialogHeader className="items-center gap-4 p-6 sm:flex-row sm:items-start">
          <Image src={logo} alt="logo" className="h-auto w-12" />
          <div className="flex flex-col gap-2">
            <AlertDialogTitle>
              Join mem<span className="italic text-destructive">eT</span>app!
            </AlertDialogTitle>
            <AlertDialogDescription>
              You must be logged in to do this action. Create an account now to not miss out on the fun!
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>
        <Separator />
        <AlertDialogFooter className="px-6 py-3 dark:bg-muted sm:rounded-b-md">
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={() => clerk.openSignUp({ appearance: { baseTheme: resolvedTheme === 'dark' ? dark : undefined } })}
          >
            Sign Up
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
