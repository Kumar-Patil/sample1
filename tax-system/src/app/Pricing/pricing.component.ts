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
  objectKeys: Object;
  pricingData: PricingModel[] = [];
  constructor(private http: HttpClient, private driverService: DriverService, private spinnerService: Ng4LoadingSpinnerService,
    private chRef: ChangeDetectorRef, private router: Router, private baseApiService: BaseApiService, private httpService: HttpService,
    private alerts: AlertsService, config: NgbCarouselConfig,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.spinnerService.show();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 8
    };

    this.httpService.get('price/list').subscribe(res => {
      if (res) {
        this.pricingData = res;
        this.dtTrigger.next();
        this.spinnerService.hide();
      }
    });
  }
  // error, success, warn
  edit(event: Event, user: PricingModel) {
    this.router.navigate(['pricing']);
    this.alerts.setMessage('Yet to implementaion!', 'success');
    return;
  }
  view(event: Event, user: PricingModel, content) {
    this.info = 'Santosh Patil dom it';
    this.modalService.open(content, { size: 'lg' });
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
  }
  delete(content, event: Event, price: PricingModel) {
    this.modalService.open(content, { size: 'sm' }).result.then(
      (closeResult) => {
        // modal close
        console.log('modal closed : ', closeResult);
      },
      (dismissReason) => {
        console.log('Done4555 = ' + price.pricingId);
        console.log('Done = ' + price.pricingGroupName);

        this.alerts.setMessage('Deleted successfully!', 'success');
        this.back();
      }

    );
  }
  back() {
    this.getPricingList();

  }
  getPricingList() {
    this.spinnerService.show()
    this.httpService.get('price/list').subscribe(res => {
      if (res) {
        this.pricingData = res;
        this.spinnerService.hide();
      }
    });
  }
}
