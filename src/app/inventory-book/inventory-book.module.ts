import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { SharedModule } from '../shared/shared.module';
import { InventoryBookDetailsComponent } from './inventory-book-details/inventory-book-details.component';
import { InventoryBookDetailsResolver } from './inventory-book-details/inventory-book-details.resolver';
import { InventoryBookRoutes } from './inventory-book.routes';


@NgModule({
  declarations: [
    InventoryBookDetailsComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(InventoryBookRoutes),
    ModalModule.forRoot(),
    TooltipModule.forRoot()
  ],
  providers: [
    InventoryBookDetailsResolver
  ]
})
export class InventoryBookModule { }
