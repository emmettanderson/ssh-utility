import { Component, OnChanges, Input, OnInit, ViewChild, ElementRef, Inject, SimpleChange } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSpinner } from '@angular/material';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SessionTokenService } from '../api/session-token.service';
import { SessionToken } from '../models/session-token.model';

export interface SessionTokenInt {
  sessiontoken: string;
}

@Component({
  selector: 'app-deploy-modal',
  templateUrl: './deploy-modal.component.html',
  styleUrls: ['./deploy-modal.component.css']
})
export class DeployModalComponent implements OnInit, OnChanges {

  // @Input('deployUrl') deployUrl: any;
  // @ViewChild('deployModal', {static: false}) deployModal: ElementRef;
  // public modalDialogRef: MatDialogRef<DeployModalComponent>;

  showModal: boolean;
  deployUrl: any;
  urlSafe: SafeResourceUrl;
  target: string;
  sessionToken: SessionToken;


  constructor(
    public modalDialogRef: MatDialogRef<DeployModalComponent>,
    public modalDialog: MatDialog,
    public sanitizer: DomSanitizer,
    private sessionTokenService: SessionTokenService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.deployUrl = '';
    this.target = '';
    this.urlSafe = '';
    this.sessionTokenService.getSessionToken(data.target).subscribe(Token => {
      this.sessionToken = Token;
      this.updateUrl(this.sessionToken.sessiontoken, data.deployUrl, data.target);
    });
  }
  ngOnInit() {  }

  updateUrl(token, url, target) {
    this.deployUrl = url + '?CSPSHARE=1&CSPCHD=' + token;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.deployUrl);
    this.target = target;
    console.log('deploy-modal url=' + this.deployUrl + ' | this.target: ' + this.target + 'token: ' + token);
    this.modalDialogRef.componentInstance.data = {
        target: this.target,
        deployUrl: this.deployUrl,
        urlSafe: this.urlSafe
      };
  }
  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    // this.deployUrl = this.data.deployUrl;
    // this.target = this.data.target;
    console.log('deploy-modal OnChanges');
    //  url=' + this.deployUrl + ' | this.target: ' + this.target
    console.dir(changes);

    if (changes['sessionToken']) {

      /*this.deployUrl += '?CSPSHARE=1&CSPCHD=' + this.sessionToken.sessiontoken;
      this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.deployUrl);
      this.deployUrl = changes['sessionToken'].currentValue;
      */
    }
  }

  onNoClick(): void {
    this.modalDialogRef.close();
  }
}
