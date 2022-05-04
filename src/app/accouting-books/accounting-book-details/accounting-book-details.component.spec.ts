import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingBookDetailsComponent } from './accounting-book-details.component';

describe('AccountingBookDetailsComponent', () => {
  let component: AccountingBookDetailsComponent;
  let fixture: ComponentFixture<AccountingBookDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountingBookDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingBookDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
