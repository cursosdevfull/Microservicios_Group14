export type TRequest = (...args: any[]) => Promise<any>;
export type TState = "CLOSED" | "OPEN" | "HALF_OPEN";
export type TOptions = {
  minFailureThreshold: number;
  openTimeout: number;
  closeTimeout: number;
};

export class RequestCircuitBreaker {
  private state: TState = "OPEN";

  private failureCount = 0;
  private successCount = 0;
  private finishTimeHalfState = 0;
  private triggerFromClose = 0;

  constructor(
    private readonly request: TRequest,
    private readonly options: TOptions
  ) {}

  async fire(...args: any[]) {
    if (this.state === "CLOSED" && Date.now() < this.triggerFromClose) {
      throw new Error("Circuit is closed");
    }

    try {
      const response = await this.request(args);
      this.success(response);
      console.log("Success", response);
    } catch (error) {
      this.failure();
      console.log("Failure", error);
    }
  }

  success(response: any) {
    if (this.state === "HALF_OPEN") {
      this.successCount++;

      if (Date.now() >= this.finishTimeHalfState) {
        this.state = "OPEN";
        this.reset();
      }
    }

    if (this.state === "CLOSED") {
      this.state = "OPEN";
      this.reset();
    }

    return response;
  }

  failure() {
    if (this.state === "CLOSED") {
      this.triggerFromClose = Date.now() + this.options.closeTimeout;
      return;
    }

    if (this.state === "OPEN") {
      this.state = "HALF_OPEN";
      this.failureCount = 1;
      this.finishTimeHalfState = Date.now() + this.options.openTimeout;
      return;
    }

    if (this.state === "HALF_OPEN") {
      this.failureCount++;

      if (Date.now() > this.finishTimeHalfState) {
        this.reset();
        this.failureCount = 1;
        this.finishTimeHalfState = Date.now() + this.options.openTimeout;
        return;
      }

      if (this.failureCount >= this.options.minFailureThreshold) {
        this.state = "CLOSED";
        this.reset();
        this.triggerFromClose = Date.now() + this.options.closeTimeout;
        return;
      }
    }
  }

  reset() {
    this.failureCount = 0;
    this.successCount = 0;
    this.finishTimeHalfState = 0;
  }
}
