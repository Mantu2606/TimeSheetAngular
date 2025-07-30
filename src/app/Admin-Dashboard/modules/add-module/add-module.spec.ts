import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModule } from './add-module';

describe('AddModule', () => {
  let component: AddModule;
  let fixture: ComponentFixture<AddModule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddModule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
