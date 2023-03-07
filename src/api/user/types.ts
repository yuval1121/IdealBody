export interface BMIData {
  timestamp: Date;
  weight: number;
}
export interface UserModelData {
  currWeight: number;
  currHeight: number;
  BMIData: BMIData[];
}

export interface UserData {
  weight: number;
  height: number;
}
