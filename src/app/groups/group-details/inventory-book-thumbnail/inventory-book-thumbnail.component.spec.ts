import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryBookThumbnailComponent } from './inventory-book-thumbnail.component';

describe('InventoryBookThumbnailComponent', () => {
  let component: InventoryBookThumbnailComponent;
  let fixture: ComponentFixture<InventoryBookThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryBookThumbnailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryBookThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
