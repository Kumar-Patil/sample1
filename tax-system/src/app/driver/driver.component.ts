import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { DriverModel } from './model/driver.model';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { DriverService } from '../common/driver.service';
import { BaseApiService } from '../common/baseApi.service';
import { DataTableDirective } from 'angular-datatables';
import { ApiService } from '../common/api.service';
import { HttpService } from '../common/http.service';
import { AlertsService } from 'angular-alert-module';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DriverComponent implements OnInit, OnDestroy {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  objectKeys: Object;
  driverData: DriverModel[] = [];
  driverVewData: any;
  constructor(private http: HttpClient, private driverService: DriverService, private spinnerService: Ng4LoadingSpinnerService,
    private cde: ChangeDetectorRef,
    private router: Router, private baseApiService:
      BaseApiService,
    private apiService: ApiService,
    private httpService: HttpService,
    private alerts: AlertsService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.spinnerService.show();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 8
    };
    this.loadData();
  }

  loadData() {
    const result = this.httpService.get(this.apiService.API_DRIVER_LIST).subscribe(res => {
      if (res) {
        this.driverData = res;
        this.dtTrigger.next();
        this.spinnerService.hide();
      }
      this.cde.detectChanges();
      this.cde.markForCheck();
    });
    if (result) {
      this.spinnerService.hide();
    }
  }
  delete(content, event: Event, driver: DriverModel, index) {
    this.modalService.open(content, { size: 'sm' }).result.then(
      (closeResult) => {
        // modal close
        console.log('modal closed');
      },
      (dismissReason) => {
        this.deleteDriverRecords(driver.driverId);
        this.alerts.setMessage('Deleted successfully!', 'success');
        // location.reload();
        this.driverData.splice(index, 1);
      }
    );
  }
  deleteDriverRecords(id: any) {
    this.httpService.deletById(id, this.apiService.API_DRIVER_DELETE).subscribe(res => {
    });
  }
  edit(event: Event, driver: DriverModel) {
    this.router.navigate([`/driver/editDriver/${driver.driverId}`]);
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
  }
  view(event: Event, driverVewData, content) {
    this.spinnerService.show();
    this.httpService.getById(driverVewData.driverId, this.apiService.API_DRIVER_VIEW).subscribe(res => {
      if (res) {
        this.driverVewData = res;
        this.spinnerService.hide();
      }
    });
    this.modalService.open(content, { size: 'lg' });
  }
  public addDriver() {
    alert('Yet to ADD API');
  }
}
