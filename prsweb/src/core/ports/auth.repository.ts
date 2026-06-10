import { ApiResponse } from "@/src/infra/interface/response";
import { Login, LoginResponse } from "../domain/auth";

export interface IAuthRepository {
  login(loginData: Login): Promise<ApiResponse<LoginResponse>>;
}
