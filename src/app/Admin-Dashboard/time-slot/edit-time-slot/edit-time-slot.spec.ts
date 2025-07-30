import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTimeSlot } from './edit-time-slot';

describe('EditTimeSlot', () => {
  let component: EditTimeSlot;
  let fixture: ComponentFixture<EditTimeSlot>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTimeSlot]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTimeSlot);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
