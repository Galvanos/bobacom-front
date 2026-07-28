import { TestBed } from '@angular/core/testing';

import { StockOperationsService } from './stock-operations-service';

describe('StockOperationsService', () => {
  let service: StockOperationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockOperationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
