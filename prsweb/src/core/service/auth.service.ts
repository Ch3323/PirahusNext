import { IAuthRepository } from "../ports/auth.repository";
import { parseSchema } from "@/src/lib/validation";
import { loginSchema } from "../schema/auth";
import { Login, LoginResponse } from "../domain/auth";

export class AuthService {
  constructor(private readonly authRepository: IAuthRepository) {}

  async login(loginData: Login): Promise<LoginResponse> {
    try {
      const parsedData = parseSchema(loginSchema, loginData);
      const response = await this.authRepository.login(parsedData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
