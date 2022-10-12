import { TRPCClientErrorLike } from '@trpc/client';
import React, { createContext, useContext, useState } from 'react';
import { AppRouter } from '../server/trpc/router';
import LoginModal from './LoginModal';

const ServerErrorContext = createContext<
  { onServerError: (error: TRPCClientErrorLike<AppRouter>) => void } | undefined
>(undefined);

const ServerErrorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [openLoginModal, setOpenLoginModal] = useState(false);

  const onServerError = (error: TRPCClientErrorLike<AppRouter>) => {
    switch (error.data?.code) {
      case 'UNAUTHORIZED':
        setOpenLoginModal(true);
        break;
      default:
        console.log(error.data?.code);
    }
  };

  return (
    <ServerErrorContext.Provider value={{ onServerError }}>
      {children}
      <LoginModal open={openLoginModal} onClose={() => setOpenLoginModal(false)}></LoginModal>
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
