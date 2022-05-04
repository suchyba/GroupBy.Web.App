import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerThumbnailComponent } from './volunteers-thumbnail.component';

describe('VolunteersThumbnailComponent', () => {
  let component: VolunteerThumbnailComponent;
  let fixture: ComponentFixture<VolunteerThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VolunteerThumbnailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteerThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
