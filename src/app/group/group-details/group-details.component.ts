import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/core/auth/auth.service';
import { AccountingBookAddModalComponent } from 'src/app/shared/components/modals/accounting-book-add-modal/accounting-book-add-modal.component';
import { GroupAddModalComponent } from 'src/app/shared/components/modals/group-add-modal/group-add-modal.component';
import { InventoryBookAddModalComponent } from 'src/app/shared/components/modals/inventory-book-add-modal/inventory-book-add-modal.component';
import { ProjectAddModalComponent } from 'src/app/shared/components/modals/project-add-modal/project-add-modal.component';
import { ISimpleAccountingBook } from 'src/app/shared/models/accounting-book/accounting-book-simple.model';
import { ISimpleGroup } from 'src/app/shared/models/group/group-simple.model';
import { IGroup } from 'src/app/shared/models/group/group.model';
import { ISimpleProject } from 'src/app/shared/models/project/project-simple.model';
import { ISimpleVolunteer } from 'src/app/shared/models/volunteer/volunteer-simple.model';
import { GroupService } from 'src/app/shared/services/group.service';
import { VolunteerService } from 'src/app/shared/services/volunteer.service';
import { AccountingBookListComponentModal } from '../group-details/accounting-book-list-modal/accounting-book-list-modal.component';
import { AddMemberModalComponent } from './add-member-modal/add-member-modal.component';

@Component({
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.css']
})
export class GroupDetailsComponent implements OnInit {
  @Input() group: IGroup | undefined
  @Input() childGroups: ISimpleGroup[] | undefined
  @Input() volunteerId: number | undefined
  @Input() accountingBooks: ISimpleAccountingBook[] | undefined

  @Input() members: ISimpleVolunteer[] | undefined | null = null
  public membersHidden: boolean = true;

  @Input() projects: ISimpleProject[] | undefined | null = null
  public projectsHidden: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private groupService: GroupService,
    private modalService: BsModalService,
    private authService: AuthService,
    private volunteerService: VolunteerService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.group = data['group']
      this.childGroups = data['childGroups']
      this.reloadAccountingBooks();
    })

    this.volunteerId = this.authService.getUserId()
  }

  private reloadAccountingBooks() {
    if (this.group)
      this.groupService.getAccountingBooks(this.group.id).subscribe(apiAccountingBooks => {
        this.accountingBooks = apiAccountingBooks;
      });
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
    const modalRef = this.modalService.show(AccountingBookListComponentModal, { initialState: { groupId: this.group?.id } })

    modalRef.onHidden?.subscribe(() => this.reloadAccountingBooks())
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
      modalRef.onHidden?.subscribe(() => this.reloadAccountingBooks())
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

  openAddMemebersModal(): void {
    if (this.group) {
      const modalRef = this.modalService.show(AddMemberModalComponent, {
        initialState: {
          groupId: this.group.id
        }
      })
      modalRef.content?.volunteerAddedEvent.subscribe(vid => {
        this.loadMembers()
      })
    }
  }

  openAddInventoryBookModal(): void {
    if (this.group) {
      const modalRef = this.modalService.show(InventoryBookAddModalComponent, {
        initialState: {
          bookToCreate: {
            name: '',
            relatedGroupId: this.group.id
          },
          group: this.group
        }
      })

      modalRef.content?.bookCreatedEvent.subscribe(createdBook => {
        if (this.group)
          this.group.inventoryBook = createdBook
          
        modalRef.content?.bookCreatedEvent.unsubscribe()
      })
    }
  }

  onProjectDeleted(): void {
    this.loadProjects()
  }

  onChildGroupDeleted(): void {
    if (this.group)
      this.groupService.getChaildGroups(this.group.id).subscribe(apiGroups => {
        this.childGroups = apiGroups
      })
  }

  onInventoryBookDeleted(): void {
    if (this.group) {
      this.group.inventoryBook = undefined
    }
  }
}
