import { UserPort } from "../ports/user.port";
import { Tokens } from "./tokens.type";
import { User } from "./user";
import { UserService } from "./user.service";

export class UserApplication {
  constructor(private readonly userPort: UserPort) {}

  async save(user: User): Promise<User> {
    return this.userPort.save(user);
  }

  async getByEmail(email: string): Promise<User | null> {
    return this.userPort.getByEmail(email);
  }

  async getByRefreshToken(refreshToken: string): Promise<User | null> {
    return this.userPort.getByRefreshToken(refreshToken);
  }

  async login(email: string, password: string): Promise<Tokens | null> {
    const user = await this.userPort.getByEmail(email);

    if (user) {
      const isValidPassword = await UserService.comparePasswords(
        password,
        user.properties().password
      );

      if (isValidPassword) {
        const { firstname, lastname } = user.properties();
        return {
          accessToken: UserService.generateAccessToken(firstname, lastname),
          refreshToken: user.properties().refreshToken,
        };
      }
    }

    return null;
  }

  validateAccessToken(accessToken: string): boolean {
    return UserService.validateAccessToken(accessToken);
  }
}
