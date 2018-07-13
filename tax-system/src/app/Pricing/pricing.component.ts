import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { PricingModel } from './model/pricing.model';
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
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit, OnDestroy {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  info: string;
  pricingView: any;
  objectKeys: Object;
  pricingData: PricingModel[] = [];
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

    this.httpService.get(this.apiService.API_PRICE_LIST).subscribe(res => {
      if (res) {
        this.pricingData = res;
        this.dtTrigger.next();
        this.spinnerService.hide();
      }
    });
  }

  edit(event: Event, price: PricingModel) {
    this.router.navigate([`price/edit/${price.pricingId}`]);
  }
  view(event: Event, price: PricingModel, content) {
    this.spinnerService.show();
    this.httpService.getById(price.pricingId, this.apiService.API_PRICE_VIEW).subscribe(res => {
      if (res) {
        this.pricingView = res;
        this.spinnerService.hide();
      }
    });
    this.modalService.open(content, { size: 'lg' });
  }

  delete(content, event: Event, price: PricingModel, index) {
    this.modalService.open(content, { size: 'sm' }).result.then(
      (closeResult) => {
        // modal close
        console.log('modal closed');
      },
      (dismissReason) => {
        this.deletePricing(price.pricingId);
        this.alerts.setMessage('Deleted successfully!', 'success');
        this.pricingData.splice(index, 1);
      }
    );
  }
  deletePricing(id: any) {
    this.httpService.deletById(id, this.apiService.API_PRICE_DELETE).subscribe(res => {
    });
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
  }
}
