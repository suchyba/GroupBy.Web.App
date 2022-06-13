import { Component, Input, OnInit, Output } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  templateUrl: './confirmation-yes-no-modal.component.html',
  styleUrls: ['./confirmation-yes-no-modal.component.css']
})
export class ConfirmationYesNoModalComponent implements OnInit {
  @Input() message: string = 'Are you sure?'
  @Output() result: boolean | undefined

  constructor(
    public bsModalRef: BsModalRef,
    private modalService: BsModalService) {
      
    }

  ngOnInit(): void {

  }

  cancelClick(): void {
    this.result = false
    this.bsModalRef.hide()
  }
  okClick(): void {
    this.result = true
    this.bsModalRef.hide()
  }

}
