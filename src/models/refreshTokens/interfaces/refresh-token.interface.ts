export interface IRefreshToken {
  isRevoked: boolean;
  expires: Date;
  userId: number;
}
