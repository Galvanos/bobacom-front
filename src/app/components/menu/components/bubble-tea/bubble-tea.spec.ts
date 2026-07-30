import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BubbleTea } from './bubble-tea';

describe('BubbleTea', () => {
  let component: BubbleTea;
  let fixture: ComponentFixture<BubbleTea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BubbleTea]
    }).compileComponents();

    fixture = TestBed.createComponent(BubbleTea);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('dovrebbe creare il componente', () => {
    expect(component).toBeTruthy();
  });

  it('dovrebbe incrementare la quantità', () => {
    component.increment();
    expect(component.quantity()).toBe(2);
  });

  it('non dovrebbe scendere sotto la quantità 1', () => {
    component.decrement();
    expect(component.quantity()).toBe(1);
  });
});