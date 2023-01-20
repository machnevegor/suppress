export type Nested<T> = () => T | Promise<T>;

export interface Newable<T> {
  // deno-lint-ignore no-explicit-any
  new (...args: any[]): T;
}

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
  exception: Error;
}

export type Result<T> = SuccessResult<T> | FailureResult;

export async function suppress<T>(
  nested: Nested<T>,
  exception: Newable<Error>,
  ...exceptions: Newable<Error>[]
): Promise<Result<T>> {
  try {
    return { type: ResultType.SUCCESS, data: await nested() };
  } catch (error) {
    if (
      error instanceof exception ||
      exceptions.some((exception) => error instanceof exception)
    ) {
      return { type: ResultType.FAILURE, exception: error };
    }
    throw error;
  }
}
