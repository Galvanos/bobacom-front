import { TestBed } from '@angular/core/testing';

import { AddCreditoNetworkService } from './add-credito-network-service';

describe('AddCreditoNetworkService', () => {
  let service: AddCreditoNetworkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddCreditoNetworkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
