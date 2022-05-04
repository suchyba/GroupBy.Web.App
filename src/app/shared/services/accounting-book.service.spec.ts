import { TestBed } from '@angular/core/testing';

import { AccountingBookService } from './accounting-book.service';

describe('AccountingBookService', () => {
  let service: AccountingBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountingBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
