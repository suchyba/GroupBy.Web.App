import { TestBed } from '@angular/core/testing';

import { AccountingDocumentService } from './accounting-document.service';

describe('AccountingDocumentService', () => {
  let service: AccountingDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountingDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
