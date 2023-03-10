export interface DataHistory {
  weight: number;
  height: number;
  water: number;
  caloriesIn: number;
  caloriesOut: number;
  BMI: number;
  timestamp: Date;
}
export interface UserModelData {
  currBMI: number;
  currWeight: number;
  currHeight: number;
  currWater: number;
  currCaloriesIn: number;
  currCaloriesOut: number;
  DataHistory: DataHistory[];
}

export interface UserData {
  weight: number;
  height: number;
  water: number;
  caloriesIn: number;
  caloriesOut: number;
}
