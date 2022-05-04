import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialOutcomeRecordAddModalComponent } from './financial-outcome-record-add-modal.component';

describe('FinancialOutcomeRecordAddModalComponent', () => {
  let component: FinancialOutcomeRecordAddModalComponent;
  let fixture: ComponentFixture<FinancialOutcomeRecordAddModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancialOutcomeRecordAddModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialOutcomeRecordAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
