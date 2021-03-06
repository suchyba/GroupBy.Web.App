import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationYesNoModalComponent } from 'src/app/shared/components/modals/confirmation-yes-no-modal/confirmation-yes-no-modal.component';
import { ISimpleGroup } from 'src/app/shared/models/group/group-simple.model';
import { GroupService } from 'src/app/shared/services/group.service';

@Component({
  selector: 'shr-group-thumbnail',
  templateUrl: './group-thumbnail.component.html',
  styleUrls: ['./group-thumbnail.component.css']
})
export class GroupThumbnailComponent implements OnInit {
  @Input() group: ISimpleGroup | undefined
  @Input() canRemove: boolean | undefined
  @Output() deletedEvent: EventEmitter<void> = new EventEmitter<void>()
  constructor(
    private modalService: BsModalService,
    private groupService: GroupService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
  }

  openConfirmation(action: (object: any) => void): boolean {
    const modalRef = this.modalService.show(ConfirmationYesNoModalComponent, { initialState: { message: 'You are sure you want to delete this group?' } })
    modalRef.onHidden?.subscribe(() => {
      if (modalRef.content?.result) {
        action(this)
      }
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
