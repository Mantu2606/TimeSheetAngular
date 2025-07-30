import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFuntion } from './add-funtion';

describe('AddFuntion', () => {
  let component: AddFuntion;
  let fixture: ComponentFixture<AddFuntion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFuntion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFuntion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
