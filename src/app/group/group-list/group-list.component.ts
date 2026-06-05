import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/core/auth/auth.service';
import { GroupAddModalComponent } from 'src/app/shared/components/modals/group-add-modal/group-add-modal.component';
import { ISimpleGroup } from 'src/app/shared/models/group/group-simple.model';

@Component({
    templateUrl: './group-list.component.html',
    styleUrls: ['./group-list.component.css'],
    standalone: false
})
export class GroupListComponent implements OnInit {
  @Input() groups: ISimpleGroup[] | undefined
  constructor(
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.groups = this.route.snapshot.data['groups']
  }

  openGroupAddModal(): void {
    const userId: string | undefined = this.authService.getUserId()
    if (userId)
    {
      const modalRef = this.modalService.open(GroupAddModalComponent, { size: 'lg' })
      modalRef.componentInstance.groupToCreate = {
        ownerId: userId,
        description: undefined,
        name: undefined,
        parentGroupId: undefined
      }
    }
  }

}
