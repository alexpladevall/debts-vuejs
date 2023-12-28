export interface IUser {
  _id: string;
  username: string;
  firstName: string;
  lastName?: string;
  active: boolean;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface ISignUpUserDto {
  username: string;
  firstName: string;
  lastName?: string;
  password: string;
}
