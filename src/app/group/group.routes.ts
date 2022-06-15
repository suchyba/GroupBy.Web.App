import { Routes } from "@angular/router";
import { ChildGroupsResolver } from "./group-details/child-groups.resolver";
import { GroupDetailsComponent } from "./group-details/group-details.component";
import { GroupDetailsResolver } from "./group-details/group-details.resolver";
import { GroupListComponent } from "./group-list/group-list.component";
import { GroupListResolver } from "./group-list/group-list.resolver";

export const GroupRoutes: Routes = [
    { path: 'list', component: GroupListComponent, resolve: { groups: GroupListResolver } },
    { path: ':id', component: GroupDetailsComponent, resolve: { group: GroupDetailsResolver, childGroups: ChildGroupsResolver } },

    { path: '', redirectTo: 'list', pathMatch: 'full' }
]