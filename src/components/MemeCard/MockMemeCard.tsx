import { type ReactNode } from 'react';
import MemeCard from './MemeCard';
import { type MemeCardModel } from './MemeCardContext';

export const MockMemeCard: React.FC<{ meme: Partial<MemeCardModel>; content: ReactNode }> = ({ meme, content }) => {
  const fakeMeme: MemeCardModel = {
    id: '',
    authorId: '',
    hidden: false,
    createdAt: new Date(),
    isLiked: false,
    imageURL: '',
    _count: {
      comments: 0,
      likes: 0,
    },
    author: {
      id: '',
      name: 'You',
      image: 'https://www.gravatar.com/avatar?d=mp',
    },
    // Override default values with props
    ...meme,
  };

  return <MemeCard meme={fakeMeme} content={content}></MemeCard>;
};
