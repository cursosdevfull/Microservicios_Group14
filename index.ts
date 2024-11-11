function Logger(target: new (...args: any[]) => any) {
  const instance = new target();
  console.log(`Logging to create: ${instance.name}`);
  console.log(target);
}

function UpperCase(target: any, propertyKey: string) {
  let value: string;

  Object.defineProperty(target, propertyKey, {
    get() {
      return value;
    },
    set(newValue: string) {
      value = newValue.toUpperCase();
    },
  });
}

@Logger
class User {
  @UpperCase
  name = "pedro";

  constructor() {
    console.log("User created");
  }
}

const user = new User();
