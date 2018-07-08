import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { ApiService } from '../../common/api.service';
@Injectable()
export class AuthService {
    private qparams: URLSearchParams = new URLSearchParams();
    private headers = new Headers({ 'Content-Type': 'application/json' });
    isUserLoggedIn = false;
    token: any[] = [{
        tokenId: 'HYKKDDR567NNKKKVVFD',
        msg: 'success'
    }]; // Api token return after login success

    constructor(private http: Http, private apiService: ApiService) { }

    checkLoginSuccess(loginData: any): Observable<any> {
        const headers = new Headers();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Content-Type', 'application/json');
        const options = new RequestOptions({
            headers: headers
        });
        const requestURL = this.apiService.API_BASE_URL + this.apiService.API_LOGIN_URL;
        return this.http.post(requestURL, loginData, options).map(
            response => this.extractData(response), this.setMockResponse(true))
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
        // console.error(errMsg);
        return Observable.throw(errMsg);
    }

    logoutUser(): Observable<any> {
        sessionStorage.clear();
        return;
        // logout api call
        // return Observable.of(this.token).map(o => {
        //     this.isUserLoggedIn = true;
        //     sessionStorage.setItem('authSuccess', this.token[0].tokenId);
        //     JSON.stringify(o);
        // });
    }
    getMockResponse() {
        return this.isUserLoggedIn;
    }

    setMockResponse(setVal: boolean) {
        // this.isUserLoggedIn = false;
        return this.isUserLoggedIn = setVal;
    }

    changePassword() {
        // change password API
    }
}

