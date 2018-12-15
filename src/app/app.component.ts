import { Component, ChangeDetectorRef, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HistoryList } from './models/history-list';
import { CommandList } from './models/command-list.model';
import { FileList, FileArray } from './models/file-list.model';
import { SubmitService } from './api/submit.service';
import { SubmitList } from './models/submit.model';
import { Observable, Subject } from 'rxjs';

// import { MatButton } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SSH Tool';
  response: any;
  sessionLog: Observable<string>;
  public LogRowId: string;
  SessionLog: any;
  SessionLogCounter: number;
  ProcessComplete: any;
  GroupName: string;
  CommandList: string;
  SrcFileList: string;
  DestFileList: string;
  Submitted: any;

  @Input() SubmitList: SubmitList;
  @ViewChild('description') description: ElementRef;

  constructor(
    private _submitService: SubmitService
    // private _changeDetectorRef: ChangeDetectorRef
  ) {
    // this._changeDetectorRef.detectChanges();
    // event.stopPropagation();
  }
  ngOnInit() {
    this.SubmitList = new SubmitList;
  }

  eventFromChild(historylist: HistoryList[]) {
    console.log('app eventFromChild: GroupName: ' + historylist['targetGroup'] + '\nCommandList: ' + historylist['commandList']);
    console.log('app eventFromChild: destFileList: ' + historylist['destFileList']);
    // this.SubmitList = new SubmitList;
    this.SubmitList.TargetGroup = historylist['targetGroup'];
    this.SubmitList.CommandStringList = historylist['commandList'];
    this.SubmitList.SourceFileList = historylist['srcFileList'];
    this.SubmitList.DestinationFileList = historylist['destFileList'];
    this.SubmitList.Description = historylist['description'];
    this.description.nativeElement.value = historylist['description'];
  }
  updateCommandList(commandAry: string[]) {
    // const commandAry = commandList.map(command => command.CommandString);
    this.SubmitList.CommandStringList = commandAry.join('\n');
    console.log('app updateCommandList: before: ' + commandAry + '\nafter: ' + this.SubmitList.CommandStringList);
  }
  addCommand(command: string) {
    console.log('app addCommand: ' + command);
    if (this.SubmitList.CommandStringList && this.SubmitList.CommandStringList !== '') {
      this.SubmitList.CommandStringList += command + '\n';
    } else {
      this.SubmitList.CommandStringList += command;
    }
  }
  updateSessionLog(comp) {
    this.SessionLog = comp.SessionLog.SessionLog;
    this.ProcessComplete = comp.SessionLog.ProcessComplete;
    this.LogRowId = comp.LogRowId;
    console.log('updateSessionLog counter: ' + this.SessionLogCounter);
  }
  updateFileList(fileAry: FileArray) {
    this.SubmitList.SourceFileList = fileAry.srcFileAry.join('\n');
    this.SubmitList.DestinationFileList = fileAry.destFileAry.join('\n');
    console.log('app updateFileList: src: ' + this.SubmitList.SourceFileList + '\ndest: ' + this.SubmitList.DestinationFileList);
  }
  updateTargetGroup(GroupName) {
    this.SubmitList.TargetGroup = GroupName;
    console.log('app updateTargetGroup: ' + GroupName);
  }
  submit(e) {
    console.log('submit: ' + this.SubmitList);
    this.SubmitList.Description = this.description.nativeElement.value;
    this._submitService.submitList(this.SubmitList).subscribe(data => {
        this.LogRowId = data;
      });
    this.Submitted = new Date();
  }
}
