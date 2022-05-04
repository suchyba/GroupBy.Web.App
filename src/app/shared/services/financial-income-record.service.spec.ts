import { TestBed } from '@angular/core/testing';

import { FinancialIncomeRecordService } from './financial-income-record.service';

describe('FinancialIncomeRecordService', () => {
  let service: FinancialIncomeRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinancialIncomeRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
