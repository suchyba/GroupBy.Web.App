import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingBooksListComponentModal } from './accounting-books-list-modal.component';

describe('AccountingBooksListComponentModal', () => {
  let component: AccountingBooksListComponentModal;
  let fixture: ComponentFixture<AccountingBooksListComponentModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountingBooksListComponentModal ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingBooksListComponentModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
