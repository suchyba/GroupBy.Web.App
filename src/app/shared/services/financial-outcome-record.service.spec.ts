import { TestBed } from '@angular/core/testing';

import { FinancialOutcomeRecordService } from './financial-outcome-record.service';

describe('FinancialOutcomeRecordService', () => {
  let service: FinancialOutcomeRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinancialOutcomeRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
