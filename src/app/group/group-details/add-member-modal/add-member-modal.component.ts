import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ISimpleVolunteer } from 'src/app/shared/models/volunteer/volunteer-simple.model';
import { GroupService } from 'src/app/shared/services/group.service';
import { VolunteerService } from 'src/app/shared/services/volunteer.service';

@Component({
    selector: 'app-add-member-modal',
    templateUrl: './add-member-modal.component.html',
    styleUrls: ['./add-member-modal.component.css'],
    standalone: false
})
export class AddMemberModalComponent implements OnInit {
  @Input() groupId: string | undefined
  @Output() volunteerAddedEvent: EventEmitter<string> = new EventEmitter<string>()

  public allVolunteerList: ISimpleVolunteer[] = []
  public filteredVolunteerList: Observable<ISimpleVolunteer[]> = new Observable<ISimpleVolunteer[]>()
  public search: (text$: Observable<string>) => Observable<ISimpleVolunteer[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term: string) => {
        const query = new RegExp(term || '', 'i')
        return this.allVolunteerList.filter((volunteer: ISimpleVolunteer) =>
          (query.test(volunteer.firstNames)
            || query.test(volunteer.lastName)
            || query.test(volunteer.email))
          && !this.selectedVolunteerList.find(v => v.id === volunteer.id)
        ).slice(0, 10)
      })
    )
  public selectedVolunteerList: ISimpleVolunteer[] = []
  public selectedVolunteer: string | undefined
  public noResults: boolean = false

  constructor(
    private groupService: GroupService,
    private volunteerService: VolunteerService,
    private toastrService: ToastrService,
    public activeModal: NgbActiveModal) {
      volunteerService.getAllVolunteers().subscribe(list => {
      this.allVolunteerList = [...list]
      if (this.groupId) {
        groupService.getMembers(this.groupId).subscribe(members => {
          // only volunteers who are not members of the group
          this.allVolunteerList = this.allVolunteerList.filter(v => !members.find(m => m.id === v.id))
        })
      }
    })
  }

  ngOnInit(): void {
    // ng-bootstrap size should be set when opening the modal (size: 'lg')
  }

  onSelect(match: any): void {
    this.selectedVolunteerList = [...this.selectedVolunteerList, match.item]
    this.selectedVolunteer = undefined
  }

  removeVolunteerFromSelectedList(volunteerId: string): void {
    this.selectedVolunteerList = this.selectedVolunteerList.filter(v => v.id !== volunteerId)
  }

  confirmClick(): void {
    if (this.groupId) {
      this.selectedVolunteerList.forEach((volunteer) => {
        this.groupService.addMember(<string>this.groupId, volunteer.id).subscribe(result => {
          if (!result) {
            this.toastrService.success(`Volunteer ${volunteer.firstNames} ${volunteer.lastName} has been added to the group`)
            this.volunteerAddedEvent.emit(volunteer.id)
          }
        })
      })
    }
    this.activeModal.close()
  }
  cancelClick(): void {
    this.activeModal.close()
  }

  noResultsEvent(isNoResults: any): void {
   this.noResults = !!isNoResults 
  }
}
