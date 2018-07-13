import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { SurgingModel } from './model/surging.model';
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
  templateUrl: './surging.component.html',
  styleUrls: ['./surging.component.css']
})
export class SurgingComponent implements OnInit, OnDestroy {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  info: string;
  surgeView: any;
  objectKeys: Object;
  surgingData: SurgingModel[] = [];
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

    this.httpService.get(this.apiService.API_SURGE_LIST).subscribe(res => {
      if (res) {
        this.surgingData = res;
        this.dtTrigger.next();
        this.spinnerService.hide();
      }
    });
  }

  edit(event: Event, surging: SurgingModel) {
    this.router.navigate([`surge/edit/${surging.surgeId}`]);
  }
  view(event: Event, surging: SurgingModel, content) {
    this.spinnerService.show();
    this.httpService.getById(surging.surgeId, this.apiService.API_SURGE_VIEW).subscribe(res => {
      if (res) {
        this.surgeView = res;
        this.spinnerService.hide();
      }
    });
    this.modalService.open(content, { size: 'lg' });
  }

  delete(content, event: Event, surging: SurgingModel, index) {
    this.modalService.open(content, { size: 'sm' }).result.then(
      (closeResult) => {
        // modal close
        console.log('modal closed');
      },
      (dismissReason) => {
        this.deletePricing(surging.surgeId);
        this.alerts.setMessage('Deleted successfully!', 'success');
        this.surgingData.splice(index, 1);
      }
    );
  }
  deletePricing(id: any) {
    this.httpService.deletById(id, this.apiService.API_SURGE_DELETE).subscribe(res => {
    });
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
  }
}