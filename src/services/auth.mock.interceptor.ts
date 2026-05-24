import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';

const mocks: Record<string, unknown> = {
  'POST /auth/login-user': {
    type: ['DM', 'PLAYER'],
    token: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtZXNhLTAwMSIsInN0YXR1cyI6InBlbmRpbmcifQ.mock_loginuser',
  },
  'POST /auth/login:player': {
    type: ['PLAYER'],
    token:
      'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwbGF5ZXJAbW9jay5jb20iLCJzdGF0dXMiOiJwZW5kaW5nIn0.mock_player',
  },
  'POST /auth/login:dm': {
    type: ['DM', 'PLAYER'],
    token:
      'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkbUBtb2NrLmNvbSIsInN0YXR1cyI6InBlbmRpbmcifQ.mock_dm_player',
  },
  'POST /auth/logout': null,
  'POST /auth/type-login:PLAYER:player': {
    token:
      'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwbGF5ZXJAbW9jay5jb20iLCJ0eXBlIjoiUExBWUVSIn0.mock_typed_player',
  },
  'POST /auth/type-login:PLAYER:dm': {
    token:
      'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkbUBtb2NrLmNvbSIsInR5cGUiOiJQTEFZRVIifQ.mock_typed_as_player',
  },
  'POST /auth/type-login:DM:dm': {
    token: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkbUBtb2NrLmNvbSIsInR5cGUiOiJETSJ9.mock_typed_as_dm',
  },
};

export const authMockInterceptor: HttpInterceptorFn = (req, next) => {
  const path = req.url.replace('https://api.masters-table.placeholder/v1', '');
  const key = `${req.method} ${path}`;
  let mockKey = key;

  if (path === '/auth/login') {
    const body = req.body as { email: string };
    mockKey = body.email.startsWith('dm') ? `${key}:dm` : `${key}:player`;
  }

  if (path === '/auth/type-login') {
    const body = req.body as { token: string; type: string };
    const account =
      body.token.includes('dm_player') || body.token.includes('as_dm') ? 'dm' : 'player';
    mockKey = `${key}:${body.type}:${account}`;
  }

  if (mockKey in mocks) {
    return of(new HttpResponse({ status: 200, body: mocks[mockKey] }));
  }

  return next(req);
};
