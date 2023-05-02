import dynamic from 'next/dynamic';
import { Toaster } from '../Toaster';
import DialogProvider from '../providers/DialogProvider';

const TooltipProvider = dynamic(() => import('../ui/tooltip').then(m => m.TooltipProvider));
const NextTopLoader = dynamic(() => import('nextjs-toploader'));

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DialogProvider>
        <TooltipProvider>
          <NextTopLoader height={2} color="#dc2626" />
          <main className="flex h-screen w-screen flex-col overflow-y-scroll transition-colors">{children}</main>
          <Toaster />
        </TooltipProvider>
      </DialogProvider>
    </>
  );
}
