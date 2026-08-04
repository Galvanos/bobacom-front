import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizationComponent } from './customization';

describe('Customization', () => {
  let component: CustomizationComponent;
  let fixture: ComponentFixture<CustomizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomizationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomizationComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
