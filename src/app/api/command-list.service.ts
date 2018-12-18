import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpHeaders
} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { CommandListApiConfig } from './api.config';
import { SyntaxCheck } from '../models/command-list.model';
import { ApiConfig } from './api.config';

@Injectable({
  providedIn: 'root'
})
export class CommandListService {
  private actionUrl: string;
  public syntaxCheck: SyntaxCheck;
  private errorHandler: ApiService['handleError'];

  constructor(
    private http: HttpClient,
    public _CommandListApiConfig: CommandListApiConfig,
    public _apiConfig: ApiConfig,
  ) { this.actionUrl = _CommandListApiConfig.RestApiUrl; }

  public _headers = {
    headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Authorization', this._apiConfig.UserPassBasic)
      // .append('Content-Type', 'text/html')
  };

  public checkCodeSyntax(command: string) {
    return this.http.get<SyntaxCheck>(this.actionUrl + command, this._headers);
    // console.log('CommandList Code Check Service post: cmd: ' + command + '\nResponse: ' + this.syntaxCheck);
    // return this.syntaxCheck;
  }
}