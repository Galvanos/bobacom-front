import { TestBed } from '@angular/core/testing';

import { AllergeniService } from './allergeni-service';

describe('AllergeniService', () => {
  let service: AllergeniService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllergeniService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
