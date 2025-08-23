import { ZodError, ZodIssue } from 'zod';
import { IGenericErrorMessage } from '../interfaces/error';
import { IGenericErrorResponse } from '../interfaces/common';

const handleZodError = (err: ZodError): IGenericErrorResponse => {
  const errorZod: IGenericErrorMessage[] = err.issues.map((issue: ZodIssue) => {
    const path = issue?.path[1];
    return {
      path:
        typeof path === 'string' || typeof path === 'number'
          ? path
          : String(path),
      message: issue?.message,
    };
  });

  const message = errorZod.map((v) => v.message).join(', ');

  return {
    statusCode: 400,
    message: 'Zod Error - ' + message,
    errorMessage: errorZod, //
  };
};

export default handleZodError;
