import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GroupRoutes } from './groups.routes';
import { GroupDetailsComponent } from './group-details/group-details.component';
import { GroupsListComponent as GroupListComponent } from './groups-list/groups-list.component';
import { GroupsListResolver as GroupListResolver } from './groups-list/groups-list.resolver';
import { GroupDetailsResolver } from './group-details/group-details.resolver';
import { ProjectsThumbnailComponent as ProjectThumbnailComponent } from './group-details/projects-thumbnail/projects-thumbnail.component';
import { InventoryBookThumbnailComponent } from './group-details/inventory-book-thumbnail/inventory-book-thumbnail.component';
import { VolunteerThumbnailComponent } from './group-details/volunteers-thumbnail/volunteers-thumbnail.component';
import { ChildGroupsResolver } from './group-details/child-groups.resolver';
import { AccountingBooksListComponentModal as AccountingBookListComponentModal } from './group-details/accounting-books-list-modal/accounting-books-list-modal.component';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';
import { GroupThumbnailComponent } from './groups-list/group-thumbnail/group-thumbnail.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    GroupThumbnailComponent,
    ProjectThumbnailComponent,
    InventoryBookThumbnailComponent,
    GroupListComponent,
    GroupDetailsComponent,
    VolunteerThumbnailComponent,
    AccountingBookListComponentModal
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(GroupRoutes),
    CollapseModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [
    GroupListResolver,
    GroupDetailsResolver,
    ChildGroupsResolver
  ]
})
export class GroupModule { }
