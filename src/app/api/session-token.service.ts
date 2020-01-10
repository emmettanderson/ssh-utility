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
import { SessionTokenApiConfig } from './api.config';
import { ApiConfig } from './api.config';
import { SessionToken } from '../models/session-token.model';

@Injectable({
  providedIn: 'root'
})

export class SessionTokenService {
  public actionUrl: string;
  SessionToken: SessionToken;

  constructor(
    private http: HttpClient,
    public sessionTokenApiConfig: SessionTokenApiConfig,
    public _apiConfig: ApiConfig,
  ) { this.actionUrl = sessionTokenApiConfig.RestApiUrl; }

  public _headers = {
    headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Authorization', this._apiConfig.UserPassBasic)
      // .append('Content-Type', 'text/html')
  };

  public getSessionToken(target) {
    console.log('getSessionToken: ' + this.actionUrl + target);
    return this.http
      .get<SessionToken>(this.actionUrl + target, this._headers);
  }
}
