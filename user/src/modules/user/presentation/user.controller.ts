import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { User, UserProps } from '../application/user';
import { UserApplication } from '../application/user.application';
import { UserService } from '../application/user.service';

export class UserController {
  constructor(private readonly application: UserApplication) {}

  async create(request: Request, response: Response) {
    try {
      const { firstname, lastname, email, password } = request.body;
      const props: UserProps = { firstname, lastname, email, password };
      props.refreshToken = uuidv4();
      props.password = await UserService.hashPassword(props.password);
      const user = new User(props);

      await this.application.save(user);
      response.status(201).json(user);
    } catch (error: any) {
      response.status(400).json({ error: error.message });
    }
  }

  async getByEmail(request: Request, response: Response) {
    try {
      const { email } = request.query;
      const user = await this.application.getByEmail(email as string);

      if (user) {
        response.status(200).json(user.properties());
      } else {
        response.status(404).json({ error: "User not found" });
      }
    } catch (error: any) {
      response.status(400).json({ error: error.message });
    }
  }

  async getByRefreshToken(request: Request, response: Response) {
    try {
      const { refreshToken } = request.query;
      const user = await this.application.getByRefreshToken(
        refreshToken as string
      );

      if (user) {
        response.status(200).json(user.properties());
      } else {
        response.status(404).json({ error: "User not found" });
      }
    } catch (error: any) {
      response.status(400).json({ error: error.message });
    }
  }

  async login(request: Request, response: Response) {
    const { email, password } = request.body;

    console.log("login", email, password);

    const tokens = await this.application.login(email, password);

    if (tokens) {
      response.status(200).json(tokens);
    } else {
      response.status(401).json({ error: "Invalid credentials" });
    }
  }

  validateAccessToken(request: Request, response: Response) {
    const { accessToken } = request.body;
    const isValid = this.application.validateAccessToken(accessToken);

    if (isValid) {
      response.status(200).json({ isValid });
    } else {
      response.status(401).json({ error: "Invalid access token" });
    }
  }
}
