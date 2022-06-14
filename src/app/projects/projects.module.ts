import { NgModule } from '@angular/core';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectRoutes } from './projects.routes';
import { RouterModule } from '@angular/router';
import { GroupThumbnailComponent } from './project-details/group-thumbnail/group-thumbnail.component';
import { VolunteerThumbnailComponent } from './project-details/volunteers-thumbnail/volunteers-thumbnail.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ProjectDetailsComponent,
    ProjectListComponent,
    GroupThumbnailComponent,
    VolunteerThumbnailComponent
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
