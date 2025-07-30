import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTimeSlot } from './add-time-slot';

describe('AddTimeSlot', () => {
  let component: AddTimeSlot;
  let fixture: ComponentFixture<AddTimeSlot>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTimeSlot]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTimeSlot);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
