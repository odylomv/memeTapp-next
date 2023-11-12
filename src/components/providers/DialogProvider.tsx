import { type RouterOutputs } from '@mtp/lib/api';
import { type AppRouter } from '@mtp/server/api/root';
import { type TRPCClientErrorLike } from '@trpc/client';
import { createContext, useContext, useState } from 'react';
import DeleteMemeDialog from '../dialogs/DeleteMemeDialog';
import SignUpDialog from '../dialogs/SignUpDialog';
import UploadMemeDialog from '../dialogs/UploadMemeDialog';

interface DialogContextOptions {
  signUp: () => void;
  deleteMeme: (meme: RouterOutputs['meme']['getMeme']) => void;
  uploadMeme: () => void;
  serverError: (error: TRPCClientErrorLike<AppRouter>) => void;
}

const DialogContext = createContext<DialogContextOptions | undefined>(undefined);

export default function DialogProvider({ children }: { children: React.ReactNode }) {
  const [signUp, setSignUp] = useState<{ open?: boolean }>({});
  const [deleteMeme, setDeleteMeme] = useState<{ open?: boolean; meme: RouterOutputs['meme']['getMeme'] | null }>({
    meme: null,
  });
  const [uploadMeme, setUploadMeme] = useState<{ open?: boolean }>({});

  const dialogOptions: DialogContextOptions = {
    signUp: () => setSignUp({ open: true }),
    deleteMeme: meme => setDeleteMeme({ open: true, meme }),
    uploadMeme: () => setUploadMeme({ open: true }),
    serverError: error => {
      switch (error.data?.code) {
        case 'UNAUTHORIZED':
          setSignUp({ open: true });
          break;
        default:
          console.log(error.data?.code);
      }
    },
  };

  return (
    <>
      <DialogContext.Provider value={dialogOptions}>
        {children}

        {signUp.open !== undefined && (
          <SignUpDialog
            open={signUp.open}
            onClose={() => {
              setSignUp({ open: false });
            }}
          />
        )}

        {deleteMeme.open !== undefined && (
          <DeleteMemeDialog
            open={deleteMeme.open}
            meme={deleteMeme.meme}
            onClose={() => {
              setDeleteMeme({ open: false, meme: null });
            }}
          />
        )}

        {uploadMeme.open !== undefined && (
          <UploadMemeDialog
            open={uploadMeme.open}
            onClose={() => {
              setUploadMeme({ open: false });
            }}
          />
        )}
      </DialogContext.Provider>
    </>
  );
}

// Infer that DialogContextOptions is not undefined and prevent incorrect Context usage
// https://stackoverflow.com/questions/49949099/react-createcontext-point-of-defaultvalue/69735347#69735347
export const useDialog = () => {
  const dialogCtx = useContext(DialogContext);

  if (!dialogCtx) throw new Error('No DialogContext.Provider found when calling useDialog.');
  return dialogCtx;
};
