import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule, inject, provideAppInitializer } from "@angular/core";

import { AuthService } from "./auth/auth.service";
import { ErrorInterceptor } from "./errors/error.interceptor";
import { NavComponent } from "./nav/nav.component";
import { RouterModule } from "@angular/router";
import { AuthInterceptor } from "./auth/auth.interceptor";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { appInitializer } from "./auth/auth.initializer";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ToastrModule.forRoot()],
    exports: [
        NavComponent,
        ToastrModule],
    declarations: [
        NavComponent
    ],
    providers: [
        AuthService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        ToastrService,
        provideAppInitializer(() => {
        const initializerFn = (appInitializer)(inject(AuthService));
        return initializerFn();
      })
    ]
})
export class CoreModule { };