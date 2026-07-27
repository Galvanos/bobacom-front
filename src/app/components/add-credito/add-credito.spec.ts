import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCredito } from './add-credito';

describe('AddCredito', () => {
  let component: AddCredito;
  let fixture: ComponentFixture<AddCredito>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCredito],
    }).compileComponents();

    fixture = TestBed.createComponent(AddCredito);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
