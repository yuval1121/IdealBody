export interface UserData {
  weight: number;
  height: number;
  water: number;
  caloriesIn: number;
  caloriesOut: number;
  BMI: number;
  timestamp?: Date;
}

export interface UserModelData {
  current: UserData;
  DataHistory: Record<string, UserData>;
}
