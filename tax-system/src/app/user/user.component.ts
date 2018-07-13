import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { UserModel } from './model/user.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { DriverService } from '../common/driver.service';
import { BaseApiService } from '../common/baseApi.service';
import { DataTableDirective } from 'angular-datatables';
import { HttpService } from '../common/http.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../common/api.service';
import { AlertsService } from 'angular-alert-module';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  objectKeys: Object;
  userData: UserModel[] = [];
  userVewData: any;
  constructor(private http: HttpClient, private driverService: DriverService, private spinnerService: Ng4LoadingSpinnerService,
    private chRef: ChangeDetectorRef,
    private router: Router, private baseApiService:
      BaseApiService,
    private httpService: HttpService,
    private apiService: ApiService,
    private alerts: AlertsService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.spinnerService.show();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 8
    };

    this.httpService.get('user/list').subscribe(res => {
      if (res) {
        this.userData = res;
        this.dtTrigger.next();
        this.spinnerService.hide();
      }
    });
  }


  delete(content, event: Event, user: UserModel, index) {
    this.modalService.open(content, { size: 'sm' }).result.then(
      (closeResult) => {
        // modal close
        console.log('modal closed');
      },
      (dismissReason) => {
        this.deleteUserRecords(user.id);
        this.alerts.setMessage('Deleted successfully!', 'success');
        this.userData.splice(index, 1);
      }
    );
  }
  deleteUserRecords(id: any) {
    this.httpService.deletById(id, this.apiService.API_USER_DELETE).subscribe(res => {
    });
  }
  edit(event: Event, user: UserModel) {
    this.router.navigate([`/user/edit/${user.id}`]);
  }
  view(event: Event, userData, content) {
    this.spinnerService.show();
    this.httpService.getById(userData.id, this.apiService.API_USER_VIEW).subscribe(res => {
      if (res) {
        this.userVewData = res;
        this.spinnerService.hide();
      }
    });
    this.modalService.open(content, { size: 'lg' });
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
  }
}
