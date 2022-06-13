import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { GroupAddModalComponent } from 'src/app/shared/components/modals/group-add-modal/group-add-modal.component';
import { ISimpleGroup } from 'src/app/shared/models/group/group-simple.model';

@Component({
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css']
})
export class GroupsListComponent implements OnInit {
  @Input() groups: ISimpleGroup[] | undefined
  constructor(
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.groups = this.route.snapshot.data['groups']
  }

  openGroupAddModal(): void {
    const userId: number | undefined = this.authService.getUserId()
    if (userId)
    {
      this.modalService.show(GroupAddModalComponent, {
      initialState: {
        groupToCreate: {
          ownerId: userId,
          description: undefined,
          name: undefined,
          parentGroupId: undefined
        }
      }})
    }
  }

}
