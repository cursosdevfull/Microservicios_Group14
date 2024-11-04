class Database {
  get manager() {
    const connection = this.getConnection();
    return this.getManager(connection);
  }

  getConnection() {
    return {
      host: "localhost",
      port: 3306,
      user: "user123",
      password: "12345",
    };
  }

  getManager(connection: {
    host: string;
    port: number;
    user: string;
    password: string;
  }) {
    return {
      create(
        firstname: string,
        lastname: string,
        age: number,
        gender: string,
        email: string,
        password: string
      ) {
        console.log("user created");
      },
      update(userId: number, firstname: string, lastname: string) {
        console.log("user updated");
      },
      remove(userId: number) {
        console.log("user deleted");
      },
    };
  }
}

class EmailApp {
  getManagerEmail() {
    return {
      sent(email: string, body: string) {
        console.log("email: " + email, body);
      },
    };
  }
}

class User {
  userId: number;
  firstname: string;
  lastname: string;
  age: number;
  gender: string;
  email: string;
  password: string;
  manager: {
    create(
      firstname: string,
      lastname: string,
      age: number,
      gender: string,
      email: string,
      password: string
    ): void;
    update(userId: number, firstname: string, lastname: string): void;
    remove(userId: number): void;
  };
  managerEmail: {
    sent(email: string, body: string): void;
  };

  constructor(
    firstname: string,
    lastname: string,
    age: number,
    gender: string,
    email: string,
    password: string,
    userId?: number
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.age = age;
    this.gender = gender;
    this.email = email;
    this.password = password;

    this.userId = userId ? userId : new Date().getTime();

    const database = new Database();
    this.manager = database.manager;

    const emailApp = new EmailApp();
    this.managerEmail = emailApp.getManagerEmail();
  }

  create() {
    this.manager.create(
      this.firstname,
      this.lastname,
      this.age,
      this.gender,
      this.email,
      this.password
    );
    this.managerEmail.sent(this.email, "user created");
  }

  update(firstname: string, lastname: string) {
    this.manager.update(this.userId, firstname, lastname);
    this.firstname = firstname;
    this.lastname = lastname;
    this.managerEmail.sent(this.email, "user updated");
  }

  remove() {
    this.manager.remove(this.userId);
    this.managerEmail.sent(this.email, "user deleted");
  }
}

const user = new User(
  "Marco",
  "Padilla",
  23,
  "male",
  "marco.padilla@email.com",
  "12345"
);
user.create();
user.update("Luis", "Padilla");
user.remove();
