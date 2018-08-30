import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { VendorModel } from './model/vendor.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { DriverService } from '../common/driver.service';
import { BaseApiService } from '../common/baseApi.service';
import { DataTableDirective } from 'angular-datatables';
import { HttpService } from '../common/http.service';
import { AlertsService } from 'angular-alert-module';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../common/api.service';
@Component({
  selector: 'app-user',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit, OnDestroy {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  info: string;
  vendorView: any;
  objectKeys: Object;
  vendorData: VendorModel[] = [];
  constructor(private http: HttpClient, private driverService: DriverService, private spinnerService: Ng4LoadingSpinnerService,
    private chRef: ChangeDetectorRef, private router: Router, private baseApiService: BaseApiService, private httpService: HttpService,
    private alerts: AlertsService, config: NgbCarouselConfig,
    private modalService: NgbModal,
    private apiService: ApiService) { }

  ngOnInit() {
    this.spinnerService.show();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 8
    };

    this.httpService.get(this.apiService.API_USER_VENDOR_LIST).subscribe(res => {
      if (res) {
        this.vendorData = res;
        this.dtTrigger.next();
        this.spinnerService.hide();
      }
    });
  }

  edit(event: Event, vendor: VendorModel) {
    alert('Yet To add APIS');
    // this.router.navigate([`vendor/edit/${vendor.id}`]);
  }
  view(event: Event, vendor: VendorModel, content) {/*
    this.spinnerService.show();
    this.httpService.getById(vendor.id, this.apiService.API_VENDOR_VIEW).subscribe(res => {
      if (res) {
        this.vendorView = res;
        this.spinnerService.hide();
      }
    });
    this.modalService.open(content, { size: 'lg' });*/
    alert('Yet To add APIS');
  }

  delete(content, event: Event, vendor: VendorModel, index) {
    /*this.modalService.open(content, { size: 'sm' }).result.then(
      (closeResult) => {
        // modal close
        console.log('modal closed');
      },
      (dismissReason) => {
        this.deleteVendor(vendor.id);
        this.alerts.setMessage('Deleted successfully!', 'success');
        this.vendorData.splice(index, 1);
      }
    );*/
    alert('Yet to add API');
  }
  deleteVendor(id: any) {
    this.httpService.deletById(id, this.apiService.API_VENDOR_DELETE).subscribe(res => {
    });
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
  }
}
