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
import { Observable} from 'rxjs';
import { Injectable } from '@angular/core';

import { ApiService } from './api.service';
import { HistoryListApiConfig } from './api.config';
import { HistoryList } from '../models/history-list';
import { ApiConfig } from './api.config';

@Injectable({
  providedIn: 'root'
})
export class HistoryListService {
  private actionUrl: string;

  public HistoryList: HistoryList;
  constructor(
    private http: HttpClient,
    public _HistoryListApiConfig: HistoryListApiConfig,
    public _apiConfig: ApiConfig,
  ) { this.actionUrl = _HistoryListApiConfig.RestApiUrl; }

  public _headers = {
    headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Authorization', this._apiConfig.UserPassBasic)
      // .append('Content-Type', 'text/html')
  };

  public getHistoryList(RowId): Observable<HistoryList[]> {
    let remove = '';
    if (RowId !== '') {
      remove = 'remove/' + RowId;
    }
    console.log('getHistoryList service url: ' + this.actionUrl + remove);
    return this.http
      .get<HistoryList[]>(this.actionUrl + remove, this._headers);
  }
}
