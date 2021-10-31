import { Request } from 'express';

import { cookieExtractor } from './cookieExtractor';

describe('cookie extractor', () => {
  it('should return refresh token', () => {
    const req = {
      cookies: {
        'some-cookie': 'cookie value',
      },
    } as Request;

    const result = cookieExtractor(req, 'some-cookie');

    expect(result).toBe('cookie value');
  });

  it('should return null', () => {
    const req = {} as Request;

    const result = cookieExtractor(req, 'unknown cookie');

    expect(result).toBeNull();
  });
});
