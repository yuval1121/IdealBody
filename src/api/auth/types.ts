export interface userDataRequest {
  email: string;
  password: string;
}

export interface userDataResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localid: string;
  registered: boolean;
}
