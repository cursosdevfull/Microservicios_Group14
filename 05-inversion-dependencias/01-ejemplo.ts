class Config {
  static readonly sender = "replay@email.com";
}

class GMail implements IProvider {
  sent(
    firstname: string,
    lastname: string,
    email: string,
    html: boolean,
    sender: string,
    subject: string,
    body: string
  ): void {
    this.sentEmail(firstname, lastname, email, sender, subject, body);
  }

  sentEmail(
    firstname: string,
    lastname: string,
    email: string,
    sender: string,
    subject: string,
    body: string
  ) {
    console.log("email send by gmail");
  }
}

class Office365 implements IProvider {
  private config:
    | { sender: string; subject: string; body: string; isHTML: boolean }
    | undefined;

  sent(
    firstname: string,
    lastname: string,
    email: string,
    html: boolean,
    sender: string,
    subject: string,
    body: string
  ): void {
    this.settings(sender, subject, body, html);
    this.sentMessage(firstname, lastname, email);
  }

  settings(sender: string, subject: string, body: string, isHTML: boolean) {
    this.config = { sender, subject, body, isHTML };
  }

  sentMessage(firstname: string, lastname: string, email: string) {
    if (this.config) console.log("email send by office365");
  }
}

class GoDaddy implements IProvider {
  sent(
    firstname: string,
    lastname: string,
    email: string,
    html: boolean,
    sender: string,
    subject: string,
    body: string
  ): void {
    this.sentNotification(
      { firstname, lastname, email },
      { subject, body, sender, html }
    );
  }

  sentNotification(
    user: { firstname: string; lastname: string; email: string },
    options: { subject: string; body: string; sender: string; html: boolean }
  ) {
    console.log("email send by godaddy");
  }
}

type IProvider = {
  sent(
    firstname: string,
    lastname: string,
    email: string,
    html: boolean,
    sender: string,
    subject: string,
    body: string
  ): void;
};

class User {
  //private providerEmail = new GMail()
  //private providerEmail = new Office365()
  //private providerEmail = new GoDaddy()
  //private providerEmail: IProvider = new GoDaddy()

  constructor(
    private providerEmail: IProvider,
    private firstname: string,
    private lastname: string,
    private email: string,
    private age: number
  ) {}

  register() {
    this.providerEmail.sent(
      this.firstname,
      this.lastname,
      this.email,
      true,
      Config.sender,
      "Welcome",
      "Welcome to community"
    );

    //this.providerEmail.sentEmail(this.firstname, this.lastname, this.email, Config.sender, "Welcome", "Welcome to community")
    //this.providerEmail.settings(Config.sender, "Welcome", "Welcome to community", true)
    //this.providerEmail.sentMessage(this.firstname, this.lastname, this.email)
    /*this.providerEmail.sentNotification(
            {firstname: this.firstname, lastname: this.lastname, email: this.email}, 
            {subject: "Welcome", body: "Welcome to community", sender: Config.sender, html:false}
        )*/
  }
}

const user = new User(
  new Office365(),
  "Carlos",
  "Salas",
  "carlos.salas@email.com",
  30
);
user.register();
