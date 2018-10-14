import { Injectable } from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BaseApiService } from './baseApi.service';
import { ApiService } from '../common/api.service';
@Injectable()
export class HttpService {

  private qparams: URLSearchParams = new URLSearchParams();

  constructor(private http: Http,
    private baseApiService: BaseApiService,
    private apiService: ApiService) { }

  get(apiName): Observable<any> {
    const requestURL = this.apiService.API_BASE_URL + apiName;
    this.qparams.set('userId', this.baseApiService.getUserId());
    return this.http.get(requestURL, {
      withCredentials: true,
      headers: new Headers({
        'Content-Type': 'application/json',
        'api_key': this.baseApiService.getApiToken()
      }),
      search: this.qparams
    }).map(this.extractData)
      .catch(this.handleError);
  }

  getMapData(apiName, type): Observable<any> {
    const requestURL = this.apiService.API_BASE_URL + apiName;
    this.qparams.set('userId', this.baseApiService.getUserId());
    this.qparams.set('type', type);
    return this.http.get(requestURL, {
      withCredentials: true,
      headers: new Headers({
        'Content-Type': 'application/json',
        'api_key': this.baseApiService.getApiToken()
      }),
      search: this.qparams
    }).map(this.extractData)
      .catch(this.handleError);
  }
  getById(id, apiName): Observable<any> {
    const requestURL = this.apiService.API_BASE_URL + apiName;
    this.qparams.set('userId', this.baseApiService.getUserId());
    this.qparams.set('id', id);
    return this.http.get(requestURL, {
      withCredentials: true,
      headers: new Headers({
        'Content-Type': 'application/json',
        'api_key': this.baseApiService.getApiToken()
      }),
      search: this.qparams
    }).map(this.extractData)
      .catch(this.handleError);
  }

  post(data: any, apiName): Observable<any> {
    const requestURL = this.apiService.API_BASE_URL + apiName;
    this.qparams.set('userId', this.baseApiService.getUserId());
    return this.http.post(requestURL, data,
      {
        withCredentials: true, headers: new Headers({
          'Content-Type': 'application/json',
          'api_key': this.baseApiService.getApiToken()
        }),
        search: this.qparams
      }).map(this.extractData).catch(this.handleError);
  }

  put(data: any, apiName): Observable<any> {
    const requestURL = this.apiService.API_BASE_URL + apiName;
    this.qparams.set('userId', this.baseApiService.getUserId());
    return this.http.put(requestURL, data,
      {
        withCredentials: true, headers: new Headers({
          'Content-Type': 'application/json',
          'api_key': this.baseApiService.getApiToken()
        }),
        search: this.qparams
      }).map(this.extractData).catch(this.handleError);
  }
  deletById(id, apiName): Observable<any> {
    const requestURL = this.apiService.API_BASE_URL + apiName;
    this.qparams.set('userId', this.baseApiService.getUserId());
    this.qparams.set('id', id);
    return this.http.delete(requestURL, {
      withCredentials: true,
      headers: new Headers({
        'Content-Type': 'application/json',
        'api_key': this.baseApiService.getApiToken()
      }),
      search: this.qparams
    }).map(this.extractData)
      .catch(this.handleError);
  }
  private extractData(res: Response) {
    const body = res.json();
    return body ? (body.data || body) : body;
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
