export interface Address {
  street: string;
  city: string;
  state: string;
  pincode: string;
}

export interface ActionResponse {
  success: boolean;
  message: string;
  data?: any;
}

export interface AxiosErrorResponse<T = any> {
  response?: {
    data: T;
    status: number;
    statusText: string;
  };
  request?: any;
  message: string;
}
