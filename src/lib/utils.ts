import { clsx, type ClassValue } from 'clsx';
import formatDistance from 'date-fns/formatDistance';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dateFromNow(date: Date, suffix = true) {
  return formatDistance(date, new Date(), { addSuffix: suffix });
}
