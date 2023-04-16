import logo from '@assets/logo.png';
import { SignUpButton } from '@clerk/nextjs';
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
} from './ui/AlertDialog';
import { Separator } from './ui/Separator';

export default function LoginDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AlertDialog
      open={open}
      onOpenChange={isOpen => {
        if (!isOpen) onClose();
      }}
    >
      <AlertDialogContent className="gap-0 p-0">
        <AlertDialogHeader className="items-center gap-4 p-6 sm:flex-row sm:items-start">
          <Image src={logo} alt="logo" className="h-12 w-12" />
          <div className="flex flex-col gap-2">
            <AlertDialogTitle>
              Join mem<span className="italic text-red-600">eT</span>app!
            </AlertDialogTitle>
            <AlertDialogDescription>
              You must be logged in to do this action. Create an account now to not miss out on the fun!
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>
        <Separator />
        <AlertDialogFooter className="px-6 py-3 dark:bg-neutral-800 sm:rounded-b-md">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <SignUpButton mode="modal">
            <AlertDialogAction>Sign Up</AlertDialogAction>
          </SignUpButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
