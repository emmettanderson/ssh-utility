import { Component, OnInit, ViewEncapsulation, EventEmitter, OnChanges, SimpleChange, Input, Output } from '@angular/core';
import { TargetListService } from '../api/target-list.service';
/*
import { TargetGroupList, TargetList} from '../models/target-list.model';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatPaginator, MatSort, MatList} from '@angular/material';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import { FormGroupName } from '@angular/forms';
*/

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

    // tslint:disable-next-line:forin
    for (const propName in changes) {
      const changedProp = changes[propName];
      const to = JSON.stringify(changedProp.currentValue);
      if (changedProp.isFirstChange()) {
        log.push('Initial value of ' + propName + ' set to ' + to);
      } else {
        const from = JSON.stringify(changedProp.previousValue);
        log.push(propName + ' changed from ' + from + ' to ' +  to);
      }
    }
    this.changeLog.push(log.join(', '));
    console.log('change log: ' + this.changeLog.toString());
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
    // console.log('getTargetList targets array: ' + this.targets);
    const targetlist = document.getElementById('targetlistdiv');
    targetlist.style.display = 'inline';
  }
}
