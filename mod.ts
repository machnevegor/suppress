export type Handler<T> = () => T | Promise<T>;

export enum ResultType {
  SUCCESS = "success",
  FAILURE = "failure",
}

export interface SuccessResult<T> {
  type: ResultType.SUCCESS;
  data: T;
}

export interface FailureResult {
  type: ResultType.FAILURE;
  message: string;
}

export type Result<T> = SuccessResult<T> | FailureResult;

export async function suppress<T>(handler: Handler<T>): Promise<Result<T>> {
  try {
    return { type: ResultType.SUCCESS, data: await handler() };
  } catch (error) {
    return { type: ResultType.FAILURE, message: error.message };
  }
}
