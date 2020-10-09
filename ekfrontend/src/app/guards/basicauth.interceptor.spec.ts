import { TestBed } from '@angular/core/testing';

import { BasicauthInterceptor } from './basicauth.interceptor';

describe('BasicauthInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      BasicauthInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: BasicauthInterceptor = TestBed.inject(BasicauthInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
