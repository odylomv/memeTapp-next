import { type AppRouter } from '@mtp/server/api/root';
import { type TRPCClientErrorLike } from '@trpc/client';
import React, { createContext, useContext, useState } from 'react';
import SignUpDialog from '../SignUpDialog';

const ServerErrorContext = createContext<
  { onServerError: (error: TRPCClientErrorLike<AppRouter>) => void; showSignUpDialog: () => void } | undefined
>(undefined);

const ServerErrorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [openSignUpDialog, setOpenSignUpDialog] = useState(false);

  const showSignUpDialog = () => setOpenSignUpDialog(true);

  const onServerError = (error: TRPCClientErrorLike<AppRouter>) => {
    switch (error.data?.code) {
      case 'UNAUTHORIZED':
        showSignUpDialog();
        break;
      default:
        console.log(error.data?.code);
    }
  };

  return (
    <ServerErrorContext.Provider value={{ onServerError, showSignUpDialog }}>
      {children}
      <SignUpDialog
        open={openSignUpDialog}
        onClose={() => {
          console.log('Sign up modal closed');
          setOpenSignUpDialog(false);
        }}
      ></SignUpDialog>
    </ServerErrorContext.Provider>
  );
};

// Infer that onServerError is not undefined and prevent incorrect Context usage
// https://stackoverflow.com/questions/49949099/react-createcontext-point-of-defaultvalue/69735347#69735347
export const useServerError = () => {
  const serverErrorCtx = useContext(ServerErrorContext);

  if (!serverErrorCtx) throw new Error('No ServerErrorContext.Provider found when calling useServerError.');
  return serverErrorCtx;
};

export default ServerErrorProvider;
