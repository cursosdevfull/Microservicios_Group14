import { DatabaseBootstrap } from "../../../bootstrap/database.bootstrap";
import { User } from "../application/user";
import { UserPort } from "../ports/user.port";
import { UserEntity } from "./entities/user.entity";

export class UserAdapter implements UserPort {
  async save(user: User): Promise<User> {
    const repository = DatabaseBootstrap.dataSource.getRepository(UserEntity);
    const userEntity = new UserEntity();
    userEntity.firstname = user.properties().firstname;
    userEntity.lastname = user.properties().lastname;
    userEntity.email = user.properties().email;
    userEntity.password = user.properties().password;
    userEntity.refreshToken = user.properties().refreshToken;
    userEntity.createdAt = user.properties().createdAt;
    userEntity.updatedAt = user.properties().updatedAt;

    await repository.save(userEntity);

    return user;
  }

  async getByEmail(email: string): Promise<User | null> {
    const repository = DatabaseBootstrap.dataSource.getRepository(UserEntity);
    const userEntity = await repository.findOne({ where: { email } });

    if (userEntity) {
      return new User({
        userId: userEntity.userId,
        firstname: userEntity.firstname,
        lastname: userEntity.lastname,
        email: userEntity.email,
        password: userEntity.password,
        refreshToken: userEntity.refreshToken,
        createdAt: userEntity.createdAt,
        updatedAt: userEntity.updatedAt,
      });
    }

    return null;
  }
  async getByRefreshToken(refreshToken: string): Promise<User | null> {
    const repository = DatabaseBootstrap.dataSource.getRepository(UserEntity);
    const userEntity = await repository.findOne({ where: { refreshToken } });

    if (userEntity) {
      return new User({
        userId: userEntity.userId,
        firstname: userEntity.firstname,
        lastname: userEntity.lastname,
        email: userEntity.email,
        password: userEntity.password,
        refreshToken: userEntity.refreshToken,
        createdAt: userEntity.createdAt,
        updatedAt: userEntity.updatedAt,
      });
    }

    return null;
  }
}
