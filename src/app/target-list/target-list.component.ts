import { Component, OnInit, ViewEncapsulation, EventEmitter, OnChanges, SimpleChange, Input, Output } from '@angular/core';
import { TargetListService } from '../api/target-list.service';

export interface TargetGroupListInt {
  id: number;
  GroupName: string;
}

export interface TargetListInt {
  id: number;
  HostName: string;
  HostUrl: string;
}

@Component({
  selector: 'app-target-list',
  templateUrl: './target-list.component.html',
  styleUrls: ['./target-list.component.css', '../app.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class TargetListComponent implements OnInit, OnChanges {
  Title = 'Target List';
  public targets: any = [];
  public targetgroups: any = [];
  public selectCaption = 'Select Target Environments';
  changeLog: string[] = [];

  @Input() GroupName: string;
  @Output() sendDataToParent = new EventEmitter<string>();

  constructor(
    private _targetListService: TargetListService
  ) { }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    const log: string[] = [];
    console.log('change log: ' + changes['GroupName'].currentValue);
    if (typeof changes['GroupName'].currentValue !== 'undefined') {
      this.onChangeTargetGroupHandler(changes['GroupName'].currentValue);
    }
  }

  ngOnInit() {
    console.log('getTargetGroupList');
    this.targetgroups = [];
    this._targetListService.getTargetGroupList().subscribe(Groups => {
      this.targetgroups = Groups;
    });
  }

  public onChangeTargetGroupHandler(GroupName) {
    console.log('OnChangeTargetGroupHandler GroupName: ' + GroupName);
    this.GroupName = GroupName;
    this.sendDataToParent.emit(GroupName);
    this.getTargetList(GroupName);
  }
  public closeList() {
    document.getElementById('targetlistdiv').style.display = 'none';
  }
  public getTargetList(GroupName) {
    // Get List of Locations for given HospitalCode
    // Make sure to re-init the list
    console.log('getTargetList GroupName: ' + GroupName);
    this.targets = [];
    this.selectCaption = 'Selected Environments: ';
    this._targetListService.getTargetList(GroupName).subscribe(Targets => {
      this.targets = Targets;
    });
    const targetlist = document.getElementById('targetlistdiv');
    targetlist.style.display = 'inline';
  }
}
