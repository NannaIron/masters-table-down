import { HttpInterceptorFn, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';

const mocks: Record<string, unknown> = {
  'POST /auth/login-user:MESA-001': {
    type: ['DM', 'PLAYER'],
    token: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtZXNhLTAwMSIsInN0YXR1cyI6InBlbmRpbmcifQ.mock_dm_mesa',
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

const AUTH_PATHS = ['/auth/login', '/auth/login-user', '/auth/type-login', '/auth/logout'];

const invalid = () => throwError(() => new HttpErrorResponse({ status: 401 }));

export const authMockInterceptor: HttpInterceptorFn = (req, next) => {
  const path = req.url.replace('https://api.masters-table.placeholder/v1', '');
  const key = `${req.method} ${path}`;
  let mockKey = key;

  if (path === '/auth/login') {
    const body = req.body as { email: string; pass: string };
    if (body.email === 'dm@mock.com' && body.pass === 'dm123') {
      mockKey = `${key}:dm`;
    } else if (body.email === 'player@mock.com' && body.pass === 'player123') {
      mockKey = `${key}:player`;
    } else {
      return invalid();
    }
  }

  if (path === '/auth/login-user') {
    const body = req.body as { code: string };
    if (body.code === 'MESA-001') {
      mockKey = `${key}:MESA-001`;
    } else {
      return invalid();
    }
  }

  if (path === '/auth/type-login') {
    const body = req.body as { token: string; type: string };
    const isDm = body.token.includes('mock_dm');
    mockKey = `${key}:${body.type}:${isDm ? 'dm' : 'player'}`;
  }

  if (mockKey in mocks) {
    return of(new HttpResponse({ status: 200, body: mocks[mockKey] }));
  }

  if (AUTH_PATHS.some((p) => path.startsWith(p))) {
    return invalid();
  }

  return next(req);
};
