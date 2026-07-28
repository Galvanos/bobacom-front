import { TestBed } from '@angular/core/testing';

import { TagprodottoService } from './tagprodotto-service';

describe('TagprodottoService', () => {
  let service: TagprodottoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TagprodottoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
