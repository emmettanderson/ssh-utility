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
// import { Observable } from 'rxjs/Observable';

import { ApiService } from './api.service';
import { TargetListApiConfig, TargetGroupListApiConfig } from './api.config';
import { TargetList, TargetGroupList } from '../models/target-list.model';
import { ApiConfig } from './api.config';
// import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TargetListService {
  private actionUrl: string;

  public TargetGroupList: TargetGroupList;
  public TargetList: TargetList;
  public GroupName: TargetGroupList['GroupName'];
  public HostName: TargetList['HostName'];

  constructor(
    private http: HttpClient,
    public _TargetListApiConfig: TargetListApiConfig,
    public _TargetGroupListApiConfig: TargetGroupListApiConfig,
    public _apiConfig: ApiConfig,
  ) { this.actionUrl = _TargetGroupListApiConfig.RestApiUrl; }

  public _headers = {
    headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Authorization', this._apiConfig.UserPassBasic)
      // .append('Content-Type', 'text/html')
  };

  public getTargetGroupList() {
    console.log('getTargetGroupList service headers: ' + this._headers);
    return this.http
      .get<TargetGroupList>(this.actionUrl, this._headers);
  }
  public setTargetGroup(GroupName) {
    this.GroupName = GroupName;
  }
  public getTargetList(GroupName) {
    console.log('getTargetList service url: ' + this.actionUrl + GroupName);
    return this.http
      .get<TargetList>(this.actionUrl + GroupName, this._headers);
  }
}

