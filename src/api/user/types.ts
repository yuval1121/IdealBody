type BMIData = [Date, number];

export interface getUserData {
  createTime: Date;
  updateTime: Date;
  fields: {
    currWeight: {
      doubleValue: number;
    };
    currHeight: {
      doubleValue: number;
    };
    BMIData: {
      arrayValue: BMIData[];
    };
  };
  name: string;
}

export interface createUserData {
  weight: number;
  height: number;
  email: string | null;
  token: string | null;
}

export interface updateUserData {
  currWeight: number;
  currHeight: number;
  BMIData: BMIData[];
}
