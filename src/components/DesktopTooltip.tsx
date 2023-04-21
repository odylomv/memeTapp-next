import { type ReactNode } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

export default function DesktopTooltip({ children, content }: { children: ReactNode; content: string }) {
  return (
    <>
      <span className="sm:hidden">{children}</span>
      <span className="hidden sm:inline">
        <Tooltip>
          <TooltipTrigger asChild>{children}</TooltipTrigger>
          <TooltipContent>
            <p>{content}</p>
          </TooltipContent>
        </Tooltip>
      </span>
    </>
  );
}
