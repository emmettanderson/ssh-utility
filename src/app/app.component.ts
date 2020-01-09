import { Component, ChangeDetectorRef, Input, OnInit, ViewChild, ElementRef, Inject, OnChanges } from '@angular/core';

/*
import { OutputDisplayComponent } from './output-display/output-display.component';
import { FileListComponent } from './file-list/file-list.component';
import { CommandListComponent } from './command-list/command-list.component';
import { TrakLayoutComponent } from './trak-layout/trak-layout.component';
*/

import { HistoryList } from './models/history-list';
import { FileArray } from './models/file-list.model';
import { SessionLog } from './models/submit.model';
import { SubmitService } from './api/submit.service';
import { SubmitList } from './models/submit.model';
import { TargetList } from './models/target-list.model';
import { DeployModalComponent } from './deploy-modal/deploy-modal.component';

import { TargetListService } from './api/target-list.service';
import { Observable, Subject } from 'rxjs';
import { MatSelect, MatDialog, MatDialogRef } from '@angular/material';

// import { MatButton } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SSH Tool';
  response: any;
  LogRowId: string;
  SessionLog: SessionLog;
  SessionLogText: string;
  SessionLogCounter: number;
  ProcessComplete: any;
  GroupName: string;
  CommandList: string;
  SrcFileList: string;
  DestFileList: string;
  Submitted: any;
  Interval: any;
  targets: any = [];
  HostName: string;
  deployUrl: any;
  /*
  trakLayoutComponent: TrakLayoutComponent;
  fileListComponent: FileListComponent;
  commandListComponent: CommandListComponent;
  outputDisplayComponent: OutputDisplayComponent;
  */
  public modalDialogRef: MatDialogRef<DeployModalComponent>;
  public showModal: boolean;

  @Input() SubmitList: SubmitList;
  @ViewChild('description', {static: false}) description: ElementRef;
  @ViewChild('deployselect', {static: false}) deployselect: MatSelect;

  constructor(
    private _submitService: SubmitService,
    private _targetListService: TargetListService,
    public modalDialog: MatDialog
    // private _changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.SubmitList = new SubmitList;
    console.log('getDeployTargets OnInit');
    this.targets = [];
    this._targetListService.getTargetList('all').subscribe(Targets => {
      this.targets = Targets;
    });
  }

  onClickDeployTarget(target) {
    console.log('OnChangeDeployTargetHandler: ' + target.HostUrl + target.DeployPath);
    if (target.DeployPath === '') {
      alert(target.HostName + ': No Deploy Path Configured.');
      return false;
    }
    this.deployUrl = 'https://' + target.HostUrl + target.DeployPath;
    this.showModal = true;
    this.modalDialogRef = this.modalDialog.open(DeployModalComponent, {
        width: '800px',
        height: '85%',
        data: {deployUrl: this.deployUrl, target: target.HostName}
      })
  }

  eventFromChild(historylist: HistoryList[]) {
    console.log('app eventFromChild: GroupName: ' + historylist['TargetGroup'] + '\nCommandList: ' + historylist['commandList']);
    console.log('app eventFromChild: DestinationFileList: ' + historylist['DestinationFileList']);

    for (const prop in historylist) {
      if (typeof historylist[prop] !== 'undefined') {
        this.SubmitList[prop] = historylist[prop];
      }
    }
    this.description.nativeElement.value = historylist['Description'];
    this.LogRowId = historylist['RowId'];
    this.ProcessComplete = '1';
    this.Submitted = '';
  }
  updateLogRowId(input) {
    this.ProcessComplete = '0';
    this.SessionLog = new SessionLog;
    this.SessionLog.ProcessComplete = '0';
    this.SessionLog.SessionLog = '';
    this.Interval = '';
    this.LogRowId = input;
    this.Submitted = new Date();
    console.log('app updateLogRowId: ' + input);
  }

  updateApplyTrakLayout(input) {
    this.addCommand(input.command);  // need to pass command as string
    this.addFiles(input.srcFile, input.destFile);
  }
  updateCommandList(commandAry: string[]) {
    this.SubmitList.CommandStringList = commandAry.join('\n');
    console.log('app updateCommandList: before: ' + commandAry + '\nafter: ' + this.SubmitList.CommandStringList);
  }
  addCommand(command: string) {
    console.log('app addCommand: ' + command);
    if (this.SubmitList.CommandStringList && this.SubmitList.CommandStringList !== '') {
      this.SubmitList.CommandStringList += command + '\n';
    } else {
      this.SubmitList.CommandStringList = command;
    }
  }
  updateFileList(fileAry: FileArray) {
    this.SubmitList.SourceFileList = fileAry.srcFileAry.join('\n');
    this.SubmitList.DestinationFileList = fileAry.destFileAry.join('\n');
    console.log('app updateFileList: src: ' + this.SubmitList.SourceFileList + '\ndest: ' + this.SubmitList.DestinationFileList);
  }
  addFiles(srcFile: string, destFile: string) {
    console.log('app addFile: ' + srcFile + '\n' + destFile);
    if (this.SubmitList.SourceFileList && this.SubmitList.SourceFileList !== '') {
      this.SubmitList.SourceFileList += srcFile + '\n';
      this.SubmitList.DestinationFileList += destFile + '\n';
    } else {
      this.SubmitList.SourceFileList = srcFile;
      this.SubmitList.DestinationFileList = destFile;
    }
  }
  updateSessionLog(comp) {
    this.SessionLogText = comp.SessionLog.SessionLog;
    this.ProcessComplete = comp.SessionLog.ProcessComplete;
    this.LogRowId = comp.LogRowId;
    this.Interval = comp.interval;
  }

  updateTargetGroup(GroupName) {
    this.SubmitList.TargetGroup = GroupName;
    console.log('app updateTargetGroup: ' + GroupName);
  }
  clearForm() {
    window.location.reload();
    /*
    this.SubmitList = new SubmitList;
    this.SessionLog = new SessionLog;
    this.trakLayoutComponent.ngOnInit();
    this.fileListComponent.ngOnInit();
    this.commandListComponent.ngOnInit();
    this.outputDisplayComponent.ngOnInit();
    this.GroupName = '';
    this.CommandList = '';
    this.SrcFileList = '';
    this.DestFileList = '';
    this.SessionLogText = '';
    this.LogRowId = '';
    this.Submitted = '';
    this.description.nativeElement.value = '';
    */
  }

  submit(e) {
    console.log('submit: ' + this.SubmitList);
    this.ProcessComplete = '0';
    this.SessionLog = new SessionLog;
    this.SessionLog.ProcessComplete = '0';
    this.SessionLog.SessionLog = '';
    this.Interval = '';
    this.LogRowId = '';
    this.SubmitList.Description = this.description.nativeElement.value;
    this._submitService.submitList(this.SubmitList).subscribe(data => {
        this.LogRowId = data.LogRowId;
      });
    this.Submitted = new Date();
  }
}




