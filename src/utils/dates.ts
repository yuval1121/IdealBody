import { Timestamp } from 'firebase/firestore';

export function getTodaysTimestamp(): Timestamp;
export function getTodaysTimestamp(firestore: false): Date;
export function getTodaysTimestamp(firestore: true): Timestamp;
export function getTodaysTimestamp(firestore = true) {
  const timestamp = new Date();
  timestamp.setHours(0, 0, 0, 0);

  if (firestore) {
    return Timestamp.fromDate(timestamp);
  }

  return timestamp;
}
