import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

import envs from "../../../config/environment-vars";

export class UserService {
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  static async comparePasswords(
    password: string,
    hashPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hashPassword);
  }

  static generateAccessToken(firstname: string, lastname: string): string {
    return jwt.sign({ firstname, lastname }, envs.jwtSecret, {
      expiresIn: envs.jwtExpiresIn,
    });
  }

  static generateRefreshToken(): string {
    return uuidv4();
  }

  static validateAccessToken(accessToken: string): boolean {
    try {
      jwt.verify(accessToken, envs.jwtSecret);
      return true;
    } catch {
      return false;
    }
  }
}
