import { IRefreshToken } from '../../refreshTokens/interfaces/refresh-token.interface';

export interface IUser {
  email: string;
  password: string;
  refreshTokenId: number | null;
  refreshToken: IRefreshToken | null;
}
