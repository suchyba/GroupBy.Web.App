import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationYesNoModalComponent } from 'src/app/shared/components/modals/confirmation-yes-no-modal/confirmation-yes-no-modal.component';
import { ISimpleGroup } from 'src/app/shared/models/group/group-simple.model';
import { GroupService } from 'src/app/shared/services/group.service';

@Component({
    selector: 'shr-group-thumbnail',
    templateUrl: './group-thumbnail.component.html',
    styleUrls: ['./group-thumbnail.component.css'],
    standalone: false
})
export class GroupThumbnailComponent implements OnInit {
  @Input() group: ISimpleGroup | undefined
  @Input() canRemove: boolean | undefined
  @Output() deletedEvent: EventEmitter<void> = new EventEmitter<void>()
  constructor(
    private modalService: NgbModal,
    private groupService: GroupService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
  }

  openConfirmation(action: (object: any) => void): boolean {
    const modalRef = this.modalService.open(ConfirmationYesNoModalComponent)

    modalRef.componentInstance.message = 'You are sure you want to delete this group?'

    modalRef.result.then(() => {
        action(this)
    })
    return false
  }

  removeGroupClick(): void {
    if (this.group)
      this.openConfirmation(this.removeGroup)
  }

  removeGroup(object: GroupThumbnailComponent): void {
    if (object.group?.id)
      object.groupService.deleteGroup(object.group.id).subscribe(result => {
        if (result === null) {
          object.toastrService.success(`Group ${object.group?.name} has been deleted`)
          object.deletedEvent.emit()
        }
      })
  }
}
