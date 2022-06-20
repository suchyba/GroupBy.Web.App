import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ISimpleVolunteer } from 'src/app/shared/models/volunteer/volunteer-simple.model';
import { GroupService } from 'src/app/shared/services/group.service';
import { VolunteerService } from 'src/app/shared/services/volunteer.service';

@Component({
  selector: 'app-add-member-modal',
  templateUrl: './add-member-modal.component.html',
  styleUrls: ['./add-member-modal.component.css']
})
export class AddMemberModalComponent implements OnInit {
  @Input() groupId: number | undefined

  private allVolunteerList: ISimpleVolunteer[] = []
  constructor(
    private groupService: GroupService,
    private volunteerService: VolunteerService,
    private bsModalRef: BsModalRef
  ) { 
    volunteerService.getAllVolunteers().subscribe(list => {
      this.allVolunteerList = list
    })
  }

  ngOnInit(): void {
  }

}
