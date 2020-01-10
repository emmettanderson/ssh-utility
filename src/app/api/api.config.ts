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
export class HistoryListApiConfig {
  public RestApi = '/csp/rest/sshtools/gethistorylist/';
  public RestApiUrl = API_URL + this.RestApi;
}

@Injectable({ providedIn: 'root' })
export class SubmitListApiConfig {
  public RestApi = '/csp/rest/sshtools/submit/';
  public RestApiUrl = API_URL + this.RestApi;
}

@Injectable({ providedIn: 'root' })
export class FileListApiConfig {
  public RestApi = '/csp/rest/sshtools/srcfileinput/';
  public RestApiUrl = API_URL + this.RestApi;
}

@Injectable({ providedIn: 'root' })
export class OutputDisplayApiConfig {
  public RestApi = '/csp/rest/sshtools/getsessionlog/';
  public RestApiUrl = API_URL + this.RestApi;
}

@Injectable({ providedIn: 'root' })
export class CommandListApiConfig {
  public RestApi = '/csp/rest/sshtools/checksyntax/';
  public RestApiUrl = API_URL + this.RestApi;
}

@Injectable({ providedIn: 'root' })
export class TrakLayoutApiConfig {
  public RestApi = '/csp/rest/sshtools/traklayout/';
  public RestApiUrl = API_URL + this.RestApi;
}

@Injectable({ providedIn: 'root' })
export class SessionTokenApiConfig {
  public RestApi = '/csp/rest/sshtools/getsessiontoken/';
  public RestApiUrl = API_URL + this.RestApi;
}

@Injectable({ providedIn: 'root' })
export class ApiConfig {
  // janderson:demo = amFuZGVyc29uOmRlbW8=
  // add your local user:pass here
  public UserPassBasic = 'Basic ' + btoa('janderson:demo');
  // HS-Services
  public ServicePassBasic = '';
}
