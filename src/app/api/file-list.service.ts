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
import { FileListApiConfig } from './api.config';
import { FileList } from '../models/file-list.model';
import { ApiConfig } from './api.config';

@Injectable({
  providedIn: 'root'
})
export class FileListService {
  private actionUrl: string;

  private errorHandler: ApiService['handleError'];

  constructor(
    private http: HttpClient,
    public _FileListApiConfig: FileListApiConfig,
    public _apiConfig: ApiConfig,
  ) { this.actionUrl = _FileListApiConfig.RestApiUrl; }

  public _headers = {
    headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Authorization', this._apiConfig.UserPassBasic)
      // .append('Content-Type', 'text/html')
  };

  public postSrcFileForm(fileList: FormData) {
    console.log('FileList Service post: ' + fileList);
    const response = this.http.post<FileList>(this.actionUrl, fileList, this._headers);
    return response;
  }
}
