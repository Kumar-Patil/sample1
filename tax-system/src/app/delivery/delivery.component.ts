import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { DeliveryModel } from './model/ds.model';
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
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit, OnDestroy {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  info: string;
  deliveryDataView: any;
  objectKeys: Object;
  deliveryData: DeliveryModel[] = [];
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

    this.httpService.get(this.apiService.API_DS_LIST).subscribe(res => {
      if (res) {
        this.deliveryData = res;
        this.dtTrigger.next();
        this.spinnerService.hide();
      }
    });
  }

  edit(event: Event, delivery: DeliveryModel, index) {
    this.router.navigate([`ds/edit/${delivery.deliveryId}`]);
  }
  view(event: Event, delivery: DeliveryModel, content, index) {
    this.spinnerService.show();
    this.httpService.getById(delivery.deliveryId, this.apiService.API_DS_VIEW).subscribe(res => {
      if (res) {
        this.deliveryDataView = res;
        this.spinnerService.hide();
      }
    });
    this.modalService.open(content, { size: 'lg' });
  }

  delete(content, event: Event, delivery: DeliveryModel, index) {
    this.modalService.open(content, { size: 'sm' }).result.then(
      (closeResult) => {
        // modal close
        console.log('modal closed');
      },
      (dismissReason) => {
        this.deleteDS(delivery.deliveryId);
        this.alerts.setMessage('Deleted successfully!', 'success');
        // location.reload();
        this.deliveryData.splice(index, 1);
      }
    );
  }
  deleteDS(id: any) {
    this.httpService.deletById(id, this.apiService.API_DS_DELETE).subscribe(res => {
    });
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
  }
}
