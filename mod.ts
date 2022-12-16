export enum ResultType {
  OK = "ok",
  ERROR = "error",
}

export interface OkResult<T> {
  type: ResultType.OK;
  data: T;
}

export interface ErrorResult {
  type: ResultType.ERROR;
  message: string;
}

export type Result<T> = OkResult<T> | ErrorResult;

export async function suppress<T>(fn: () => T | Promise<T>) {
  try {
    return <Result<T>> {
      type: ResultType.OK,
      data: await fn(),
    };
  } catch (error) {
    return <Result<T>> {
      type: ResultType.ERROR,
      message: error.message,
    };
  }
}
