export interface BMIData {
  weight: number;
  height: number;
  timestamp: Date;
}
export interface UserModelData {
  BMI: number;
  currWeight: number;
  currHeight: number;
  BMIData: BMIData[];
}

export interface UserData {
  weight: number;
  height: number;
}
