import { NgModule } from '@angular/core';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectRoutes } from './project.routes';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ProjectDetailsComponent,
    ProjectListComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(ProjectRoutes),
    ModalModule.forRoot(),
    CollapseModule.forRoot()
  ],
  providers: [
    
  ]
})
export class ProjectsModule { }
