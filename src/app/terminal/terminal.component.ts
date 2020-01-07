import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

const apiUrl = environment.apiUrl;

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css']
})
export class TerminalComponent implements OnInit {
  @Input()
  webTerminalUrl: string = apiUrl + '/terminal/';
  urlSafe: SafeResourceUrl;

  constructor(public sanitizer: DomSanitizer) {  }

  ngOnInit() {
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.webTerminalUrl);
  }

}
