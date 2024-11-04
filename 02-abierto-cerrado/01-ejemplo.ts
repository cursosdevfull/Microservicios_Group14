class Notifications {
  sent() {
    console.log("sms send");
  }
}

class NotificationsEmail extends Notifications {
  sentEmail(email: string) {
    console.log("email send");
  }
}

class NotificationsWhatsapp extends NotificationsEmail {
  sentWhatsapp() {
    console.log("whatsapp send");
  }
}

class App01 {
  constructor() {
    const notifications = new NotificationsWhatsapp();
    notifications.sent();
  }
}

const app01 = new App01();
