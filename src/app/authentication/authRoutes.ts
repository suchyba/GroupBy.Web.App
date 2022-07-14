import { Routes } from "@angular/router";
import { ConfirmEmailComponent } from "./confirm-email/confirm-email.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

export const authRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'confirmEmail',
        component: ConfirmEmailComponent
    }
]