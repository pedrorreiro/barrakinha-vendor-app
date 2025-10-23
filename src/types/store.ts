export interface CreateStoreRequest {
  name: string;
  ownerName: string;
  email: string;
  phone: string;
}

export interface CreateStoreResponse {
  success: boolean;
  data: null;
  message?: string;
}
