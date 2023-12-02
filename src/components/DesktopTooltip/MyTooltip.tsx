import { type ReactNode } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/Tooltip';

export default function MyTooltip({ children, content }: { children: ReactNode; content: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>
        <p>{content}</p>
      </TooltipContent>
    </Tooltip>
  );
}
