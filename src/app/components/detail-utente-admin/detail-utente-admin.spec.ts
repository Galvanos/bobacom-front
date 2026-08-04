import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailUtenteAdmin } from './detail-utente-admin';

describe('DetailUtenteAdmin', () => {
  let component: DetailUtenteAdmin;
  let fixture: ComponentFixture<DetailUtenteAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailUtenteAdmin],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailUtenteAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
