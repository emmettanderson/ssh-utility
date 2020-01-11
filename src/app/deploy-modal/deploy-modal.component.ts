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

  btnCaption: string;
  showModal: boolean;
  deployUrl: any;
  setupUrl: any;
  urlSafe: SafeResourceUrl;
  target: string;
  sessionToken: SessionToken;

  @ViewChild('deployiframe', {read: ElementRef, static: false}) deployiframe: ElementRef;
  @ViewChild('setupbutton', {read: ElementRef, static: false}) setupbutton: ElementRef;

  constructor(
    public modalDialogRef: MatDialogRef<DeployModalComponent>,
    public modalDialog: MatDialog,
    public sanitizer: DomSanitizer,
    private sessionTokenService: SessionTokenService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.btnCaption = 'Setup';
    this.deployUrl = '';
    this.target = '';
    this.setupUrl = '';
    this.urlSafe = '';
    this.sessionTokenService.getSessionToken(data.target).subscribe(Token => {
      this.sessionToken = Token;
      this.updateUrl(this.sessionToken.sessiontoken, data.deployUrl, data.target);
    });
  }
  ngOnInit() {  }

  updateUrl(token, url, target) {
    if (this.setupUrl === '') {
      this.deployUrl = url;
      this.setupUrl = url.split('Deploy.Input.cls')[0] + 'SVN.SetupBootstrap.cls';
    }
    url += '?CSPSHARE=1&CSPCHD=' + token;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    this.target = target;
    console.log('deploy-modal url=' + url);
    console.log('deploy-modal setupUrl: ' + this.setupUrl);
    console.log('deploy-modal this.target: ' + this.target + ' | token: ' + token);

    this.modalDialogRef.componentInstance.data = {
        target: this.target,
        deployUrl: this.deployUrl,
        setupUrl: this.setupUrl,
        urlSafe: this.urlSafe
      };
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    // this.deployUrl = this.data.deployUrl;
    // this.target = this.data.target;
    console.log('deploy-modal OnChanges');
    //  url=' + this.deployUrl + ' | this.target: ' + this.target
    console.dir(changes);
    /*
    if (changes['sessionToken']) {
      /*this.deployUrl += '?CSPSHARE=1&CSPCHD=' + this.sessionToken.sessiontoken;
      this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.deployUrl);
      this.deployUrl = changes['sessionToken'].currentValue;
    }
    */
  }
  onClickButton() {
    const type = this.btnCaption;
    const url = (type === 'Deploy') ? this.deployUrl : this.setupUrl;
    const style = (type === 'Deploy') ? 'height:593px;width:830px' : 'height:650px;width:830px';
    this.updateUrl(this.sessionToken.sessiontoken, url, this.target);
    this.deployiframe.nativeElement.setAttribute('style', style);
    this.btnCaption = (type === 'Deploy') ? 'Setup' : 'Deploy';
    this.setupbutton.nativeElement.innerHTML = this.btnCaption;
  }

  updateIframeSrc(url) {
    this.deployiframe.nativeElement.setAttribute('src', this.sanitizer.bypassSecurityTrustResourceUrl(url));
  }

  onNoClick(): void {
    this.modalDialogRef.close();
  }
}
