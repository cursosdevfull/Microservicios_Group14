import { RequestCircuitBreaker } from './circuit-breaker';

const request = (name: string, lastname: string, email: string) => {
  return new Promise((resolve, reject) => {
    const random = Math.random();
    if (random < 0.5) {
      reject("request failed");
    } else {
      resolve("request success");
    }
  });
};

const requestCircuitBreaker = new RequestCircuitBreaker(request, {
  minFailureThreshold: 3,
  openTimeout: 5000,
  closeTimeout: 3000,
});

setInterval(() => {
  requestCircuitBreaker
    .fire("John", "Doe", "john.doe@email.com")
    .catch((error) => console.log(error.message));
}, 1000);
