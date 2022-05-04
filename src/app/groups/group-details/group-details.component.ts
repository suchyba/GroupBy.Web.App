import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { AccountingBookAddModalComponent } from 'src/app/shared/components/modals/accounting-book-add-modal/accounting-book-add-modal.component';
import { GroupAddModalComponent } from 'src/app/shared/components/modals/group-add-modal/group-add-modal.component';
import { ProjectAddModalComponent } from 'src/app/shared/components/modals/project-add-modal/project-add-modal.component';
import { ISimpleAccountingBook } from 'src/app/shared/models/accounting-book/accounting-book-simple.model';
import { ISimpleGroup } from 'src/app/shared/models/group/group-simple.model';
import { IGroup } from 'src/app/shared/models/group/group.model';
import { ISimpleProject } from 'src/app/shared/models/project/project-simple.model';
import { ISimpleVolunteer } from 'src/app/shared/models/volunteer/volunteer-simple.model';
import { GroupService } from 'src/app/shared/services/group.service';
import { VolunteerService } from 'src/app/shared/services/volunteer.service';
import { AccountingBooksListComponentModal } from '../group-details/accounting-books-list-modal/accounting-books-list-modal.component';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.css']
})
export class GroupDetailsComponent implements OnInit {
  group: IGroup | undefined
  childGroups: ISimpleGroup[] | undefined
  volunteerId: number | undefined
  accountingBooks: ISimpleAccountingBook[] | undefined

  members: ISimpleVolunteer[] | undefined | null = null
  membersHidden: boolean = true;

  projects: ISimpleProject[] | undefined | null = null
  projectsHidden: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private groupService: GroupService,
    private modalService: BsModalService,
    private authService: AuthService,
    private volunteerService: VolunteerService) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.group = this.route.snapshot.data['group']
    this.childGroups = this.route.snapshot.data['childGroups']

    this.volunteerId = this.authService.getUserId()

    if (this.group)
      this.groupService.getAccountingBooks(this.group.id).subscribe(apiAccountingBooks => {
        this.accountingBooks = apiAccountingBooks
      })
  }
  isOwner(): boolean {
    return this.group?.owner.id === this.volunteerId
  }
  loadMembers() {
    this.members = undefined
    if (this.group !== undefined) {
      this.groupService.getMembers(this.group.id).subscribe(apiMembers => {
        this.members = apiMembers
        this.membersHidden = false
      })
    }
  }
  hideMembers() {
    this.membersHidden = true
  }
  showMembers() {
    if (this.members === null)
      this.loadMembers()
    this.membersHidden = false
  }

  loadProjects() {
    this.projects = undefined
    if (this.group !== undefined) {
      this.groupService.getProjects(this.group.id).subscribe(apiProjects => {
        this.projects = apiProjects
        this.projectsHidden = false
      })
    }
  }
  hideProjects() {
    this.projectsHidden = true
  }
  showProjects() {
    if (this.projects === null)
      this.loadProjects()
    this.projectsHidden = false
  }

  getLatestAccBook(): ISimpleAccountingBook | undefined {
    return this.accountingBooks?.filter(b => b.locked === false).sort((b1, b2) => {
      if (b1.bookId > b2.bookId)
        return 1
      else if (b1.bookId === b2.bookId) {
        if (b1.bookOrderNumberId > b2.bookOrderNumberId)
          return 1
        else if (b1.bookOrderNumberId < b2.bookOrderNumberId)
          return -1
        else
          return 0
      }
      else
        return -1
    }).reverse()[0]
  }

  openAccountingBooksModal(): void {
    this.modalService.show(AccountingBooksListComponentModal, { initialState: { groupId: this.group?.id } })
  }
  openAddGroupModal(): void {
    if (this.volunteerId) {
      const modalRef = this.modalService.show(GroupAddModalComponent, {
        initialState: {
          groupToCreate: {
            ownerId: this.volunteerId,
            description: undefined,
            name: undefined,
            parentGroupId: this.group?.id
          }
        }
      })

      modalRef.onHidden?.subscribe(() => {
        if (this.group?.id)
          this.groupService.getChaildGroups(this.group?.id).subscribe(groups => {
            this.childGroups = groups
          })
      })
    }
  }

  openAddAccountingBookModal(): void {
    if (this.volunteerId) {
      const modalRef = this.modalService.show(AccountingBookAddModalComponent, {
        initialState: {
          bookToCreate: {
            relatedGroupId: this.group?.id,
            bookId: this.group?.id,
            bookOrderNumberId: undefined,
            locked: false,
            name: undefined
          }
        }
      })
      modalRef.onHidden?.subscribe(() => {
        if (this.group)
          this.groupService.getAccountingBooks(this.group.id).subscribe(apiAccountingBooks => {
            this.accountingBooks = apiAccountingBooks
          })
      })
    }
  }

  openAddProjectModal(): void {
    if (this.volunteerId) {
      const modalRef = this.modalService.show(ProjectAddModalComponent, {
        initialState: {
          projectToCreate: {
            parentGroupId: this.group?.id,
            name: undefined,
            description: undefined,
            active: true,
            beginDate: undefined,
            endDate: undefined,
            independent: false,
            ownerId: this.volunteerId
          }
        }
      })

      modalRef.onHidden?.subscribe(() => {
        if (this.group?.id)
          this.loadProjects()
      })
    }
  }
}
