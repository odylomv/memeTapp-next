import Image from 'next/image';
import Link from 'next/link';
import { useMemeCardContext } from '../MemeCardContext';

export const MemeCardImage: React.FC<{ priority?: boolean; disabled?: boolean }> = ({
  priority = false,
  disabled = false,
}) => {
  const { meme } = useMemeCardContext();

  const img = (
    <Image
      priority={priority}
      src={meme.imageURL}
      sizes="(max-width: 768px) 100vw, 500px"
      alt="meme"
      width={0}
      height={0}
      className="max-h-[600px] w-[500px] object-cover"
    />
  );

  return (
    <>
      {disabled ? (
        img
      ) : (
        <Link href={`/memes/${meme.id}`} className="flex justify-center">
          {img}
        </Link>
      )}
    </>
  );
};
