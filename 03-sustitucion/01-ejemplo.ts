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

class NotificationsBot extends NotificationsWhatsapp {
  sentBot() {
    console.log("bot send");
  }
}

const notifications = new NotificationsBot();
notifications.sent();
