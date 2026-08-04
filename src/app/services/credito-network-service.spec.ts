import { TestBed } from '@angular/core/testing';

import { CreditoNetworkService } from './credito-network-service';

describe('CreditoNetworkService', () => {
  let service: CreditoNetworkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditoNetworkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
