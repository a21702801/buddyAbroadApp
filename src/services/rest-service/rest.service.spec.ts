import { TestBed } from '@angular/core/testing';

import { RestService } from './auth.service';

describe('RestApi', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestService = TestBed.get(RestService);
    expect(service).toBeTruthy();
  });
});
