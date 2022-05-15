import { Routes } from "@angular/router";
import { ProjectDetailsComponent } from "./project-details/project-details.component";
import { ProjectDetailsResolver } from "./project-details/project-details.resolver";
import { ProjectListComponent } from "./project-list/project-list.component";
import { ProjectListResolver } from "./project-list/project-list.resolver";

export const ProjectRoutes: Routes = [
    { path: 'list', component: ProjectListComponent, resolve: { projects: ProjectListResolver } },
    { path: ':id', component: ProjectDetailsComponent, resolve: { project: ProjectDetailsResolver } },

    { path: '', redirectTo: 'list', pathMatch: 'full' }
]