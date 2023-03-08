import { type ReactNode } from 'react';
import MemeCardContext, { type MemeCardModel } from './MemeCardContext';
import { MemeCardFooter } from './widgets/MemeCardFooter';
import { MemeCardHeader } from './widgets/MemeCardHeader';
import { MemeCardImage } from './widgets/MemeCardImage';

type MemeCardProps = {
  meme: MemeCardModel;
  before?: ReactNode;
  content: ReactNode;
  after?: ReactNode;
};

function MemeCard({ meme, before, content, after }: MemeCardProps) {
  return (
    <MemeCardContext.Provider value={{ meme }}>
      <>
        {before}
        <div className="flex flex-col rounded-lg bg-neutral-800 text-neutral-300">{content}</div>
        {after}
      </>
    </MemeCardContext.Provider>
  );
}

MemeCard.Header = MemeCardHeader;
MemeCard.Image = MemeCardImage;
MemeCard.Footer = MemeCardFooter;

export default MemeCard;
