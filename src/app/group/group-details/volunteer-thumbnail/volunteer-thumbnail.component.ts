import { Component, Input, OnInit } from '@angular/core';
import { ISimpleVolunteer } from 'src/app/shared/models/volunteer/volunteer-simple.model';

@Component({
  selector: 'group-volunteer-thumbnail',
  templateUrl: './volunteer-thumbnail.component.html',
  styleUrls: ['./volunteer-thumbnail.component.css']
})
export class VolunteerThumbnailComponent implements OnInit {
  @Input() volunteer: ISimpleVolunteer | undefined
  @Input() canRemove: boolean | undefined
  constructor() { }

  ngOnInit(): void {
  }

}
