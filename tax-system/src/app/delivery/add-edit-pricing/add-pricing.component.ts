import { Component, OnInit, ViewChild } from '@angular/core';
import { IMyDpOptions } from 'angular4-datepicker/src/my-date-picker';
import { ActivatedRoute } from '@angular/router';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
import { PricingAddEditModel } from '../model/pricingAddOrEdit.model';
import { BaseApiService } from '../../common/baseApi.service';
import { DriverService } from '../../common/driver.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { HttpService } from '../../common/http.service';
import { AlertsService } from 'angular-alert-module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-pricing.component.html',
  styleUrls: ['./add-pricing.component.css']
})
export class AddPricingComponent implements OnInit {

  @ViewChild('pricingDetails') pricingDetails: NgForm;
  pricingId: string;
  pricingData: PricingAddEditModel;
  vendorList: any[] = [];
  statusList: any[] = [];
  private formInvalid: boolean;
  constructor(private route: ActivatedRoute, private spinnerService: Ng4LoadingSpinnerService,
    private baseApiService: BaseApiService,
    private driverService: DriverService,
    private httpService: HttpService,
    private alerts: AlertsService,
    private router: Router,
    private formBuilder: FormBuilder) {
    this.pricingData = new PricingAddEditModel();
  }
  setDefault() {
    this.pricingData.pricingId = 0;
  }
  addOrUpdate(isAdd: boolean) {
    if (this.validateForm()) {
      if (isAdd) {
        this.setDefault();
        this.httpService.post(this.pricingData, 'price/add').subscribe(res => {
          this.alerts.setMessage('Added successfully!', 'success');
          this.router.navigate(['pricing']);
        });
      } else {
        this.httpService.put(this.pricingData, 'price/update').subscribe(res => {
          if (res) {
            this.pricingData = res;
          }
          console.log('update success');
          this.alerts.setMessage('Updated successfully!', 'success');
          this.router.navigate(['pricing']);
        });
      }
    }
  }

  getPricingDetails(id: string) {
    this.httpService.getById(id, 'price/details').subscribe(res => {
      if (res) {
        this.pricingData = res;
        this.spinnerService.hide();
      }
    });
  }
  getStatusAndVendorList() {
    this.spinnerService.show();
    this.httpService.get('price/statusAndVendorList').subscribe(res => {
      if (res) {
        this.vendorList = res['vendorList'];
        this.statusList = res['statusList'];
      }
    });
  }
  validateForm() {
     alert(this.pricingDetails.valid);
    if (this.pricingDetails.valid) {
      this.formInvalid = false;
      return true;
    } else {
      return false;
    }
  }
  ngOnInit() {
    this.getStatusAndVendorList();
    if (this.route.routeConfig.path === 'price/edit/:pricingId') {
      this.spinnerService.show();
      // tslint:disable-next-line:no-unused-expression
      this.route && this.route.params.subscribe((params) => {
        this.pricingId = params['pricingId'];
        if (this.pricingId) {
          this.getPricingDetails(this.pricingId);
        }
      });
    } else {
      this.pricingId = '';
      this.formInvalid = false;
      this.spinnerService.hide();
    }
  }
}
