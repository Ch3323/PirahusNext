import { AuthClientRepository } from "../repositories/auth.repository";
import { parseSchema } from "@/src/lib/validation";
import { loginSchema } from "@/src/core/schema/auth";
import { Login, LoginResponse, CurrentUser, SetupProfileResponse } from "@/src/core/domain/auth";

export class AuthService {
  constructor(private readonly authRepository: AuthClientRepository) {}

  async login(loginData: Login): Promise<LoginResponse> {
    try {
      const parsedData = parseSchema(loginSchema, loginData);
      const response = await this.authRepository.login(parsedData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async me(): Promise<CurrentUser> {
    try {
      const response = await this.authRepository.me();
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async setupProfile(password: string, nickname: string): Promise<SetupProfileResponse> {
    try {
      const response = await this.authRepository.setupProfile(password, nickname);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await this.authRepository.logout();
    } catch (error) {
      throw error;
    }
  }
}
