import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { ISimpleGroup } from 'src/app/shared/models/group/group-simple.model';
import { ISimpleRank } from 'src/app/shared/models/rank/rank-simple.model';
import { ICreateRegistrationCode } from 'src/app/shared/models/registration-code/registration-code-create.model';
import { ISimpleVolunteer } from 'src/app/shared/models/volunteer/volunteer-simple.model';
import { RankService } from 'src/app/shared/services/rank.service';
import { RegistrationCodeService } from 'src/app/shared/services/registration-code.service';
import { VolunteerService } from 'src/app/shared/services/volunteer.service';

@Component({
  selector: 'app-registration-code-add-modal',
  templateUrl: './registration-code-add-modal.component.html',
  styleUrls: ['./registration-code-add-modal.component.css']
})
export class RegistrationCodeAddModalComponent implements OnInit {
  @Input() registrationCodeToCreate?: ICreateRegistrationCode
  public targetGroupList?: ISimpleGroup[]
  public ownerList?: ISimpleVolunteer[]
  public targetRankList?: ISimpleRank[]

  public registrationCodeAddForm: UntypedFormGroup = new UntypedFormGroup({})
  public submitted: boolean = false
  public loading: boolean = false
  public error: any
  public errorMessage: string = ''

  get fields() {
    return this.registrationCodeAddForm.controls
  }

  constructor(
    public bsModalRef: BsModalRef,
    private volunteerService: VolunteerService,
    private formBuilder: UntypedFormBuilder,
    private rankService: RankService,
    private registrationCodeService: RegistrationCodeService,
    private toastrService: ToastrService) { 
      
  }

  ngOnInit(): void {
    this.registrationCodeAddForm = this.formBuilder.group({
      name: [this.registrationCodeToCreate?.name, Validators.required],
      targetGroup: [{
        value: this.registrationCodeToCreate?.targetGroupId,
        disabled: this.registrationCodeToCreate?.targetGroupId
      }, Validators.required],
      targetRank: [{
        value: this.registrationCodeToCreate?.targetRankId,
        disabled: this.registrationCodeToCreate?.targetRankId
      }],
      owner: [{
        value: this.registrationCodeToCreate?.ownerId,
        disabled: this.registrationCodeToCreate?.ownerId
      }, Validators.required]
    })

    if (this.registrationCodeToCreate) {
      if (this.registrationCodeToCreate.ownerId) {
        this.volunteerService.getOwnedGroups(this.registrationCodeToCreate.ownerId).subscribe(groups => {
          this.targetGroupList = groups
        })
      }
    }
    this.rankService.getAllRanks().subscribe(ranks => {
      this.targetRankList = ranks
    })
  }

  public closeModal() {
    this.bsModalRef.hide()
  }

  public onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registrationCodeAddForm.invalid) {
      return;
    }

    this.loading = true;

    this.registrationCodeService.createRegistrationCode({
      name: this.registrationCodeAddForm.controls['name'].value,
      ownerId: this.registrationCodeAddForm.controls['owner'].value,
      targetGroupId: this.registrationCodeAddForm.controls['targetGroup'].value,
      targetRankId: this.registrationCodeAddForm.controls['targetRank'].value
    }).pipe(first())
      .subscribe({
        complete: () => {
          this.toastrService.success(`Successfully created ${this.registrationCodeAddForm.get('name')?.value} registration code`)
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
}
