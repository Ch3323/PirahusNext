import { ApiResponse } from "@/src/core/interface/response";
import { Login, LoginResponse, CurrentUser, SetupProfileResponse } from "@/src/core/domain/auth";

export interface IAuthClientRepository {
  login(loginData: Login): Promise<ApiResponse<LoginResponse>>;
  me(): Promise<ApiResponse<CurrentUser>>;
  setupProfile(password: string, nickname: string): Promise<ApiResponse<SetupProfileResponse>>;
  logout(): Promise<ApiResponse<null>>;
}
