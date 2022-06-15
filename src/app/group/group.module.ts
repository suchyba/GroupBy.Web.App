import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GroupRoutes } from './group.routes';
import { GroupDetailsComponent } from './group-details/group-details.component';
import { GroupListComponent as GroupListComponent } from './group-list/group-list.component';
import { GroupListResolver as GroupListResolver } from './group-list/group-list.resolver';
import { GroupDetailsResolver } from './group-details/group-details.resolver';
import { ProjectThumbnailComponent } from './group-details/project-thumbnail/project-thumbnail.component';
import { InventoryBookThumbnailComponent } from './group-details/inventory-book-thumbnail/inventory-book-thumbnail.component';
import { VolunteerThumbnailComponent } from './group-details/volunteer-thumbnail/volunteer-thumbnail.component';
import { ChildGroupsResolver } from './group-details/child-groups.resolver';
import { AccountingBookListComponentModal as AccountingBookListComponentModal } from './group-details/accounting-book-list-modal/accounting-book-list-modal.component';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';
import { GroupThumbnailComponent } from './group-list/group-thumbnail/group-thumbnail.component';
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
