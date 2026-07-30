import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrazioneUpdate } from './registrazione-update';

describe('RegistrazioneUpdate', () => {
  let component: RegistrazioneUpdate;
  let fixture: ComponentFixture<RegistrazioneUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrazioneUpdate],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrazioneUpdate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
