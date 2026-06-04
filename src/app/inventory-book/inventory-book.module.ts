import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModalModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
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
    NgbModalModule,
    NgbTooltipModule
  ],
  providers: [
    InventoryBookDetailsResolver
  ]
})
export class InventoryBookModule { }
