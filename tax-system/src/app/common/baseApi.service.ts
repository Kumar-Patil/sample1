import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

const HTTPS = 'https://';
const GET_DRIVER_BY_ID = '';
const POST_DRIVER_DATA = '';
const ADD_DRIVER_DATA = '';
const baseURL = 'http://18.219.43.223:8080/taxi/';

@Injectable()
export class BaseApiService {
    private isAccessActions: boolean;
    private isModuleAccess: boolean;
    private onlySupereme: boolean;
    constructor() { }
    getDriverById(): string {
        return GET_DRIVER_BY_ID;
    }

    public getUserInfo(): any {
        const userInfoJSON = sessionStorage.getItem('userData');
        return JSON.parse(userInfoJSON);
    }

    public getUserId(): any {
        const userInfoJSON = JSON.parse(sessionStorage.getItem('userData'));
        if (userInfoJSON) {
            return userInfoJSON.userId;
        }
    }

    public getApiToken(): any {
        const userInfoJSON = JSON.parse(sessionStorage.getItem('userData'));
        if (userInfoJSON) {
            return userInfoJSON.accessToken;
        }
    }
    getbaseUrl(): string {
        return baseURL;
    }
    public isActionAcessAble(): any {
        const userInfoJSON = JSON.parse(sessionStorage.getItem('userData'));
        this.isAccessActions = true;
        if (userInfoJSON) {
            if (userInfoJSON.role === 'View User') {
                this.isAccessActions = false;
            }
            return this.isAccessActions;
        }
    }
    public isAccess(): any {
        const userInfoJSON = JSON.parse(sessionStorage.getItem('userData'));
        this.isModuleAccess = false;
        if (userInfoJSON) {
            if (userInfoJSON.role === 'Supreme User' || userInfoJSON.role === 'View User' || userInfoJSON.role === 'Super User') {
                this.isModuleAccess = true;
            }
            return this.isModuleAccess;
        }
    }
    public onlyAccess(): any {
        const userInfoJSON = JSON.parse(sessionStorage.getItem('userData'));
        this.onlySupereme = false;
        if (userInfoJSON) {
            if (userInfoJSON.role === 'Supreme User') {
                this.onlySupereme = true;
            }
            return this.onlySupereme;
        }
    }
    public isSupereme(): any {
        const userInfoJSON = JSON.parse(sessionStorage.getItem('userData'));
        this.isAccessActions = false;
        if (userInfoJSON) {
            if (userInfoJSON.role === 'Supreme User') {
                this.isAccessActions = true;
            }
            return this.isAccessActions;
        }
    }
}
