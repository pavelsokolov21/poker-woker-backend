import { Request } from 'express';

export const cookieExtractor = (
  request: Request,
  cookieName: string,
): string | null => {
  let token = null;

  if (request && request.cookies) {
    token = request.cookies[cookieName];
  }

  return token;
};
