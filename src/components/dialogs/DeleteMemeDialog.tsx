import logo from '@assets/logo.png';
import { api } from '@mtp/trpc/react';
import { type RouterOutputs } from '@mtp/trpc/shared';
import Image from 'next/image';
import { Separator } from '../ui/Separator';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { useToast } from '../ui/use-toast';

export default function DeleteMemeDialog({
  meme,
  open,
  onClose,
}: {
  meme: RouterOutputs['meme']['getMeme'];
  open: boolean;
  onClose: () => void;
}) {
  const { toast } = useToast();
  const trpcContext = api.useUtils();
  const memeDelete = api.meme.deleteMeme.useMutation();

  const deleteMeme = () => {
    if (meme) {
      memeDelete.mutate(
        { id: meme.id },
        {
          onSuccess: () => {
            void trpcContext.meme.getPaginated.invalidate();
            toast({
              description: 'Successfully deleted meme',
            });
          },
        }
      );
    }
  };

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
            <AlertDialogTitle>Delete meme</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete your meme? Maybe your past self was funnier. This meme is so funny, I
              promise. You can&apos;t change your mind later.
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>
        <Separator />
        <AlertDialogFooter className="px-6 py-3 dark:bg-muted sm:rounded-b-md">
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction onClick={deleteMeme}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
