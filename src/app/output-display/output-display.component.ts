import { Component, Inject, EventEmitter, OnInit, ChangeDetectionStrategy} from '@angular/core';
import { ViewChild, SimpleChange, OnChanges, ElementRef, Input, Output } from '@angular/core';
import { OutputDisplayService } from '../api/output-display.service';
import { SessionLog } from '../models/submit.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface SessionLogInt {
  ProcessComplete: number | string;
  SessionLog: any;
}

export interface SessionLogModalInt {
  SessionLogText: any;
}

@Component({
  selector: 'app-output-display',
  templateUrl: './output-display.component.html',
  styleUrls: ['./output-display.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OutputDisplayComponent implements OnInit, OnChanges {
  @Input() LogRowId: string;
  @Input() SessionLog: SessionLog;
  @Input() SessionLogText: any;
  @Input() ProcessComplete: any;
  @Input() interval: any;
  @Input('sessionLog') sessionLog;

  @Output() sendDataToParent = new EventEmitter<any>();
  @Output() sendDataToChild = new EventEmitter<any>();
  @ViewChild('sessionlog') sessionlog: ElementRef;
  @ViewChild('sessionlogdiv') sessionlogdiv: ElementRef;

  public showModal: boolean;

  constructor(
    private _outputDisplayService: OutputDisplayService,
    public dialog: MatDialog
  ) {
    this.SessionLog = {'SessionLog': 'Init', 'ProcessComplete': '-1'};
    this.LogRowId = '';  // {'LogRowId': ''};
    this.interval = '';
  }

  openModalDialog(): void {
    this.showModal = true;
    this.dialog.open(OutputDisplayModalComponent, {
      width: '800px',
      height: '400px',
      data: {SessionLogText: this.SessionLogText}
    });
  }

  ngOnChanges() {
    if (this.LogRowId && (this.interval === '')) {
      this.interval = setInterval(() => {
        this.updateSessionLog(this.LogRowId);
        this.checkStatus(this.SessionLog, this.interval);
        this.scrollToBottom();
        console.log('updateSessionLog SessionLog: ' + this.SessionLog.ProcessComplete);
      }, 1000);
    }
  }

  scrollToBottom() {
    this.sessionlogdiv.nativeElement.scrollTop = this.sessionlogdiv.nativeElement.scrollHeight;
  }
  checkStatus(sessionLog, intervalId) {
    // Check if process is complete
    if (sessionLog && typeof sessionLog !== 'undefined') {
      if (sessionLog.ProcessComplete !== '0') {
        if (intervalId) {
          clearInterval(intervalId);
        }
      }
    } else {
      if (intervalId) {
        clearInterval(intervalId);
      }
    }
  }

  updateSessionLog(LogRowId) {
    if (LogRowId && typeof LogRowId !== 'undefined') {
      this._outputDisplayService.getSessionLog(LogRowId)
        .subscribe(data => {
          this.SessionLog = data;
          this.sendDataToParent.emit(this);
          if (this.showModal) {
            this.sendDataToChild.emit(this.SessionLogText);
          }
          console.log('output display service data: ', data);
      });
    }
    console.log('updateSessionLog SessionLog: ' + this.SessionLog);
  }

  updateModalComponent(SessionLogText) {
    this.SessionLogText = SessionLogText;
  }
  ngOnInit() {
    this.SessionLog = {'SessionLog': '', 'ProcessComplete': '-1'};
    this.LogRowId = '';    // {'LogRowId': ''};
    this.interval = '';
  }
}

@Component({
  selector: 'app-output-display-modal',
  templateUrl: './output-display-modal.component.html'
})
export class OutputDisplayModalComponent implements OnChanges {
  // ProcessComplete: number | string;
  // SessionLog: string;

  @Input() SessionLogText: any;
  constructor(
    public modalDialogRef: MatDialogRef<OutputDisplayModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SessionLogModalInt
  ) {}

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    if (changes['SessionLogText']) {
      this.SessionLogText = changes['SessionLogText'].currentValue;
    }
  }

  onNoClick(): void {
    this.modalDialogRef.close();
  }
}
