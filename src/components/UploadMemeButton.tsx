'use client';

import { useUser } from '@clerk/nextjs';
import { Plus } from 'lucide-react';
import { useDialog } from './providers/DialogProvider';
import { Button } from './ui/Button';

export function UploadMemeButton() {
  const { user } = useUser();
  const { uploadMeme, signUp } = useDialog();

  return (
    <Button variant={'ghost'} onClick={() => void (user ? uploadMeme() : signUp())}>
      <Plus className="mr-2 h-6 w-6 text-destructive" />
      <span className="text-lg font-semibold">New meme</span>
    </Button>
  );
}
