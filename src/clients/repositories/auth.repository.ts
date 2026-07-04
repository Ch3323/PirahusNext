import { ApiResponse } from "@/src/core/interface/response";
import {
  CurrentUser,
  Login,
  LoginResponse,
  SetupProfileResponse,
} from "@/src/core/domain/auth";
import httpClient from "@/src/lib/http";

export class AuthClientRepository {
  async login(loginData: Login): Promise<ApiResponse<LoginResponse>> {
    return httpClient.post<LoginResponse>("/api/auth/login", loginData);
  }

  async me(): Promise<ApiResponse<CurrentUser>> {
    return httpClient.get<CurrentUser>(`/api/auth/me?_t=${Date.now()}`);
  }

  async setupProfile(
    password: string,
    nickname: string
  ): Promise<ApiResponse<SetupProfileResponse>> {
    return httpClient.post<SetupProfileResponse>("/api/auth/setupprofile", {
      password,
      nickname,
    });
  }

  async logout(): Promise<ApiResponse<null>> {
    return httpClient.post<null>("/api/auth/logout");
  }
}
