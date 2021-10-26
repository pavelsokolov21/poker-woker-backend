import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  InternalServerErrorException,
} from '@nestjs/common';
import { Response } from 'express';

import { ExceptionResponse } from '../interfaces/exception-response.interface';

@Catch(InternalServerErrorException)
export class InternalServerExceptionFilter implements ExceptionFilter {
  catch(exception: InternalServerErrorException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as ExceptionResponse;

    response.status(status).json({
      statusCode: status,
      error: exceptionResponse.message,
    });
  }
}
