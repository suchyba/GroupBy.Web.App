import { Component, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    templateUrl: './confirmation-yes-no-modal.component.html',
    styleUrls: ['./confirmation-yes-no-modal.component.css'],
    standalone: false
})
export class ConfirmationYesNoModalComponent implements OnInit {
  @Input() message: string = 'Are you sure?'
  @Output() result: boolean | undefined

  constructor(
    public bsModalRef: NgbActiveModal) {
      
    }

  ngOnInit(): void {

  }

  cancelClick(): void {
    this.result = false
    this.bsModalRef.close()
  }

  okClick(): void {
    this.result = true
    this.bsModalRef.close()
  }

}
