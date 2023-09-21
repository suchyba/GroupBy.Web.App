import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { ICreateGroup } from 'src/app/shared/models/group/group-create.model';
import { ISimpleGroup } from 'src/app/shared/models/group/group-simple.model';
import { ISimpleVolunteer } from 'src/app/shared/models/volunteer/volunteer-simple.model';
import { GroupService } from 'src/app/shared/services/group.service';
import { VolunteerService } from 'src/app/shared/services/volunteer.service';

@Component({
  templateUrl: './group-add-modal.component.html',
  styleUrls: ['./group-add-modal.component.css']
})
export class GroupAddModalComponent implements OnInit {
  @Input() groupToCreate: ICreateGroup | undefined
  public parentGroupList: ISimpleGroup[] | undefined
  public ownerList: ISimpleVolunteer[] | undefined

  public groupAddForm: UntypedFormGroup
  public submitted: boolean = false
  public loading: boolean = false
  public error: any
  public errorMessage: string = ''

  constructor(
    public bsModalRef: BsModalRef,
    private volunteerService: VolunteerService,
    private groupService: GroupService,
    private formBuilder: UntypedFormBuilder,
    private toastrService: ToastrService) {

    this.groupAddForm = this.formBuilder.group({})
  }

  ngOnInit(): void {
    this.bsModalRef.setClass('modal-lg')

    this.groupAddForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      owner: [this.groupToCreate?.ownerId, Validators.required],
      parentGroup: [this.groupToCreate?.parentGroupId, Validators.required]
    })

    if (this.groupToCreate) {
      // loading parent group list
      this.volunteerService.getOwnedGroups(this.groupToCreate.ownerId).subscribe(groups => {
        this.parentGroupList = groups
        if (this.groupToCreate?.parentGroupId)
          this.parentGroupList = this.parentGroupList.filter(g => g.id === this.groupToCreate?.parentGroupId)
      })

      // loading owner list
      if (this.groupToCreate.parentGroupId) {
        this.groupService.getMembers(this.groupToCreate.parentGroupId).subscribe(members => {
          this.ownerList = members
          if (this.groupToCreate?.ownerId)
            this.ownerList = this.ownerList.filter(o => o.id === this.groupToCreate?.ownerId)
        })
      }
      else {
        this.volunteerService.getVolunteer(this.groupToCreate.ownerId).subscribe(v => {
          this.ownerList = [v]
        })
      }
      if (this.groupToCreate.ownerId)
        this.groupAddForm.get('owner')?.disable()

      if (this.groupToCreate.parentGroupId)
        this.groupAddForm.get('parentGroup')?.disable()
    }
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.groupAddForm.invalid) {
      return;
    }

    this.loading = true;

    this.groupService.createGroup({
      name: this.groupAddForm.controls['name'].value,
      description: this.groupAddForm.controls['description'].value,
      ownerId: this.groupAddForm.controls['owner'].value,
      parentGroupId: this.groupAddForm.controls['parentGroup'].value
    }).pipe(first())
      .subscribe({
        complete: () => {
          this.toastrService.success(`Successfully created ${this.groupAddForm.get('name')?.value} group`)
          this.bsModalRef.hide()
        },
        error: (error) => {
          this.error = error;
          if (error?.id)
            this.errorMessage = error.message
          this.loading = false;
        }
      })
  }

  get fields() { return this.groupAddForm.controls }
}
