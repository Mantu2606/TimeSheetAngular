import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditModule } from './edit-module';

describe('EditModule', () => {
  let component: EditModule;
  let fixture: ComponentFixture<EditModule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditModule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
