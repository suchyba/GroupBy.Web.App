import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
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
    styleUrls: ['./group-details.component.css'],
    standalone: false
})
export class GroupDetailsComponent implements OnInit {
  @Input() group: IGroup | undefined
  @Input() childGroups: ISimpleGroup[] | undefined
  @Input() volunteerId: string | undefined
  @Input() accountingBooks: ISimpleAccountingBook[] | undefined

  @Input() members: ISimpleVolunteer[] | undefined | null = null
  public membersHidden: boolean = true;

  @Input() projects: ISimpleProject[] | undefined | null = null
  public projectsHidden: boolean = true;

  public editOwner = false
  public newOwner?: string
  public newOwnerLoading = false

  constructor(
    private route: ActivatedRoute,
    private groupService: GroupService,
    private modalService: NgbModal,
    private authService: AuthService,
    private volunteerService: VolunteerService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.group = data['group']
      this.childGroups = data['childGroups']
      this.reloadAccountingBooks();
      this.loadProjects()
      this.loadMembers()
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
      if (b1.bookIdentificator > b2.bookIdentificator)
        return 1
      else if (b1.bookIdentificator === b2.bookIdentificator) {
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
    const modalRef = this.modalService.open(AccountingBookListComponentModal, { size: 'lg' })
    modalRef.componentInstance.groupId = this.group?.id
    modalRef.closed.subscribe(() => this.reloadAccountingBooks())
  }

  openAddGroupModal(): void {
    if (this.volunteerId) {
      const modalRef = this.modalService.open(GroupAddModalComponent, { size: 'lg' })
      modalRef.componentInstance.groupToCreate = {
        ownerId: this.volunteerId,
        description: undefined,
        name: undefined,
        parentGroupId: this.group?.id
      }
      modalRef.closed.subscribe(() => {
        if (this.group?.id)
          this.groupService.getChildGroups(this.group?.id).subscribe(groups => {
            this.childGroups = groups
          })
      })
    }
  }

  openAddAccountingBookModal(): void {
    if (this.volunteerId) {
      const modalRef = this.modalService.open(AccountingBookAddModalComponent, { size: 'lg' })
      modalRef.componentInstance.bookToCreate = {
        relatedGroupId: this.group?.id,
        bookIdentificator: undefined,
        bookOrderNumberId: undefined,
        locked: false,
        name: undefined
      }
      modalRef.closed.subscribe(() => this.reloadAccountingBooks())
    }
  }

  openAddProjectModal(): void {
    if (this.volunteerId) {
      const modalRef = this.modalService.open(ProjectAddModalComponent, { size: 'lg' })
      modalRef.componentInstance.projectToCreate = {
        parentGroupId: this.group?.id,
        name: undefined,
        description: undefined,
        active: true,
        beginDate: undefined,
        endDate: undefined,
        independent: false,
        ownerId: this.volunteerId
      }
      modalRef.closed.subscribe(() => {
        if (this.group?.id)
          this.loadProjects()
      })
    }
  }

  openAddMemebersModal(): void {
    if (this.group) {
      const modalRef = this.modalService.open(AddMemberModalComponent, { size: 'lg' })
      modalRef.componentInstance.groupId = this.group.id
      modalRef.componentInstance.volunteerAddedEvent?.subscribe((vid: string) => {
        this.loadMembers()
      })
    }
  }

  openAddInventoryBookModal(): void {
    if (this.group) {
      const modalRef = this.modalService.open(InventoryBookAddModalComponent, { size: 'lg' })
      modalRef.componentInstance.bookToCreate = {
        name: '',
        relatedGroupId: this.group.id
      }
      modalRef.componentInstance.group = {
        id: this.group.id,
        name: this.group.name,
        description: this.group.description,
        hasInventoryBook: this.group.inventoryBook !== null
      }
      modalRef.componentInstance.bookCreatedEvent?.subscribe((createdBook: any) => {
        if (this.group)
          this.group.inventoryBook = createdBook
        modalRef.componentInstance.bookCreatedEvent?.unsubscribe()
      })
    }
  }

  onProjectDeleted(): void {
    this.loadProjects()
  }

  onChildGroupDeleted(): void {
    if (this.group)
      this.groupService.getChildGroups(this.group.id).subscribe(apiGroups => {
        this.childGroups = apiGroups
      })
  }

  onInventoryBookDeleted(): void {
    if (this.group) {
      this.group.inventoryBook = undefined
    }
  }

  editOwnerClick() {
    this.editOwner = !this.editOwner
    this.loadMembers()
  }

  confirmEditOwnerClick() {
    if (this.group && this.newOwner) {

      this.newOwnerLoading = true

      this.groupService.updateGroup({
        id: this.group.id,
        name: this.group.name,
        description: this.group.description,
        ownerId: this.newOwner
      }).subscribe(g => {
        this.group = g
        this.newOwnerLoading = false

        window.location.reload()
        this.toastrService.success("Successfully changed owner of the group")
      })
    }

  }
}
