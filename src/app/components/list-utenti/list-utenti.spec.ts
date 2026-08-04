import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUtenti } from './list-utenti';

describe('ListUtenti', () => {
  let component: ListUtenti;
  let fixture: ComponentFixture<ListUtenti>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListUtenti],
    }).compileComponents();

    fixture = TestBed.createComponent(ListUtenti);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
