import { type ReactNode } from 'react';
import MyTooltip from './MyTooltip';

export default function DesktopTooltip({ children, content }: { children: ReactNode; content: string }) {
  return (
    <>
      <span className="sm:hidden">{children}</span>
      <span className="hidden sm:inline">
        <MyTooltip content={content}>{children}</MyTooltip>
      </span>
    </>
  );
}
