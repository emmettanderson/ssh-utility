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
import { SubmitListApiConfig } from './api.config';
import { SubmitList } from '../models/submit.model';
import { ApiConfig } from './api.config';

@Injectable({
  providedIn: 'root'
})
export class SubmitService {
  private actionUrl: string;

  private errorHandler: ApiService['handleError'];

  constructor(
    private http: HttpClient,
    public _SubmitListApiConfig: SubmitListApiConfig,
    public _apiConfig: ApiConfig,
  ) { this.actionUrl = _SubmitListApiConfig.RestApiUrl; }

  public _headers = {
    headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Authorization', this._apiConfig.UserPassBasic)
      // .append('Content-Type', 'text/html')
  };

  public submitList(submitList: SubmitList) {
    console.log('SubmitListService call service SubmitList: ' + submitList);
    const response = this.http.post<string>(this.actionUrl, submitList, this._headers);
    return response;
  }
}

