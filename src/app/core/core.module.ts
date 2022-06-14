import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";

import { AuthService } from "./auth/auth.service";
import { ErrorInterceptor } from "./errors/error.interceptor";
import { NavComponent } from "./nav/nav.component";
import { RouterModule } from "@angular/router";
import { AuthInterceptor } from "./auth/auth.interceptor";

@NgModule({
    imports: [CommonModule, RouterModule],
    exports: [NavComponent],
    declarations: [
        NavComponent
    ],
    providers: [
        AuthService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ]
})
export class CoreModule { };