import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeaCustomizerModal } from './tea-customizer-modal';

describe('TeaCustomizerModal', () => {
  let component: TeaCustomizerModal;
  let fixture: ComponentFixture<TeaCustomizerModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeaCustomizerModal],
    }).compileComponents();

    fixture = TestBed.createComponent(TeaCustomizerModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
