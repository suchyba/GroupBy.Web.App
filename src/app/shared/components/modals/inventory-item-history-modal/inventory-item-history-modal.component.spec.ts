import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryItemHistoryModalComponent } from './inventory-item-history-modal.component';

describe('InventoryItemHistoryModalComponent', () => {
  let component: InventoryItemHistoryModalComponent;
  let fixture: ComponentFixture<InventoryItemHistoryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryItemHistoryModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryItemHistoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});