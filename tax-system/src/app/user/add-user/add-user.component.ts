import { Component, OnInit, ViewChild } from '@angular/core';
import { IMyDpOptions } from 'angular4-datepicker/src/my-date-picker';
import { FileUploadService } from '../../common/service/file-upload.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AddUserDataModel } from '../model/userData.model';
import { BaseApiService } from '../../common/baseApi.service';
import { DriverService } from '../../common/driver.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Observable } from 'rxjs/Observable';
import { HttpEventType } from '@angular/common/http';
import { ApiService } from '../../common/api.service';
import { HttpService } from '../../common/http.service';
import { AlertsService } from 'angular-alert-module';
import { element } from 'protractor';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  @ViewChild('personalDetails') personalDetails: NgForm;
  @ViewChild('licencing') licencing: NgForm;
  @ViewChild('fileInput') fileInput;
  selectedFiles: FileList;
  currentFileUpload: File;
  userId: string;
  // queue: Observable<FileQueueObject[]>;
  userData: AddUserDataModel;
  statesList: any[] = [];
  countryList: any[] = [];
  cityList: any[] = [];
  cabList: any[] = [];
  statusList: any[] = [];
  private formInvalid: boolean;
  private isVendor: boolean;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private spinnerService: Ng4LoadingSpinnerService,
    private baseApiService: BaseApiService,
    private driverService: DriverService,
    public uploader: FileUploadService,
    private apiService: ApiService,
    private httpService: HttpService,
    private alerts: AlertsService) {
    this.userData = new AddUserDataModel();
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
      this.userData.hireDate = this.userData.hireDate.epoc * 1000;
      this.userData.hireEndDate = this.userData.hireEndDate.epoc * 1000;
      if (isAdd) {
        this.httpService.post(this.userData, this.apiService.API_USER_ADD).subscribe(res => {
          this.alerts.setMessage('Added successfully!', 'success');
          this.router.navigate([`/user`]);
        });
      } else {
        this.userData.id = this.userData.id;
        alert(this.userData.id);
        this.httpService.put(this.userData, this.apiService.API_USER_UPDATE).subscribe(res => {
          if (res) {
            this.userData = res;
            this.alerts.setMessage('Updated successfully!', 'success');
            this.router.navigate([`/user`]);
          }
          console.log('update success');
        });
      }
    }
  }
  validateForm() {
    if (this.personalDetails.valid && this.licencing.valid) {
      this.formInvalid = false;
      return true;
    } else {
      return false;
    }
  }
  setDefaultFields() {
    this.userData.address = 'Rajajinagar';
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
    this.userData[name] = this.currentFileUpload.name;
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
    this.httpService.getById(id, this.apiService.API_USER_DETAILS).subscribe(res => {
      if (res) {
        this.userData = res;
        // this.setDate(this.userData.surgeExpiryStartDate, this.surgingData.surgeExpiryEndDate);
      }
    });
  }
  setDefault() {
    this.userData.firstName = this.userData.firstName || '';
    this.userData.lastName = this.userData.lastName || '';
    this.userData.countryId = this.userData.countryId || 0;
    this.userData.password = this.userData.password || '';
    this.userData.stateId = this.userData.stateId || 0;
    this.userData.cityId = this.userData.cityId || 0;
    this.userData.sex = this.userData.sex || '';
    this.userData.email = this.userData.email || '';
    this.userData.zip = this.userData.zip || '';
    this.userData.status = this.userData.status || 0;
    this.userData.proofOfAddress = this.userData.proofOfAddress || '';
    this.userData.street = this.userData.street || '';
    this.userData.accountNo = this.userData.accountNo || '';
    this.userData.aggrement1 = this.userData.aggrement1 || '';
    this.userData.aggrement2 = this.userData.aggrement2 || '';
    this.userData.aggrement3 = this.userData.aggrement4 || '';
    this.userData.aggrement3 = this.userData.aggrement3 || '';
    this.userData.address = this.userData.address || '';
    this.userData.hireDate = this.userData.hireDate || 0;
    this.userData.hireEndDate = this.userData.hireEndDate || 0;
    this.userData.ifsc = this.userData.ifsc || '';
    this.userData.name = this.userData.name || '';
    this.userData.otherphone = this.userData.otherphone || '';
    this.userData.userPic = this.userData.userPic || '';
    this.userData.phone = this.userData.phone || '';
    this.userData.regNo = this.userData.regNo || '';
  }

  ngOnInit() {
    this.spinnerService.show();
    this.loadData();
    if (this.route.routeConfig.path === 'user/edit/:id') {
      // tslint:disable-next-line:no-unused-expression
      this.route && this.route.params.subscribe((params) => {
        this.userId = params['id'];
        if (this.userId) {
          this.getUserDetails(this.userId);
          this.spinnerService.hide();
        }
      });
    } else {
      this.userId = '';
      this.spinnerService.hide();
    }
    this.isVendor = false;
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
  selectChangeHandler(event: any) {
    if (event.target.value === 'Vendor') {
      this.isVendor = true;
    } else {
      this.isVendor = false;
    }
  }
}
