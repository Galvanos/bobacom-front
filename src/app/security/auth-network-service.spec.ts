import { TestBed } from '@angular/core/testing';

import { AuthNetworkService } from './auth-network-service';

describe('AuthNetworkService', () => {
  let service: AuthNetworkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthNetworkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
