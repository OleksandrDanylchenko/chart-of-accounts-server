import { IUser } from '../../users/interfaces/user.interface';

export interface IRefreshToken {
  isRevoked: boolean;
  expires: Date;
  user: IUser | null;
}
