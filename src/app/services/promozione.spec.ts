import { TestBed } from '@angular/core/testing';

import { Promozione } from './promozione';

describe('Promozione', () => {
  let service: Promozione;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Promozione);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
