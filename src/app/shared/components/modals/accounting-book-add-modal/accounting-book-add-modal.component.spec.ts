import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingBookAddModalComponent } from './accounting-book-add-modal.component';

describe('AccountingBookAddModalComponent', () => {
  let component: AccountingBookAddModalComponent;
  let fixture: ComponentFixture<AccountingBookAddModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountingBookAddModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingBookAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
