export type LoginResponse = {
  refreshToken: string;
};

export type RefreshTokenResponse = {
  accessToken: string;
  refreshToken: string;
};

export type ValidateStoreResponse = {
  refreshToken: string;
};

export type GetStoreMeResponse = {
  id: string;
  name: string;
  ownerName: string;
};
