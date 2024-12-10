export type UserRequired = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

export type UserOptional = {
  userId: number;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserProps = UserRequired & Partial<UserOptional>;

export class User {
  private readonly userId: number;
  private firstname: string;
  private lastname: string;
  private email: string;
  private password: string;
  private refreshToken: string;
  private createdAt: Date;
  private updatedAt: Date | undefined;

  constructor(props: UserProps) {
    this.firstname = props.firstname;
    this.lastname = props.lastname;
    this.email = props.email;
    this.password = props.password;

    this.createdAt = props.createdAt ? props.createdAt : new Date();
    if (props.userId) this.userId = props.userId;
    if (props.refreshToken) {
      this.refreshToken = props.refreshToken;
    } else {
      this.refreshToken = "";
    }
    if (props.updatedAt) this.updatedAt = props.updatedAt;
  }

  update(refreshToken: string) {
    this.refreshToken = refreshToken;
    this.updatedAt = new Date();
  }

  properties() {
    return {
      userId: this.userId,
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      refreshToken: this.refreshToken,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
