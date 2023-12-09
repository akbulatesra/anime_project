import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

const isNotNullAndIsObject = (
  input: unknown
): input is Record<string, unknown> => {
  return (
    typeof input === 'object' && input !== null && Object.keys(input).length > 0
  );
};

/**
 * Type predicate to narrow an unknown error to `FetchBaseQueryError`
 */
export function isFetchBaseQueryError(
  error: unknown
): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error;
}

/**
 * Type predicate to narrow an unknown error to an object with a string 'message' property
 */
export function isErrorWithMessage(
  error: unknown
): error is { data: { message: string } } {
  return (
    isNotNullAndIsObject(error) &&
    'data' in error &&
    isNotNullAndIsObject(error.data) &&
    typeof error.data.message === 'string'
  );
}

export const defaultValidateStatus = (response: Response) =>
  response.status >= 200 && response.status <= 299;
