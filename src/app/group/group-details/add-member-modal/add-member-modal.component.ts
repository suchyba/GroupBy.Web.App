import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, Subscriber, switchMap } from 'rxjs';
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
  @Output() volunteerAddedEvent: EventEmitter<number> = new EventEmitter<number>()

  public allVolunteerList: ISimpleVolunteer[] = []
  public filteredVolunteerList: Observable<ISimpleVolunteer[]> = new Observable<ISimpleVolunteer[]>()
  public selectedVolunteerList: ISimpleVolunteer[] = []
  public selectedVolunteer: string | undefined
  public noResults: boolean = false

  constructor(
    private groupService: GroupService,
    private volunteerService: VolunteerService,
    private toastrService: ToastrService,
    public bsModalRef: BsModalRef) {
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
    this.bsModalRef.setClass('modal-lg')
    this.filteredVolunteerList = new Observable((observer: Subscriber<string>) => {
      // Runs on every search
      observer.next(this.selectedVolunteer);
    })
      .pipe(
        switchMap((token: string) => {
          const query = new RegExp(token, 'i');

          return of(
            this.allVolunteerList.filter((volunteer: ISimpleVolunteer) =>
              (query.test(volunteer.firstNames)
                || query.test(volunteer.lastName)
                || query.test(volunteer.email))
              && !this.selectedVolunteerList.find(v => v.id === volunteer.id))
          );
        })
      );
  }

  onSelect(match: TypeaheadMatch): void {
    this.selectedVolunteerList = [...this.selectedVolunteerList, match.item]
    this.selectedVolunteer = undefined
  }

  removeVolunteerFromSelectedList(volunteerId: number): void {
    this.selectedVolunteerList = this.selectedVolunteerList.filter(v => v.id !== volunteerId)
  }

  confirmClick(): void {
    if (this.groupId) {
      this.selectedVolunteerList.forEach((volunteer) => {
        this.groupService.addMember(<number>this.groupId, volunteer.id).subscribe(result => {
          if (!result) {
            this.toastrService.success(`Volunteer ${volunteer.firstNames} ${volunteer.lastName} has been added to the group`)
            this.volunteerAddedEvent.emit(volunteer.id)
          }
        })
      })
    }
    this.bsModalRef.hide()
  }
  cancelClick(): void {
    this.bsModalRef.hide()
  }

  noResultsEvent(isNoResults: boolean): void {
   this.noResults = isNoResults 
  }
}
