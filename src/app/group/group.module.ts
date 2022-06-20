import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GroupRoutes } from './group.routes';
import { GroupDetailsComponent } from './group-details/group-details.component';
import { GroupListComponent as GroupListComponent } from './group-list/group-list.component';
import { GroupListResolver as GroupListResolver } from './group-list/group-list.resolver';
import { GroupDetailsResolver } from './group-details/group-details.resolver';
import { ChildGroupsResolver } from './group-details/child-groups.resolver';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from '../shared/shared.module';
import { AccountingBookListComponentModal } from './group-details/accounting-book-list-modal/accounting-book-list-modal.component';
import { AddMemberModalComponent } from './group-details/add-member-modal/add-member-modal.component';

@NgModule({
  declarations: [
    GroupListComponent,
    GroupDetailsComponent,
    AccountingBookListComponentModal,
    AddMemberModalComponent
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
