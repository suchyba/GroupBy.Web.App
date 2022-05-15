import { Routes } from "@angular/router";
import { LoginComponent } from "./authentication/login/login.component";
import { RegisterComponent } from "./authentication/register/register.component";
import { AuthGuard } from "./shared/auth/auth.guard";

export const appRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'groups',
        loadChildren: () => import('./groups/groups.module')
            .then(m => m.GroupsModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'accountingBooks',
        loadChildren: () => import('./accouting-books/accounting-books.module')
            .then(m => m.AccountingBooksModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'projects',
        loadChildren: () => import('./projects/projects.module')
            .then(m => m.ProjectsModule),
        canActivate: [AuthGuard]
    },
    {
        path: '',
        redirectTo: 'groups',
        pathMatch: 'full'
    },
    { path: '**', redirectTo: '' }
]