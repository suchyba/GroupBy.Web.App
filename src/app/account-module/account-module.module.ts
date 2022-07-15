import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from '../shared/shared.module';
import { AccountRoutes } from './account.routes';
import { ManageAccountComponent } from './manage-account/manage-account.component';



@NgModule({
  declarations: [
    ManageAccountComponent
  ],
  imports: [
    RouterModule.forChild(AccountRoutes),
    SharedModule,
    ModalModule.forRoot()
  ]
})
export class AccountModuleModule { }
