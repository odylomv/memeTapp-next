import NextTopLoader from 'nextjs-toploader';
import { Toaster } from '../Toaster';
import DialogProvider from '../providers/DialogProvider';
import { TooltipProvider } from '../ui/Tooltip';

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
