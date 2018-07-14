import { Component, OnInit, ViewChild } from '@angular/core';
import { IMyDpOptions, IMyDateModel } from 'angular4-datepicker/src/my-date-picker';
import { FileUploadService } from '../../common/service/file-upload.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddDriverDataModel } from '../model/driverData.model';
import { BaseApiService } from '../../common/baseApi.service';
import { DriverService } from '../../common/driver.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Observable } from 'rxjs/Observable';
import { HttpEventType } from '@angular/common/http';
import { ApiService } from '../../common/api.service';
import { HttpService } from '../../common/http.service';
import { AlertsService } from 'angular-alert-module';
@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.css']
})
export class AddDriverComponent implements OnInit {

  @ViewChild('personalDetails') personalDetails: NgForm;
  @ViewChild('loginDetails') loginDetails: NgForm;
  @ViewChild('licencing') licencing: NgForm;
  // private licencing: FormGroup;
  @ViewChild('fileInput') fileInput;

  private formInvalid: boolean;
  private isLoginValid = false;
  private isPersonalDetailsValid = false;
  private isLicencingValid = false;

  selectedFiles: FileList;
  currentFileUpload: File;
  userId: string;
  isProofOfAddressSelected = false;
  // queue: Observable<FileQueueObject[]>;
  driverId: string;
  driverData: AddDriverDataModel;
  statesList: any[] = [];
  countryList: any[] = [];
  statusList: any[] = [];
  cityList: any[] = [];
  cabList: any[] = [];
  selectedFile: {
    'photo': '',
    'agreement': ''
  };

