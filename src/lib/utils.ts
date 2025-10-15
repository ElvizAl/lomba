import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { toZonedTime } from 'date-fns-tz';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getSalam(): string {
  const timeZone = 'Asia/Jakarta';

  const now = new Date();
  const zonedTime = toZonedTime(now, timeZone);
  const hours = zonedTime.getHours()

  if (hours >= 6 && hours < 12) {
    return 'Pagi';
  } else if (hours >= 12 && hours < 18) {
    return 'Siang';
  } else {
    return 'Malam';
  }
}