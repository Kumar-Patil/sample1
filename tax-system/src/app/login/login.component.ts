import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../common/service/auth.service';
import { BaseApiService } from '../common/baseApi.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {

    @ViewChild('login') loginForm: NgForm;
    emailId: string;
    emailPassword: string;
    loginStatus: any;
    loginData = {
        email: '',
        opt: '',
        password: ''
    };
    private isFullAccess = false;
    private isPartiallyAccess = false;
    constructor (private router: Router, private authService: AuthService,
        private baseApiService: BaseApiService) {}
    onSubmit() {
        this.authService.checkLoginSuccess(this.loginData).subscribe(
            res => {
                if (res) {
                    this.loginStatus =  res;
                    sessionStorage.setItem('userData', JSON.stringify(this.loginStatus));
                    this.router.navigate(['/activityDashboard']);
                } else {
                    // this.router.navigate(['/']);
                }
            }
        );
    }
}
