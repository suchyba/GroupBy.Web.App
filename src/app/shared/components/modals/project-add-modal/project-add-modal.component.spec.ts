import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAddModalComponent } from './project-add-modal.component';

describe('ProjectAddModalComponent', () => {
  let component: ProjectAddModalComponent;
  let fixture: ComponentFixture<ProjectAddModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectAddModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
