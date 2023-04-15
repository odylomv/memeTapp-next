import { SignedIn, SignedOut } from '@clerk/nextjs';
import { type PropsWithChildren } from 'react';
import { Button, type ButtonProps } from './ui/Button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/Dialog';

export default function ProtectedButton({ children, onClick, ...buttonProps }: PropsWithChildren<ButtonProps>) {
  return (
    <>
      <SignedIn>
        <Button onClick={onClick} {...buttonProps}>
          {children}
        </Button>
      </SignedIn>
      <SignedOut>
        <Dialog>
          <DialogTrigger asChild>
            <Button {...buttonProps}>{children}</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your account and remove your data from our
                servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </SignedOut>
    </>
  );
}
