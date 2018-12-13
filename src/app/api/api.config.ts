import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class TargetGroupListApiConfig {
  public RestApi = '/csp/rest/sshtools/gettargetgrouplist/';
  public RestApiUrl = API_URL + this.RestApi;
}
@Injectable({ providedIn: 'root' })
export class TargetListApiConfig {
  public RestApi = '/csp/rest/sshtools/gettargetlist/';
  public RestApiUrl = API_URL + this.RestApi;
}

@Injectable({ providedIn: 'root' })
export class CommandListApiConfig {
  public RestApi = '/csp/rest/sshtools/getcommandlist/';
  public RestApiUrl = API_URL + this.RestApi;
}

@Injectable({ providedIn: 'root' })
export class HistoryListApiConfig {
  public RestApi = '/csp/rest/sshtools/gethistorylist/';
  public RestApiUrl = API_URL + this.RestApi;
}
@Injectable({ providedIn: 'root' })
export class FileListApiConfig {
  public RestApi = '/csp/rest/sshtools/getfilelist/';
  public RestApiUrl = API_URL + this.RestApi;
}

@Injectable({ providedIn: 'root' })
export class SubmitListApiConfig {
  public RestApi = '/csp/rest/sshtools/submit/';
  public RestApiUrl = API_URL + this.RestApi;
}

@Injectable({ providedIn: 'root' })
export class ApiConfig {
  // janderson
  public UserPassBasic = 'Basic amFuZGVyc29uOmRlbW8=';
  // HS-Services
  public ServicePassBasic = '';
}
