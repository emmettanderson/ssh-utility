import { Component, OnChanges, Input, OnInit, ViewChild, ElementRef, Inject, SimpleChange } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSpinner } from '@angular/material';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-deploy-modal',
  templateUrl: './deploy-modal.component.html',
  styleUrls: ['./deploy-modal.component.css']
})
export class DeployModalComponent implements OnInit {

  // @Input('deployUrl') deployUrl: any;
  // @ViewChild('deployModal', {static: false}) deployModal: ElementRef;

  // public modalDialogRef: MatDialogRef<DeployModalComponent>;
  showModal: boolean;
  deployUrl: any;
  urlSafe: SafeResourceUrl;
  target: string;

  constructor(
    public modalDialogRef: MatDialogRef<DeployModalComponent>,
    public modalDialog: MatDialog,
    public sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.deployUrl = data.deployUrl;
    this.target = data.target;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.deployUrl);
  }
  ngOnInit(){}
  /*
  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    if (changes['deployUrl']) {
      this.deployUrl = changes['deployUrl'].currentValue;
    }
  }
  */
  onNoClick(): void {
    this.modalDialogRef.close();
  }
}
