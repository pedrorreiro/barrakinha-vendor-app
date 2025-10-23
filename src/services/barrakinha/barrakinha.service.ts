import axios, { AxiosInstance, AxiosResponse } from "axios";
import { CreateStoreRequest, CreateStoreResponse } from "@/types/store";
import { LoginResponse } from "./barrakinha.service.type";
import { Alert } from "react-native";

export enum OtpType {
  STORE_VALIDATION = "STORE_VALIDATION",
  STORE_AUTHENTICATION = "STORE_AUTHENTICATION",
}

class BarrakinhaService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:3000",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Interceptor para logs de requisições (opcional)
    this.api.interceptors.request.use(
      (config) => {
        console.log(
          `[BarrakinhaService] ${config.method?.toUpperCase()} ${config.url}`
        );
        return config;
      },
      (error) => {
        console.error("[BarrakinhaService] Request error:", error);
        return Promise.reject(error);
      }
    );

    // Interceptor para logs de respostas (opcional)
    this.api.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        const errorMessage = error.response?.data.message || error.message;

        if (errorMessage) Alert.alert(errorMessage);
        else {
          console.error(
            "[BarrakinhaService] Response error:",
            error.response?.data || error.message
          );
        }

        return Promise.reject(error);
      }
    );
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

  async sendOtpCode(phone: string, type: OtpType): Promise<void> {
    try {
      await this.api.post("/send-otp", { phone, type });
    } catch (error) {
      throw error;
    }
  }

  async login(code: string, phone: string): Promise<LoginResponse> {
    try {
      const response: AxiosResponse<LoginResponse> = await this.api.post(
        `/store/login`,
        { otpCode: code, phone }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async validateStore(code: string, phone: string): Promise<void> {
    try {
      await this.api.post("/store/validate", { otpCode: code, phone });
    } catch (error) {
      throw error;
    }
  }
}

export const barrakinhaService = new BarrakinhaService();
export default barrakinhaService;
