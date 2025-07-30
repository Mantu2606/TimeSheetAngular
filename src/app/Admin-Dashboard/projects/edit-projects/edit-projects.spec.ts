import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProjects } from './edit-projects';

describe('EditProjects', () => {
  let component: EditProjects;
  let fixture: ComponentFixture<EditProjects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProjects]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProjects);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
