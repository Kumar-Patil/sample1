import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { ApiService } from '../../common/api.service';
@Injectable()
export class FileUploadService {
  private qparams: URLSearchParams = new URLSearchParams();
  constructor(private httpClient: HttpClient,
  private apiService: ApiService) { }

  pushFileToStorage(file: File, apiToken): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    const endPoint = this.apiService.API_BASE_URL + this.apiService.API_COMMON_FILE_HANDLER;
    formdata.append('file', file);
    const headers = new HttpHeaders({'api_key': apiToken});
    const req = new HttpRequest('POST', endPoint, formdata, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.httpClient.request(req);
  }
  postFile(fileToUpload: File, userId: any, apiToken: any): Observable<boolean> {
    const endpoint = this.apiService.API_BASE_URL + this.apiService.API_COMMON_FILE_UPLOAD;
    const formData: FormData = new FormData();
    const headers = new HttpHeaders({'Content-Type': '*/*', 'api_key': apiToken});
    formData.append('fileKey', fileToUpload);
    return this.httpClient
      .post(endpoint, formData, {headers: headers}).map(this.extractData).catch(this.handleError);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body;
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
        const body = error.json() || '';
        // const err = body.error || JSON.stringify(body);
        // errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
        errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
