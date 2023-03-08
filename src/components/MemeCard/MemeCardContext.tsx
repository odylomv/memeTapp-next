import { type RouterOutputs } from '@mtp/utils/api';
import { createContext, useContext } from 'react';

// Get type from type[]
type ArrayElement<ArrayType> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
export type MemeCardModel = ArrayElement<RouterOutputs['meme']['getPaginated']['memes']>;

const MemeCardContext = createContext<{ meme: MemeCardModel } | null>(null);

export function useMemeCardContext() {
  const ctx = useContext(MemeCardContext);
  if (!ctx) throw new Error('No MemeCardContext.Provider found when calling useMemeCardContext.');

  return ctx;
}

export default MemeCardContext;
