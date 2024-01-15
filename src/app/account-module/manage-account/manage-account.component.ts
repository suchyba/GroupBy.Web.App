import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ClipboardService } from 'ngx-clipboard';
import { ToastrService } from 'ngx-toastr';
import { Observable, tap } from 'rxjs';
import { RegistrationCodeAddModalComponent } from 'src/app/shared/components/modals/registration-code-add-modal/registration-code-add-modal.component';
import { IUser } from 'src/app/shared/models/auth/user.model';
import { IListRegistrationCode } from 'src/app/shared/models/registration-code/registration-code-list.model';
import { VolunteerService } from 'src/app/shared/services/volunteer.service';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.css']
})
export class ManageAccountComponent implements OnInit {
  public user?: IUser

  public submitted = false
  public loading = false
  public error: any

  public volunteerForm: UntypedFormGroup = new UntypedFormGroup({})

  public registrationCodes: IListRegistrationCode[] | null = null
  public showRegistrationCode: boolean[] = []

  public get fields() {
    return this.volunteerForm.controls
  }

  constructor(
    private volunteerService: VolunteerService,
    private route: ActivatedRoute,
    private formBuilder: UntypedFormBuilder,
    private toastrService: ToastrService,
    private modalService: BsModalService,
    private clipboardService: ClipboardService
  ) {
    this.user = route.snapshot.data['user']

    this.resetForm()
  }

  private resetForm() {
    this.volunteerForm = this.formBuilder.group({
      firstNames: [this.user?.relatedVolunteer.firstNames, Validators.required],
      lastName: [this.user?.relatedVolunteer.lastName, Validators.required],
      birthDate: [{ value: formatDate(new Date(this.user?.relatedVolunteer.birthDate ?? new Date()), 'yyyy-MM-dd', 'en'), disabled: true }, Validators.required],
      phoneNumber: [this.user?.relatedVolunteer.phoneNumber, Validators.required],
      email: [{ value: this.user?.email, disabled: true }, [Validators.required, Validators.email]],
      address: [this.user?.relatedVolunteer.address]
    })

    this.submitted = false
    this.loading = false
  }

  ngOnInit(): void {
    if (this.user?.relatedVolunteer)
      this.volunteerService.getRegistrationCodes(this.user.relatedVolunteer.id).subscribe(cList => {
        this.registrationCodes = cList
        this.showRegistrationCode = new Array(cList.length).fill(false)
      })
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.volunteerForm.invalid) {
      return;
    }

    this.loading = true;
    if (this.user) {
      this.volunteerService.updateVolunteer({
        id: this.user.relatedVolunteer.id,
        firstNames: this.volunteerForm.controls['firstNames'].value,
        lastName: this.volunteerForm.controls['lastName'].value,
        address: this.volunteerForm.controls['address'].value,
        birthDate: this.volunteerForm.controls['birthDate'].value,
        phoneNumber: this.volunteerForm.controls['phoneNumber'].value,
        confirmed: this.user.relatedVolunteer.confirmed,
        rankId: this.user.relatedVolunteer.rank?.id
      }).subscribe({
        error: (err) => {
          this.error = err
          this.loading = false
        },
        complete: () => {
          this.toastrService.success('Account has been updated successfully')
          //window.location.reload()
          if (this.user)
            this.volunteerService.getVolunteer(this.user?.relatedVolunteer.id).subscribe(v => {
              if (this.user)
                this.user.relatedVolunteer = v
              this.resetForm()
            })
        }
      })
    }
  }

  openAddRegistrationCodeModal() {
    if (this.user) {
      this.modalService.show(RegistrationCodeAddModalComponent, {
        initialState: {
          registrationCodeToCreate: {
            ownerId: this.user?.relatedVolunteer.id
          },
          ownerList: [this.user?.relatedVolunteer]
        }
      })
    }
  }

  copyToClipboard(text: string) {
    this.clipboardService.copyFromContent(text)
  }
}
