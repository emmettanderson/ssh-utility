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
import { TrakLayoutApiConfig } from './api.config';
import { TrakLayoutFile, SimpleRecord, ChartItem, ContextItem } from '../models/trak-layout';
import { ApiConfig } from './api.config';


@Injectable({
  providedIn: 'root'
})
export class TrakLayoutService {
  private actionUrl: string;

  private errorHandler: ApiService['handleError'];

  constructor(
    private http: HttpClient,
    public _TrakLayoutApiConfig: TrakLayoutApiConfig,
    public _apiConfig: ApiConfig,
  ) { this.actionUrl = _TrakLayoutApiConfig.RestApiUrl; }

  public _headers = {
    headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Authorization', this._apiConfig.UserPassBasic)
      // .append('Content-Type', 'text/html')
  };

  public getChangeTypeList() {
    console.log('getChangeTypeList service headers: ' + this._headers);
    return this.http
      .get<string>(this.actionUrl + 'getchangetypes/', this._headers)
      .catch(this.errorHandler);
  }

  public getComponentList() {
    console.log('getComponentList service headers: ' + this._headers);
    return this.http
      .get<SimpleRecord[]>(this.actionUrl + 'getcomponents/', this._headers)
      .catch(this.errorHandler);
  }

  public getContextList(ComponentId: string) {
    console.log('getContextList service headers: ' + ComponentId);
    return this.http
      .get<ContextItem[]>(this.actionUrl + 'getcontexts/' + ComponentId, this._headers)
      .catch(this.errorHandler);
  }

  public getChartBookList() {
    console.log('getChartBookList service headers: ' + this._headers);
    return this.http
      .get<SimpleRecord[]>(this.actionUrl + 'getchartbooks/', this._headers)
      .catch(this.errorHandler);
  }

  public getChartList(ChartBookId: string) {
    console.log('getChartList service headers: ' + ChartBookId);
    return this.http
      .get<ChartItem[]>(this.actionUrl + 'getcharts/' + ChartBookId, this._headers)
      .catch(this.errorHandler);
  }

  public saveLayoutFile(patchFile: TrakLayoutFile) {
    console.log('post savelayoutfile service: ' + patchFile);
    return this.http
      .post(this.actionUrl + 'savelayoutfile/', patchFile, this._headers)
      .catch(this.errorHandler);
  }
}

