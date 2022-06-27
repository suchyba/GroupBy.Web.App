import { Routes } from "@angular/router";
import { LoginComponent } from "./authentication/login/login.component";
import { RegisterComponent } from "./authentication/register/register.component";
import { AuthGuard } from "./shared/auth/auth.guard";

export const appRoutes: Routes = [
    {
        path: 'groups',
        loadChildren: () => import('./group/group.module')
            .then(m => m.GroupModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'accountingBooks',
        loadChildren: () => import('./accouting-book/accounting-book.module')
            .then(m => m.AccountingBookModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'projects',
        loadChildren: () => import('./project/project.module')
            .then(m => m.ProjectsModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'inventoryBooks',
        loadChildren: () => import(`./inventory-book/inventory-book.module`)
            .then(m => m.InventoryBookModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'auth',
        loadChildren: () => import('./authentication/authentication.module')
            .then(m => m.AuthenticationModule)
    },
    {
        path: '',
        redirectTo: 'groups',
        pathMatch: 'full'
    },
    { path: '**', redirectTo: '' }
]