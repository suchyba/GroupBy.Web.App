import { Routes } from "@angular/router";
import { ChildGroupsResolver } from "./group-details/child-groups.resolver";
import { GroupDetailsComponent } from "./group-details/group-details.component";
import { GroupDetailsResolver } from "./group-details/group-details.resolver";
import { GroupsListComponent } from "./groups-list/groups-list.component";
import { GroupsListResolver } from "./groups-list/groups-list.resolver";

export const GroupRoutes: Routes = [
    { path: 'list', component: GroupsListComponent, resolve: { groups: GroupsListResolver } },
    { path: ':id', component: GroupDetailsComponent, resolve: { group: GroupDetailsResolver, childGroups: ChildGroupsResolver } },

    { path: '', redirectTo: 'list', pathMatch: 'full' }
]