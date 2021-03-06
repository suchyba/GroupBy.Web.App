import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationYesNoModalComponent } from 'src/app/shared/components/modals/confirmation-yes-no-modal/confirmation-yes-no-modal.component';
import { ISimpleProject } from 'src/app/shared/models/project/project-simple.model';
import { ProjectService } from 'src/app/shared/services/project.service';

@Component({
  selector: 'shr-project-thumbnail',
  templateUrl: './project-thumbnail.component.html',
  styleUrls: ['./project-thumbnail.component.css']
})
export class ProjectThumbnailComponent implements OnInit {
  @Input() project: ISimpleProject | undefined
  @Input() canRemove: boolean | undefined
  @Output() deletedEvent: EventEmitter<void> = new EventEmitter<void>()

  constructor(
    private modalService: BsModalService,
    private projectService: ProjectService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {

  }

  calculateDaysToEnd(): number | undefined {
    if (this.project && this.project.endDate && this.project.active) {
      return Math.floor((new Date(this.project.endDate).getTime() - (new Date()).getTime()) / (1000 * 60 * 60 * 24))
    }

    return undefined
  }

  endSoon(): boolean {
    if (this.project && this.project.endDate && this.project.active) {
      let daysToEnd = this.calculateDaysToEnd()
      if (daysToEnd !== undefined)
        return daysToEnd <= 7 && daysToEnd > 0
    }

    return false
  }
  ended(): boolean {
    if (this.project && this.project.endDate && this.project.active) {
      let daysToEnd = this.calculateDaysToEnd()
      if (daysToEnd !== undefined)
        return daysToEnd < 0
    }

    return false
  }

  openConfirmation(action: (object: any) => void): boolean {
    const modalRef = this.modalService.show(ConfirmationYesNoModalComponent, { initialState: { message: 'You are sure you want to delete this project?' } })
    modalRef.onHidden?.subscribe(() => {
      if (modalRef.content?.result) {
        action(this)
      }
    })
    return false
  }

  removeProjectClick(): void {
    if (this.project)
      this.openConfirmation(this.removeProject)
  }

  removeProject(object: ProjectThumbnailComponent): void {
    if (object.project?.id)
      object.projectService.deleteProject(object.project.id).subscribe(result => {
        if (!result) {
          object.toastrService.success(`Project ${object.project?.name} has been deleted`)
          object.deletedEvent.emit()
        }
      })
  }
}
