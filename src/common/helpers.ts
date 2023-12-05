import {
  BadRequestException,
  HttpException,
  NotImplementedException,
} from '@nestjs/common';

export const sendError = (exception: any) => {
  console.error(exception);
  if (exception.status) throw exception;
  if (
    exception.name &&
    ['CastError', 'MongoServerError'].includes(exception.name)
  ) {
    throw new BadRequestException(exception.message);
  }
  if (exception.message.includes('not implemented')) {
    throw new NotImplementedException(exception.message);
  }
  throw new HttpException(exception, 500);
};
