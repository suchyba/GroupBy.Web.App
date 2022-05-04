import { TestBed } from '@angular/core/testing';

import { AccountingBookDetailsResolver } from './accounting-book-details.resolver';

describe('AccountingBookDetailsResolver', () => {
  let resolver: AccountingBookDetailsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AccountingBookDetailsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
