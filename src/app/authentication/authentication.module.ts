import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CoreModule } from "../core/core.module";
import { SharedModule } from "../shared/shared.module";
import { authRoutes } from "./authRoutes";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(authRoutes)
    ],
    declarations: [
        LoginComponent,
        RegisterComponent
    ]
})
export class AuthenticationModule { }