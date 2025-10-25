import axios, { AxiosInstance, AxiosResponse } from "axios";
import { CreateStoreRequest, CreateStoreResponse } from "@/types/store";
import {
  GetStoreMeResponse,
  LoginResponse,
  RefreshTokenResponse,
} from "./barrakinha.service.type";
import { Toast } from "toastify-react-native";
import { Either, right, wrong } from "@/utils/either";
import { storage, StorageKeys } from "@/utils/storage";

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
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = await storage.get<string>(
              StorageKeys.REFRESH_TOKEN
            );

            if (refreshToken) {
              console.log(
                "[BarrakinhaService] Token expirado, tentando refresh..."
              );

              const refreshResult = await this.refreshToken(refreshToken);

              if (refreshResult.isRight()) {
                const { accessToken, refreshToken: newRefreshToken } =
                  refreshResult.value;

                // Salvar novos tokens
                await storage.set(StorageKeys.ACCESS_TOKEN, accessToken);
                await storage.set(StorageKeys.REFRESH_TOKEN, newRefreshToken);

                // Atualizar header da requisição original
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;

                console.log(
                  "[BarrakinhaService] Token renovado, refazendo requisição..."
                );

                // Refazer a requisição original
                return this.api(originalRequest);
              }
            }
          } catch (refreshError) {
            console.log(
              "[BarrakinhaService] Erro ao renovar token:",
              refreshError
            );
            // Se falhar o refresh, limpar tokens e redirecionar para login
            await storage.delete(StorageKeys.ACCESS_TOKEN);
            await storage.delete(StorageKeys.REFRESH_TOKEN);
          }
        }

        const errorMessage = error.response?.data.message || error.message;

        if (errorMessage)
          Toast.show({
            text1: "Oops! 😅 ",
            text2: errorMessage,
            type: "error",
          });
        else {
          console.log(
            "[BarrakinhaService] Response error:",
            error.response?.data || error.message
          );
        }

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
  ): Promise<CreateStoreResponse> {
    try {
      const response: AxiosResponse<CreateStoreResponse> = await this.api.post(
        "/store",
        storeData
      );
      return response.data;
    } catch (error) {
      throw error;
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
      const response: AxiosResponse<RefreshTokenResponse> = await this.api.post(
        `/auth/refresh-token`,
        { refreshToken }
      );
      return right(response.data);
    } catch (error) {
      return wrong(error);
    }
  }

  async validateStore(
    code: string,
    phone: string
  ): Promise<Either<void, Error>> {
    try {
      await this.api.post("/store/validate", { otpCode: code, phone });
      return right(undefined);
    } catch (error) {
      return wrong(error);
    }
  }
}

export const barrakinhaService = new BarrakinhaService();
export default barrakinhaService;
