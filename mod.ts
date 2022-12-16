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

export async function suppress<T>(
  callback: () => T | Promise<T>,
): Promise<Result<T>> {
  try {
    return {
      type: ResultType.OK,
      data: await callback(),
    };
  } catch (error) {
    return {
      type: ResultType.ERROR,
      message: error.message,
    };
  }
}
