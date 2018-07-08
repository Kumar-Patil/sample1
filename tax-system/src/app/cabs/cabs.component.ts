import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { CabsModel } from './model/cabs.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { DriverService } from '../common/driver.service';
import { BaseApiService } from '../common/baseApi.service';
import { DataTableDirective } from 'angular-datatables';
import { HttpService } from '../common/http.service';
import { AlertsService } from 'angular-alert-module';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../common/api.service';

@Component({
  selector: 'app-cabs',
  templateUrl: './cabs.component.html',
  styleUrls: ['./cabs.component.css']
})
export class CabsComponent implements OnInit, OnDestroy {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  objectKeys: Object;
  cabsData: CabsModel[] = [];
  cabVewData: any;
  constructor(private http: HttpClient, private driverService: DriverService, private spinnerService: Ng4LoadingSpinnerService,
    private chRef: ChangeDetectorRef,
    private router: Router,
    private baseApiService: BaseApiService,
    private httpService: HttpService,
    private alerts: AlertsService,
    private modalService: NgbModal,
    private apiService: ApiService) { }

  ngOnInit() {
    this.spinnerService.show();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 8
    };
    this.loadData();
  }

  edit(event: Event, user: CabsModel) {
    // this.router.navigate([`/rider/rider/${user.id}`]);
    alert('Yet to implementaion');
  }

  delete(content, event: Event, cabs: CabsModel, index) {
    this.modalService.open(content, { size: 'sm' }).result.then(
      (closeResult) => {
        // modal close
        console.log('modal closed');
      },
      (dismissReason) => {
        this.deleteCabRecord(cabs.cabId);
        this.alerts.setMessage('Deleted successfully!', 'success');
        this.cabsData.splice(index, 1);
      }
    );
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
  }

  loadData() {
    const result = this.httpService.get(this.apiService.API_CAB_LIST).subscribe(res => {
      if (res) {
        this.cabsData = res;
        this.dtTrigger.next();
        this.spinnerService.hide();
      }
    });
    if (result) {
      this.spinnerService.hide();
    }
  }
  deleteCabRecord(id: any) {
    this.httpService.deletById(id, this.apiService.API_CAB_DELETE).subscribe(res => {
    });
  }
  view(event: Event, cabVewData, content) {
    this.spinnerService.show();
    this.httpService.getById(cabVewData.cabId, this.apiService.API_CAB_VIEW).subscribe(res => {
      if (res) {
        this.cabVewData = res;
        this.spinnerService.hide();
      }
    });
    this.modalService.open(content, { size: 'lg' });
  }
}
