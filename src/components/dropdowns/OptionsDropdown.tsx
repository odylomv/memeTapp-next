import { useUser } from '@clerk/nextjs';
import { type RouterOutputs } from '@mtp/lib/api';
import { MoreVertical, Trash2, Wrench } from 'lucide-react';
import { useDialog } from '../providers/DialogProvider';
import { Button } from '../ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export default function OptionsDropdown({
  meme,
  open,
  onClose,
}: {
  meme: RouterOutputs['meme']['getMeme'];
  open: boolean;
  onClose: () => void;
}) {
  const { deleteMeme } = useDialog();
  const { user } = useUser();

  return (
    meme && (
      <>
        <DropdownMenu
          open={open}
          onOpenChange={isOpen => {
            if (!isOpen) onClose();
          }}
        >
          <DropdownMenuTrigger asChild>
            <Button variant={'ghost'} size={'sm'} aria-label="Options">
              <MoreVertical className="h-5 w-5 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" alignOffset={2} className="">
            <DropdownMenuLabel>Options</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => console.log(meme)}>
              <Wrench className="h-4 w-4" />
              Log debug info
            </DropdownMenuItem>
            {user?.id === meme.authorId && (
              <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => deleteMeme(meme)}>
                <Trash2 className="h-4 w-4" />
                Delete meme
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    )
  );
}
