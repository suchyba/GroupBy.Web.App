import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModalModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { AccountRoutes } from './account.routes';
import { ManageAccountComponent } from './manage-account/manage-account.component';
import { ClipboardModule } from '@angular/cdk/clipboard';




@NgModule({
  declarations: [
    ManageAccountComponent
  ],
  imports: [
    RouterModule.forChild(AccountRoutes),
    SharedModule,
    ClipboardModule,
    NgbModalModule,
    NgbPopoverModule
  ]
})
export class AccountModuleModule { }
