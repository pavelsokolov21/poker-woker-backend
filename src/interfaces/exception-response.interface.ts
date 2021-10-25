import { ValidationError } from './validation-error.interface';

export interface ExceptionResponse {
  statusCode: number;
  message: ValidationError[] | string[];
  error: string;
}
