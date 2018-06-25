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

  objectKeys: Object;
  vendorData: VendorModel[] = [];
  constructor(private http: HttpClient, private driverService: DriverService, private spinnerService: Ng4LoadingSpinnerService,
    private chRef: ChangeDetectorRef, private router: Router, private baseApiService: BaseApiService, private httpService: HttpService) {}

  ngOnInit() {
    this.spinnerService.show();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 8
    };

    this.httpService.get('vendor/list').subscribe(res => {
      if (res) {
        this.vendorData = res;
        this.dtTrigger.next();
        this.spinnerService.hide();
      }
    });
  }

  edit(event: Event, user: VendorModel) {
    // this.router.navigate([`/rider/rider/${user.id}`]);
    alert('Yet to implementaion');
  }
  view(event: Event, user: VendorModel) {
    alert('Yet to implementaion');
  }
  delete(event: Event, user: VendorModel) {
    alert('Yet to implementaion');
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
  }
}