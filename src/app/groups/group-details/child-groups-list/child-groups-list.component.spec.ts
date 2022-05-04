import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildGroupsListComponent } from './child-groups-list.component';

describe('ChildGroupsListComponent', () => {
  let component: ChildGroupsListComponent;
  let fixture: ComponentFixture<ChildGroupsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildGroupsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildGroupsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
