import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsThumbnailComponent } from './projects-thumbnail.component';

describe('ProjectsThumbnailComponent', () => {
  let component: ProjectsThumbnailComponent;
  let fixture: ComponentFixture<ProjectsThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsThumbnailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
