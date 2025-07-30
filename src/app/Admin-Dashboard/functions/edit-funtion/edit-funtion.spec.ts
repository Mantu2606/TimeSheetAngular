import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFuntion } from './edit-funtion';

describe('EditFuntion', () => {
  let component: EditFuntion;
  let fixture: ComponentFixture<EditFuntion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditFuntion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFuntion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
