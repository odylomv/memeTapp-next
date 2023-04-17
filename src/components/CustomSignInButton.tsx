import { SignIn, UserButton, useAuth } from '@clerk/nextjs';
import { useState } from 'react';
import { Button } from './ui/Button';
import { Dialog, DialogContent } from './ui/Dialog';

export default function CustomSignInButton() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { isSignedIn } = useAuth();

  if (isSignedIn) return <UserButton />;

  return (
    <>
      <Button variant={'ghost'} onClick={() => void setDialogOpen(true)}>
        <span className="">Login</span>
      </Button>
      <Dialog
        open={dialogOpen}
        onOpenChange={open => {
          setDialogOpen(open);
        }}
      >
        <DialogContent className=" h-min w-min p-0 dark:bg-transparent">
          <SignIn />
        </DialogContent>
      </Dialog>
    </>
  );
}
