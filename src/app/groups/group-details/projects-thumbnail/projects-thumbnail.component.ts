import { Component, Input, OnInit } from '@angular/core';
import { ISimpleProject } from 'src/app/shared/models/project/project-simple.model';

@Component({
  selector: 'app-projects-thumbnail',
  templateUrl: './projects-thumbnail.component.html',
  styleUrls: ['./projects-thumbnail.component.css']
})
export class ProjectsThumbnailComponent implements OnInit {
  @Input() project: ISimpleProject | undefined
  @Input() canRemove: boolean | undefined
  constructor() { }

  ngOnInit(): void {

  }

  calculateDaysToEnd(): number | undefined {
    if (this.project && this.project.endDate && this.project.active) {
      return Math.floor((new Date(this.project.endDate).getTime() - (new Date()).getTime()) / (1000 * 60 * 60 * 24))
    }

    return undefined
  }

  endSoon(): boolean {
    if (this.project && this.project.endDate && this.project.active) {
      let daysToEnd = this.calculateDaysToEnd()
      if (daysToEnd !== undefined)
        return daysToEnd <= 7 && daysToEnd > 0
    }

    return false
  }
  ended(): boolean {
    if (this.project && this.project.endDate && this.project.active) {
      let daysToEnd = this.calculateDaysToEnd()
      if (daysToEnd !== undefined)
        return daysToEnd < 0
    }

    return false
  }

}
