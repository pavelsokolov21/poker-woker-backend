import { Request } from 'express';

import { COOKIE_ACCESS_TOKEN } from '../../../../constants/cookies';
import { cookieExtractor } from './cookieExtractor';

describe('cookie extractor', () => {
  it('should return refresh token', () => {
    const req = {
      cookies: {
        [COOKIE_ACCESS_TOKEN]: 'some-access-token',
      },
    } as Request;

    const result = cookieExtractor(req);

    expect(result).toBe('some-access-token');
  });

  it('should return null', () => {
    const req = {} as Request;

    const result = cookieExtractor(req);

    expect(result).toBeNull();
  });
});
