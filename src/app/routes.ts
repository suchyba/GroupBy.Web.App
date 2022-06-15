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
        loadChildren: () => import('./group/group.module')
            .then(m => m.GroupModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'accountingBooks',
        loadChildren: () => import('./accouting-book/accounting-book.module')
            .then(m => m.AccountingBooksModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'projects',
        loadChildren: () => import('./project/project.module')
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