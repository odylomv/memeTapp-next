import { clsx, type ClassValue } from 'clsx';
import moment from 'moment';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dateFromNow(date: Date, withoutSuffix = true) {
  return moment(date).fromNow(withoutSuffix);
}
