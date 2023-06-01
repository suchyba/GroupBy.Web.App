import { Routes } from "@angular/router";
import { AccountingBookDetailsComponent } from "./accounting-book-details/accounting-book-details.component";
import { AccountingBookDetailsResolver } from "./accounting-book-details/accounting-book-details.resolver";

export const AccountingBooksRoutes: Routes = [
    { path: ':id', component: AccountingBookDetailsComponent, resolve: { accountingBook: AccountingBookDetailsResolver } }
]