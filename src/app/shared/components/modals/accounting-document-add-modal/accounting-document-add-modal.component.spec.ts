import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingDocumentAddModalComponent } from './accounting-document-add-modal.component';

describe('AccountingDocumentAddModalComponent', () => {
  let component: AccountingDocumentAddModalComponent;
  let fixture: ComponentFixture<AccountingDocumentAddModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountingDocumentAddModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingDocumentAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
