import { Component, Inject, EventEmitter, OnInit, ChangeDetectionStrategy} from '@angular/core';
import { ViewChild, SimpleChange, OnChanges, ElementRef, Input, Output } from '@angular/core';
import { OutputDisplayService } from '../api/output-display.service';
import { SessionLog } from '../models/submit.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSpinner } from '@angular/material';

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
  @Input() submitted: any;
  @Input() SessionLog: SessionLog;
  @Input() SessionLogText: any;
  @Input() ProcessComplete: any;
  @Input() interval: any;
  @Output() sendDataToParent = new EventEmitter<any>();

  @ViewChild('sessionlog') sessionlog: ElementRef;
  @ViewChild('sessionlogdiv') sessionlogdiv: ElementRef;
  @ViewChild('spinner') spinner: ElementRef;

  public modalDialogRef: MatDialogRef<OutputDisplayModalComponent>;
  public showModal: boolean;

  constructor(
    private _outputDisplayService: OutputDisplayService,
    public modalDialog: MatDialog
  ) {
    this.SessionLog = {'SessionLog': 'Init', 'ProcessComplete': '-1'};
    this.LogRowId = '';
    this.interval = '';
  }

  openModalDialog(): void {
    this.showModal = true;
    this.modalDialogRef = this.modalDialog.open(OutputDisplayModalComponent, {
      width: '800px',
      height: '85%',
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
      }, 5000);
      if (this.submitted && this.submitted !== '') {
        setTimeout(() => {
          this.openModalDialog();
          this.spinner.nativeElement.style.display = '';
        }, 100);
      }
    }
  }

  scrollToBottom() {
    this.sessionlogdiv.nativeElement.focus();
    this.sessionlogdiv.nativeElement.scrollTop = this.sessionlogdiv.nativeElement.scrollHeight;
    if (this.showModal && this.modalDialogRef && this.modalDialogRef.componentInstance) {
      this.modalDialogRef.componentInstance.scrollToBottom();
    }
  }
  checkStatus(sessionLog, intervalId) {
    // Check if process is complete
    if (sessionLog && typeof sessionLog !== 'undefined') {
      if (sessionLog.ProcessComplete !== '0') {
        this.spinner.nativeElement.style.display = 'none';
        if (intervalId) {
          clearInterval(intervalId);
        }
      }
    } else {
      if (intervalId) {
        this.spinner.nativeElement.style.display = 'inline-block';
        clearInterval(intervalId);
      }
    }
  }

  updateSessionLog(LogRowId) {
    if (LogRowId && typeof LogRowId !== 'undefined') {
      this._outputDisplayService.getSessionLog(LogRowId)
        .subscribe(data => {
          this.SessionLog = data;
          if (this.showModal && this.modalDialogRef) {
            this.modalDialogRef.componentInstance.data = {
              SessionLogText: this.SessionLog.SessionLog
            };
            if (data.ProcessComplete === '1') {
              this.modalDialogRef.componentInstance.spinner.nativeElement.style.display = 'none';
            } else {
              this.modalDialogRef.componentInstance.spinner.nativeElement.style.display = 'inline-block';
            }
          }
          this.sendDataToParent.emit(this);
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

  @Input('SessionLogText') SessionLogText: any;
  @ViewChild('spinner') spinner: ElementRef;
  @ViewChild('sessionlogmodal') sessionLogModal: ElementRef;

  constructor(
    public modalDialogRef: MatDialogRef<OutputDisplayModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.SessionLogText = data.SessionLogText;
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    this.scrollToBottom();
    if (changes['SessionLogText']) {
      this.SessionLogText = changes['SessionLogText'].currentValue;
    }
  }
  scrollToBottom() {
    if (this.sessionLogModal && this.sessionLogModal.nativeElement) {
      this.sessionLogModal.nativeElement.scrollTop = this.sessionLogModal.nativeElement.scrollHeight;
    }
  }
  onNoClick(): void {
    this.modalDialogRef.close();
  }
}
