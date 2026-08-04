import { TestBed } from '@angular/core/testing';

import { CategoriaIngredienteService } from './categoria-ingrediente-service';

describe('CategoriaIngredienteService', () => {
  let service: CategoriaIngredienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriaIngredienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
