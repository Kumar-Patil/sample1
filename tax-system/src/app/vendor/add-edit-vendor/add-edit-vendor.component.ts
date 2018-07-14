import { Component, OnInit, ViewChild } from '@angular/core';
import { IMyDpOptions } from 'angular4-datepicker/src/my-date-picker';
import { FileUploadService } from '../../common/service/file-upload.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AddEditVendorDataModel } from '../model/add-edit-vendor.model';
import { BaseApiService } from '../../common/baseApi.service';
import { DriverService } from '../../common/driver.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Observable } from 'rxjs/Observable';
import { HttpEventType } from '@angular/common/http';
import { ApiService } from '../../common/api.service';
import { HttpService } from '../../common/http.service';
import { AlertsService } from 'angular-alert-module';

@Component({
  selector: 'app-vendor',
  templateUrl: './add-edir-vendor.component.html',
  styleUrls: ['./add-edit-vendor.component.css']
})
export class AddEditVendorComponent implements OnInit {

  @ViewChild('personalDetails') personalDetails: NgForm;
  @ViewChild('licencing') licencing: NgForm;
  @ViewChild('fileInput') fileInput;
  selectedFiles: FileList;
  currentFileUpload: File;
  vendorId: string;
  // queue: Observable<FileQueueObject[]>;
  vendorData: AddEditVendorDataModel;
  statesList: any[] = [];
  countryList: any[] = [];
  cityList: any[] = [];
  cabList: any[] = [];
  statusList: any[] = [];
  private formInvalid: boolean;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private spinnerService: Ng4LoadingSpinnerService,
    private baseApiService: BaseApiService,
    private driverService: DriverService,
    public uploader: FileUploadService,
    private apiService: ApiService,
    private httpService: HttpService,
    private alerts: AlertsService) {
    this.vendorData = new AddEditVendorDataModel();
  }

  public hireDateOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd-mm-yyyy',
  };

  // Initialized to specific date (09.10.2018).
  public hireDate: any = {
    date: { year: 2018, month: 10, day: 9 }
  };

  public expiryDateOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd-mm-yyyy',
  };

  public expiryDate: any = { date: { year: 2018, month: 10, day: 9 } };

  public insurenceExpiryDateOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd-mm-yyyy',
  };

  public insurenceExpiryDate: any = { date: { year: 2018, month: 10, day: 9 } };

  // file uploader
  fileToUpload: File = null;

  addOrUpdateDriverData(isAdd: boolean) {
    if (this.validateForm()) {
      this.setDefault();
      this.setDefaultFields();
      if (isAdd) {
        this.httpService.post(this.vendorData, this.apiService.API_VENDOR_ADD).subscribe(res => {
          this.alerts.setMessage('Added successfully!', 'success');
          this.router.navigate([`/vendor`]);
        });
      } else {
        this.vendorData.id = this.vendorData.id;
        this.httpService.put(this.vendorData, this.apiService.API_VENDOR_UPDATE).subscribe(res => {
          if (res) {
            this.vendorData = res;
            this.alerts.setMessage('Updated successfully!', 'success');
            this.router.navigate([`/vendor`]);
          }
          console.log('update success');
        });
      }
    }
  }
  validateForm() {
    if (this.personalDetails.valid) {
      this.formInvalid = false;
      return true;
    } else {
      return false;
    }
  }
  setDefaultFields() {
    this.vendorData.address = 'Rajajinagar';
    // this.driverData.driverId = 0;
    // this.driverData.startDate = this.driverData.startDate.epoc || 0;
    // this.driverData.driverLicenceExpiry = this.driverData.driverLicenceExpiry.epoc || 0;
  }

  handleFileInput(files: FileList) {
    // this.fileToUpload = files.item(0);
    // handle for png jpg pdf
    this.uploadFileToActivity();
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
    const name = event.target.name;
    if (this.selectedFiles) {
      this.upload(name);
    }
  }
  setUploadFilesValue(name) {

  }
  upload(name: string) {
    const apiToken = this.baseApiService.getApiToken();
    this.currentFileUpload = this.selectedFiles.item(0);
    this.vendorData[name] = this.currentFileUpload.name;
    this.uploader.pushFileToStorage(this.currentFileUpload, apiToken).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        console.log('File is completely uploaded!');
      }
    });

    this.selectedFiles = undefined;
  }
  uploadFileToActivity() {
    const userId = this.baseApiService.getUserId();
    const apiToken = this.baseApiService.getApiToken();
    const fileBrowser = this.fileInput.nativeElement;
    // this.uploader.addToQueue(fileBrowser.files);
    this.uploader.postFile(fileBrowser.files, userId, apiToken).subscribe(data => {
      // do something, if upload success
      console.log(data);
    }, error => {
      console.log(error);
    });
  }

  getUserDetails(id: string) {
    this.httpService.getById(id, this.apiService.API_VENDOR_DETAILS).subscribe(res => {
      if (res) {
        this.vendorData = res;
        // this.setDate(this.userData.surgeExpiryStartDate, this.surgingData.surgeExpiryEndDate);
      }
    });
  }
  setDefault() {
    this.vendorData.firstName = this.vendorData.firstName || '';
    this.vendorData.lastName = this.vendorData.lastName || '';
    this.vendorData.countryId = this.vendorData.countryId || 0;
    this.vendorData.stateId = this.vendorData.stateId || 0;
    this.vendorData.cityId = this.vendorData.cityId || 0;
    this.vendorData.email = this.vendorData.email || '';
    this.vendorData.zip = this.vendorData.zip || '';
    this.vendorData.status = this.vendorData.status || 0;
    this.vendorData.street = this.vendorData.street || '';
    this.vendorData.address = this.vendorData.address || '';
    this.vendorData.mobileNo = this.vendorData.mobileNo || '';
    this.vendorData.vendorRegistrationNo = this.vendorData.vendorRegistrationNo || '';
  }

  ngOnInit() {
    this.spinnerService.show();
    this.loadData();
    if (this.route.routeConfig.path === 'vendor/edit/:id') {
      // tslint:disable-next-line:no-unused-expression
      this.route && this.route.params.subscribe((params) => {
        this.vendorId = params['id'];
        if (this.vendorId) {
          this.getUserDetails(this.vendorId);
          this.spinnerService.hide();
        }
      });
    } else {
      this.vendorId = '';
      this.spinnerService.hide();
    }

  }
  loadData() {
    const result = this.httpService.get(this.apiService.API_COMMON_ALL_POP_DATA).subscribe(res => {
      if (res) {
        this.statesList = res['statesList'];
        this.cityList = res['cityList'];
        this.countryList = res['countryList'];
        this.statusList = res['statusList'];
      }

    });
    if (result) {
      this.spinnerService.hide();
    }
  }
}
