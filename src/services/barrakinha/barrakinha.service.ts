import axios, { AxiosInstance, AxiosResponse } from "axios";
import { CreateStoreRequest, CreateStoreResponse } from "@/types/store";
import {
  GetStoreMeResponse,
  LoginResponse,
  RefreshTokenResponse,
  ValidateStoreResponse,
} from "./barrakinha.service.type";
import { Either, right, wrong } from "@/utils/either";
import { storage, StorageKeys } from "@/utils/storage";
import {
  CustomAxiosRequestConfig,
  shouldRefreshToken,
  handleTokenRefresh,
  handleErrorDisplay,
} from "./utils";

export enum OtpType {
  STORE_VALIDATION = "STORE_VALIDATION",
  STORE_AUTHENTICATION = "STORE_AUTHENTICATION",
}

class BarrakinhaService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL:
        "https://resistant-conservative-especially-vary.trycloudflare.com",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Interceptor para logs de requisições (opcional)
    this.api.interceptors.request.use(
      async (config) => {
        const accessToken = await storage.get<string>(StorageKeys.ACCESS_TOKEN);
        if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

        console.log(
          `[BarrakinhaService] ${config.method?.toUpperCase()} ${config.url}`
        );
        return config;
      },
      (error) => {
        console.log("[BarrakinhaService] Request error:", error);
        return Promise.reject(error);
      }
    );

    // Interceptor para logs de respostas e tratamento de token expirado
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // Verifica se precisa renovar o token
        if (shouldRefreshToken(error, originalRequest)) {
          const refreshResult = await handleTokenRefresh(
            originalRequest,
            this.refreshToken.bind(this),
            this.api
          );
          if (refreshResult) {
            return refreshResult;
          }
        }

        // Exibe erro para o usuário
        handleErrorDisplay(error);

        return Promise.reject(error);
      }
    );
  }

  async getStoreMe(): Promise<Either<Error, GetStoreMeResponse>> {
    try {
      const response: AxiosResponse<GetStoreMeResponse> = await this.api.get(
        "/store/me"
      );
      return right(response.data);
    } catch (error) {
      return wrong(error);
    }
  }

  async createStore(
    storeData: CreateStoreRequest
  ): Promise<Either<Error, CreateStoreResponse>> {
    try {
      const response: AxiosResponse<CreateStoreResponse> = await this.api.post(
        "/store",
        storeData
      );
      return right(response.data);
    } catch (error) {
      const errorName = error?.response?.data?.name;
      if (errorName === "StoreNotActiveAlreadyExists") {
        return wrong(new Error("ShouldValidateStore"));
      }

      return wrong(error);
    }
  }

  async sendOtpCode(
    phone: string,
    type: OtpType
  ): Promise<Either<void, Error>> {
    try {
      await this.api.post("/send-otp", { phone, type });
      return right(undefined);
    } catch (error) {
      return wrong(error);
    }
  }

  async login(
    code: string,
    phone: string
  ): Promise<Either<Error, LoginResponse>> {
    try {
      const response: AxiosResponse<LoginResponse> = await this.api.post(
        `/store/login`,
        { otpCode: code, phone }
      );
      return right(response.data);
    } catch (error) {
      return wrong(error);
    }
  }

  async refreshToken(
    refreshToken: string
  ): Promise<Either<Error, RefreshTokenResponse>> {
    try {
      const config: CustomAxiosRequestConfig = {
        _isRefreshRequest: true, // Flag para identificar que é uma requisição de refresh
      };

      const response: AxiosResponse<RefreshTokenResponse> = await this.api.post(
        `/auth/refresh-token`,
        { refreshToken },
        config
      );
      return right(response.data);
    } catch (error) {
      return wrong(error);
    }
  }

  async validateStore(
    code: string,
    phone: string
  ): Promise<Either<ValidateStoreResponse, Error>> {
    try {
      const response = await this.api.post("/store/validate", {
        otpCode: code,
        phone,
      });
      return right(response.data);
    } catch (error) {
      return wrong(error);
    }
  }
}

export const barrakinhaService = new BarrakinhaService();
export default barrakinhaService;
