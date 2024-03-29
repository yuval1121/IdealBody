import { Timestamp } from 'firebase/firestore';

export interface UserDocument {
  weight: number;
  height: number;
  water: number;
  caloriesIn: number;
  caloriesOut: number;
  BMI: number;
  timestamp: Timestamp;
}
