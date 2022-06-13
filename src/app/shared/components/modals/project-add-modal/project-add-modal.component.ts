import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { first } from 'rxjs/internal/operators/first';
import { ISimpleGroup } from 'src/app/shared/models/group/group-simple.model';
import { ICreateProject } from 'src/app/shared/models/project/project-create.model';
import { ISimpleVolunteer } from 'src/app/shared/models/volunteer/volunteer-simple.model';
import { GroupService } from 'src/app/shared/services/group.service';
import { ProjectService } from 'src/app/shared/services/project.service';
import { VolunteerService } from 'src/app/shared/services/volunteer.service';

@Component({
  templateUrl: './project-add-modal.component.html',
  styleUrls: ['./project-add-modal.component.css']
})
export class ProjectAddModalComponent implements OnInit {
  @Input() projectToCreate: ICreateProject | undefined
  public parentGroupList: ISimpleGroup[] | undefined
  public ownerList: ISimpleVolunteer[] | undefined

  public projectAddForm: FormGroup
  public submitted: boolean = false
  public loading: boolean = false
  public error: any
  public errorMessage: string = ''

  constructor(
    public bsModalRef: BsModalRef,
    private volunteerService: VolunteerService,
    private groupService: GroupService,
    private projectService: ProjectService,
    private formBuilder: FormBuilder) {

    this.projectAddForm = this.formBuilder.group({})
  }

  ngOnInit(): void {
    this.bsModalRef.setClass('modal-lg')

    this.projectAddForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      beginDate: [this.projectToCreate?.beginDate],
      endDate: [this.projectToCreate?.endDate],
      active: [this.projectToCreate?.active],
      independent: [this.projectToCreate?.independent],
      owner: [this.projectToCreate?.ownerId, Validators.required],
      parentGroup: [this.projectToCreate?.parentGroupId, Validators.required]
    })

    if (this.projectToCreate) {
      // loading parent group list
      this.volunteerService.getOwnedGroups(this.projectToCreate.ownerId).subscribe(groups => {
        this.parentGroupList = groups
        if (this.projectToCreate?.parentGroupId)
          this.parentGroupList = this.parentGroupList.filter(g => g.id === this.projectToCreate?.parentGroupId)
      })

      // loading owner list
      if (this.projectToCreate.parentGroupId) {
        this.groupService.getMembers(this.projectToCreate.parentGroupId).subscribe(members => {
          this.ownerList = members
          if (this.projectToCreate?.ownerId)
            this.ownerList = this.ownerList.filter(o => o.id === this.projectToCreate?.ownerId)
        })
      }
      else {
        this.volunteerService.getVolunteer(this.projectToCreate.ownerId).subscribe(v => {
          this.ownerList = [v]
        })
      }
      if (this.projectToCreate.ownerId)
        this.projectAddForm.get('owner')?.disable()

      if (this.projectToCreate.parentGroupId)
        this.projectAddForm.get('parentGroup')?.disable()
    }
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.projectAddForm.invalid) {
      return;
    }

    this.loading = true;

    const project: ICreateProject = {
      name: this.projectAddForm.controls['name'].value,
      description: this.projectAddForm.controls['description'].value,
      ownerId: parseInt(this.projectAddForm.controls['owner'].value),
      parentGroupId: parseInt(this.projectAddForm.controls['parentGroup'].value),
      active: this.projectAddForm.controls['active'].value,
      beginDate: this.projectAddForm.controls['beginDate'].value,
      endDate: this.projectAddForm.controls['endDate'].value,
      independent: this.projectAddForm.controls['independent'].value
    }

    if (project.beginDate && new Date(project.beginDate).toDateString() === "")
      project.beginDate = undefined

    if (project.endDate && new Date(project.endDate).toDateString() === "")
      project.endDate = undefined

    this.projectService.createProject(project).pipe(first())
      .subscribe({
        complete: () => this.bsModalRef.hide(),
        error: (error) => {
          this.error = error;
          if (error?.id)
            this.errorMessage = error.message
          this.loading = false;
        }
      })
  }

  get fields() { return this.projectAddForm.controls }
}
