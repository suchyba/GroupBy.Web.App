import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialIncomeRecordAddModalComponent } from './financial-income-record-add-modal.component';

describe('FinancialIncomeRecordAddModalComponent', () => {
  let component: FinancialIncomeRecordAddModalComponent;
  let fixture: ComponentFixture<FinancialIncomeRecordAddModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancialIncomeRecordAddModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialIncomeRecordAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
