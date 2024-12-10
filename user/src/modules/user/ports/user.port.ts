import { User } from "../application/user";

export type UserPort = {
  save(user: User): Promise<User>;
  getByEmail(email: string): Promise<User | null>;
  getByRefreshToken(refreshToken: string): Promise<User | null>;
};
