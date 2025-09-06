import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponents } from './card-components';

describe('CardComponents', () => {
  let component: CardComponents;
  let fixture: ComponentFixture<CardComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
