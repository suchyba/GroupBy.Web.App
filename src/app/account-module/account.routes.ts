import { Routes } from "@angular/router";
import { ManageAccountResolver } from "./manage-account/manage-account.resolver";
import { ManageAccountComponent } from "./manage-account/manage-account.component";

export const AccountRoutes: Routes = [
    {
        path: 'manage',
        component: ManageAccountComponent,
        resolve: {user: ManageAccountResolver},
        canDeactivate: []
    }
]