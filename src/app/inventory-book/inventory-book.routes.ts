import { Routes } from "@angular/router";
import { InventoryBookDetailsComponent } from "./inventory-book-details/inventory-book-details.component";
import { InventoryBookDetailsResolver } from "./inventory-book-details/inventory-book-details.resolver";

export const InventoryBookRoutes: Routes = [
    {
        path: ':id',
        component: InventoryBookDetailsComponent,
        resolve: { inventoryBook: InventoryBookDetailsResolver}
    }
] 