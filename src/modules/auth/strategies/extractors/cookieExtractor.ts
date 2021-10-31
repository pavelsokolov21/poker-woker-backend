import { Request } from 'express';

import { COOKIE_ACCESS_TOKEN } from '../../../../constants/cookies';

export const cookieExtractor = (request: Request): string | null => {
  let token = null;

  if (request && request.cookies) {
    token = request.cookies[COOKIE_ACCESS_TOKEN];
  }

  return token;
};
