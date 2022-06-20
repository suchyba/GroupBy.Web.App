import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ISimpleVolunteer } from 'src/app/shared/models/volunteer/volunteer-simple.model';
import { GroupService } from 'src/app/shared/services/group.service';
import { ConfirmationYesNoModalComponent } from '../../modals/confirmation-yes-no-modal/confirmation-yes-no-modal.component';

@Component({
  selector: 'shr-volunteer-thumbnail',
  templateUrl: './volunteer-thumbnail.component.html',
  styleUrls: ['./volunteer-thumbnail.component.css']
})
export class VolunteerThumbnailComponent implements OnInit {
  @Input() volunteer: ISimpleVolunteer | undefined
  @Input() canRemove: boolean | undefined
  @Input() groupId: number | undefined

  @Output() onRemovedFromGroupEvent: EventEmitter<void> = new EventEmitter<void>()
  constructor(
    private modalService: BsModalService,
    private toastrService: ToastrService,
    private groupService: GroupService) { }

  ngOnInit(): void {
  }

  openConfirmation(action: (object: any) => void): boolean {
    const modalRef = this.modalService.show(ConfirmationYesNoModalComponent, { initialState: { message: `You are sure you want to kick ${this.volunteer?.firstNames} ${this.volunteer?.lastName} out from the group?` } })
    modalRef.onHidden?.subscribe(() => {
      if (modalRef.content?.result) {
        action(this)
      }
    })
    return false
  }

  kickVolunteer(object: VolunteerThumbnailComponent): void {
    if (object.volunteer?.id && object.groupId)
      object.groupService.removeMember(object.groupId, object.volunteer.id).subscribe(result => {
        if (!result) {
          object.toastrService.success(`Volunteer ${object.volunteer?.firstNames} ${object.volunteer?.lastName} has been kicked off from the group`)
          object.onRemovedFromGroupEvent.emit()
        }
      })
    }
    
    onRemoveClick(): void {
      if (this.groupId) {
        this.openConfirmation(this.kickVolunteer)
      }
  }
}
