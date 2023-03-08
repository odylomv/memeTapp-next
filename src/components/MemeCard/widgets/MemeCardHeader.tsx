import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import moment from 'moment';
import Image from 'next/image';
import { useMemeCardContext } from '../MemeCardContext';
import OptionsPopup from './OptionsPopup';

const dateFromNow = (date: Date) => moment(date).fromNow(true);

const onProfile = () => {
  console.log('clicked');
};

export const MemeCardHeader: React.FC<{ disabled?: boolean }> = ({ disabled = false }) => {
  const { meme } = useMemeCardContext();
  return (
    <div className="flex justify-between p-2">
      <div className="flex items-center gap-2">
        <button disabled={disabled} className="group flex items-center" onClick={onProfile}>
          <Image
            src={meme.author.image}
            alt="meme author"
            width={50}
            height={50}
            className="h-6 w-6 rounded-full object-cover"
          />

          <span className="pl-2 text-sm">{meme.author.name}</span>
        </button>
        {/* Meme post elapsed time */}
        <span className="text-xs text-neutral-400">&bull;</span>
        <span className="text-xs text-neutral-400">{dateFromNow(meme.createdAt)}</span>
      </div>
      {disabled ? (
        <>
          <div className="flex text-neutral-600 hover:text-neutral-400">
            <span className="sr-only">Open meme options</span>

            <EllipsisVerticalIcon className="h-6 w-6" />
          </div>
        </>
      ) : (
        <OptionsPopup meme={meme} />
      )}
    </div>
  );
};