  constructor(private route: ActivatedRoute, 
    private spinnerService: Ng4LoadingSpinnerService, 
    private router: Router,
    private baseApiService: BaseApiService, 
    private driverService: DriverService, 
    public uploader: FileUploadService,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private httpService: HttpService,
    private alerts: AlertsService) {
    this.driverData = new AddDriverDataModel();
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
      this.driverData.startDate = this.driverData.startDate.epoc * 1000;
      this.driverData.driverLicenceExpiry = this.driverData.driverLicenceExpiry.epoc * 1000;
      if (isAdd) {
        this.driverData.driverId = 0;
        this.httpService.post(this.driverData, this.apiService.API_DRIVER_ADD).subscribe(res => {
          this.alerts.setMessage('Added successfully!', 'success');
          this.router.navigate([`/driver`]);
        });
      } else {
        this.driverData.driverId = this.driverData.driverId;
        this.httpService.put(this.driverData, this.apiService.API_DRIVER_UPDATE).subscribe(res => {
          if (res) {
            this.driverData = res;
            this.alerts.setMessage('Updated successfully!', 'success');
            this.router.navigate([`/driver`]);
          }
          console.log('update success');
        });
      }
    }
  }

  setDriverData = (res) => {
    this.driverData.agreement = res.agreement || '';
    this.driverData.insurance = res.insurance || '';
    this.driverData.licencePaper = res.licencePaper || '';
    this.driverData.licencePhoto = res.licencePhoto || '';
    this.driverData.pcoLicence = res.pcoLicence || '';
    this.driverData.photo = res.photo || '';
    this.driverData.policeDisclose = res.policeDisclose || '';
    this.driverData.proofOfAddress = res.proofOfAddress || '';
  }

  validateError(event) {
    // for proofOfAddress error handling
    const fileName = event.target.name;
    if (fileName === 'proofOfAddress' && event.target.files.length === 0) {
      this.isProofOfAddressSelected = true;
    }
  }
  setDefaultFields() {
    this.driverData.address = 'Rajajinagar';
    this.driverData.driverAttribteId = 0;
    this.driverData.driverDocumentId = 0;
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
    } else {
      if (name === 'proofOfAddress') {
        this.isProofOfAddressSelected = true;
      }
    }
  }
  setUploadFilesValue(name) {

  }

  upload(name: string) {
    const apiToken = this.baseApiService.getApiToken();
    this.currentFileUpload = this.selectedFiles.item(0);
    this.driverData[name] = this.currentFileUpload.name;
    this.uploader.pushFileToStorage(this.currentFileUpload, apiToken).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        console.log('File is completely uploaded!');
      }
    });

    this.selectedFiles = undefined;
  }

  validateForm() {
    if (this.loginDetails.valid && this.personalDetails.valid && this.licencing.valid) {
      this.formInvalid = false;
      return true;
    } else {
      return false;
    }
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

  getDriverDetails(driverId: string) {
    this.httpService.getById(driverId, this.apiService.API_DRIVER_DETAILS).subscribe(res => {
      if (res) {
        this.driverData = res;
        this.setDate(this.driverData.startDate, this.driverData.driverLicenceExpiry);
      }
    });
  }

  setDefault() {
    alert(this.driverData.cabId);
    this.driverData.mobileNo = this.driverData.mobileNo || 0;
    this.driverData.firstName = this.driverData.firstName || '';
    this.driverData.lastName = this.driverData.lastName || '';
    this.driverData.countryId = this.driverData.countryId || 0;
    this.driverData.mobileNo = this.driverData.mobileNo || 0;
    this.driverData.password = this.driverData.password || '';
    this.driverData.stateId = this.driverData.stateId || 0;
    this.driverData.cityId = this.driverData.cityId || 0;
    this.driverData.sex = this.driverData.sex || '';
    this.driverData.email = this.driverData.email || '';
    this.driverData.zip = this.driverData.zip || '';
    this.driverData.pets = this.driverData.pets || '';
    this.driverData.status = this.driverData.status || 0;
    this.driverData.photo = this.driverData.photo || '';
    this.driverData.policeDisclose = this.driverData.policeDisclose || '';
    this.driverData.proofOfAddress = this.driverData.proofOfAddress || '';
    this.driverData.street = this.driverData.street || '';
    this.driverData.topman = this.driverData.topman || '';
    this.driverData.uniformed = this.driverData.uniformed || '';
    this.driverData.otherPhone = this.driverData.otherPhone || 0;
    this.driverData.crb = this.driverData.crb || '';
    this.driverData.aliasName = this.driverData.aliasName || '';
    this.driverData.cabId = this.driverData.cabId || 0;
    this.driverData.agreement = this.driverData.agreement || '';
    this.driverData.licencePaper = this.driverData.licencePaper || '';
    this.driverData.licencePhoto = this.driverData.licencePhoto || '';
    this.driverData.pcoLicence = this.driverData.pcoLicence || '';
    this.driverData.insurance = this.driverData.insurance || '';
    this.driverData.delivery = this.driverData.delivery || '';
    this.driverData.female = this.driverData.female || '';
    this.driverData.luggage = this.driverData.luggage || '';
    this.driverData.nhs = this.driverData.nhs || '';
    this.driverData.driverLicenceNumber = this.driverData.driverLicenceNumber || '';
  }

  setDate(startDate, expiryDate): void {
    const sDate = new Date(startDate);
    const eDate = new Date(expiryDate);
    this.driverData.startDate = { date: { year: sDate.getFullYear(), month: sDate.getMonth() + 1, day: sDate.getDate() } };
    this.driverData.driverLicenceExpiry = { date: { year: eDate.getFullYear(), month: eDate.getMonth() + 1, day: eDate.getDate() } };

  }
  ngOnInit() {
    this.spinnerService.show();
    this.loadData();
    if (this.route.routeConfig.path === 'driver/editDriver/:driverId') {
      // tslint:disable-next-line:no-unused-expression
      this.route && this.route.params.subscribe((params) => {
        this.driverId = params['driverId'];
        if (this.driverId) {
          this.getDriverDetails(this.driverId);
          this.spinnerService.hide();
        }
      });
    } else {
      this.formInvalid = false;
      this.driverId = '';
      this.spinnerService.hide();
    }
  }
  loadData() {
    const result = this.httpService.get(this.apiService.API_COMMON_ALL_POP_DATA).subscribe(res => {
      if (res) {
        this.statesList = res['statesList'];
        this.cabList = res['cabList'];
        this.cityList = res['cityList'];
        this.countryList = res['countryList'];
        this.statusList = res['statusList'];
      }

    });
    if (result) {
      this.spinnerService.hide();
    }
  }
  onDateChanged(event: IMyDateModel) {
    // alert(event.epoc);
    // this.surgingData.surgeExpiryStartDate = event.epoc;
    // event properties are: event.date, event.jsdate, event.formatted and event.epoc
  }
  onEndDateChanged(event: IMyDateModel) {
    // this.surgingData.surgeExpiryEndDate = event.epoc;
  }
}
