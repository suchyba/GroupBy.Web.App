import { Component, Input, OnInit } from '@angular/core';
import { ISimpleGroup } from 'src/app/shared/models/group/group-simple.model';

@Component({
  selector: 'app-group-thumbnail',
  templateUrl: './group-thumbnail.component.html',
  styleUrls: ['./group-thumbnail.component.css']
})
export class GroupThumbnailComponent implements OnInit {
  @Input() group: ISimpleGroup | undefined
  @Input() canRemove: boolean | undefined
  constructor() { }

  ngOnInit(): void {
  }

}
