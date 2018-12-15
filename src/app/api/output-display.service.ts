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
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { OutputDisplayApiConfig } from './api.config';
import { ApiConfig } from './api.config';
import { SessionLog } from '../models/submit.model';

@Injectable({
  providedIn: 'root'
})

export class OutputDisplayService {
  private actionUrl: string;
  SessionLog: SessionLog;
  private errorHandler: ApiService['handleError'];

  constructor(
    private http: HttpClient,
    public _OutputDisplayApiConfig: OutputDisplayApiConfig,
    public _apiConfig: ApiConfig,
  ) { this.actionUrl = _OutputDisplayApiConfig.RestApiUrl; }

  public _headers = {
    headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Authorization', this._apiConfig.UserPassBasic)
      // .append('Content-Type', 'text/html')
  };

  public getSessionLog(logRowId) {
    console.log('getSessionLog: ' + logRowId);
    return this.http
      .get<SessionLog>(this.actionUrl + logRowId, this._headers)
      .catch(this.errorHandler);
  }
}

