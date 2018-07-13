import { Component, OnInit, ViewChild } from '@angular/core';
import { IMyDpOptions, IMyDateModel } from 'angular4-datepicker/src/my-date-picker';
import { FileUploadService } from '../../common/service/file-upload.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddCabsDataModel } from '../model/driverData.model';
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
  templateUrl: './add-cab.component.html',
  styleUrls: ['./add-cab.component.css']
})
export class AddEditCabComponent implements OnInit {

  @ViewChild('cabDetails') cabDetails: NgForm;
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
  cabId: any;
  cabData: AddCabsDataModel;
  cabsData: any;
  vendorsList: any[] = [];
  priceList: any[] = [];
  statusList: any[] = [];
  selectedFile: {
    'photo': '',
    'agreement': ''
  };

  constructor(private route: ActivatedRoute, private spinnerService: Ng4LoadingSpinnerService, private router: Router,
    private baseApiService: BaseApiService, private driverService: DriverService, public uploader: FileUploadService,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private httpService: HttpService,
    private alerts: AlertsService) {
    this.cabData = new AddCabsDataModel();
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
      this.cabData.hireExpiry = this.cabData.hireExpiry.epoc * 1000;
      this.cabData.inuranceExpiryDate = this.cabData.inuranceExpiryDate.epoc * 1000;
      this.cabData.motExpiry = this.cabData.motExpiry.epoc * 1000;
      this.cabData.inuranceExpiryDate = this.cabData.inuranceExpiryDate.epoc * 1000;
      this.cabData.roadTaxExpiry = this.cabData.roadTaxExpiry.epoc * 1000;
      this.cabData.vehicleStart = this.cabData.vehicleStart.epoc * 1000;
      this.cabData.vendorId = this.cabData.vendorId;
      this.cabData.pricingId = this.cabData.pricingId;
      if (isAdd) {
        this.cabData.cabId = 0;
        this.httpService.post(this.cabData, this.apiService.API_CAB_ADD).subscribe(res => {
          this.alerts.setMessage('Added successfully!', 'success');
          this.router.navigate([`/cabs`]);
        });
      } else {
         this.cabData.cabId = this.cabId;
        this.httpService.put(this.cabData, this.apiService.API_CAB_UPDATE).subscribe(res => {
          if (res) {
            this.cabData = res;
            this.alerts.setMessage('Updated successfully!', 'success');
            this.router.navigate([`/cabs`]);
          }
          console.log('update success');
        });
      }
    }
  }

  setDriverData = (res) => {
    this.cabData.licencePhoto = res.licencePhoto || '';
    this.cabData.policeDisclose = res.policeDisclose || '';
    this.cabData.proofOfAddress = res.proofOfAddress || '';
    this.cabData.licencePapers = res.licencePaper || '';
    this.cabData.pcolicence = res.pcoLicence || '';
    this.cabData.inuranceCopy = res.inuranceCopy || '';
  }

  validateError(event) {
    // for proofOfAddress error handling
    const fileName = event.target.name;
    if (fileName === 'proofOfAddress' && event.target.files.length === 0) {
      this.isProofOfAddressSelected = true;
    }
  }
  setDefaultFields() {
    this.cabData.cabId = 0;
    this.cabData.documentId = 0;
    this.cabData.attributeId = 0;
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
    this.cabData[name] = this.currentFileUpload.name;
    this.uploader.pushFileToStorage(this.currentFileUpload, apiToken).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        console.log('File is completely uploaded!');
      }
    });

    this.selectedFiles = undefined;
  }

  validateForm() {
    alert('Inside');
    if (this.cabDetails.valid) {
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

  getCabDetails(driverId: string) {
    this.httpService.getById(driverId, this.apiService.API_CAB_DETAILS).subscribe(res => {
      if (res) {
        this.cabData = res;
        // this.setDate(this.driverData.startDate, this.driverData.driverLicenceExpiry);
      }
    });
  }

  setDefault() {
    this.cabData.avgCondition = this.cabData.avgCondition || '';
    this.cabData.cabColor = this.cabData.cabColor || '';
    this.cabData.cabModel = this.cabData.cabModel || '';
    this.cabData.attributeId = this.cabData.attributeId || 0;
    this.cabData.cabType = this.cabData.cabType || '';
    this.cabData.cabNo = this.cabData.cabNo || '';
    this.cabData.documentId = this.cabData.documentId || 0;
    this.cabData.eightSeater = this.cabData.eightSeater || '';
    this.cabData.cabRegistrationNo = this.cabData.cabRegistrationNo || '';
    this.cabData.exexutive = this.cabData.exexutive || '';
    this.cabData.fiveSeater = this.cabData.fiveSeater || '';
    this.cabData.fourSeater = this.cabData.fourSeater || '';
    this.cabData.status = this.cabData.status || 0;
    this.cabData.goodCOndition = this.cabData.goodCOndition || '';

    this.cabData.policeDisclose = this.cabData.policeDisclose || '';
    this.cabData.proofOfAddress = this.cabData.proofOfAddress || '';

    this.cabData.hireExpiry = this.cabData.hireExpiry || 0;
    this.cabData.insurancePolicyNumber = this.cabData.insurancePolicyNumber || '';
    this.cabData.insurer = this.cabData.insurer || '';
    this.cabData.inuranceCopy = this.cabData.inuranceCopy || '';
    this.cabData.inuranceExpiryDate = this.cabData.inuranceExpiryDate || 0;
    this.cabData.licencePapers = this.cabData.licencePapers || '';
    this.cabData.licencePhoto = this.cabData.licencePhoto || '';
    this.cabData.mot = this.cabData.mot || '';
    this.cabData.motExpiry = this.cabData.motExpiry || 0;
    this.cabData.licencePhoto = this.cabData.licencePhoto || '';
    this.cabData.ownerDriver = this.cabData.ownerDriver || '';
    this.cabData.pcolicence = this.cabData.pcolicence || '';
    this.cabData.plateNumber = this.cabData.plateNumber || '';
    this.cabData.policeDisclouser = this.cabData.policeDisclouser || '';
    this.cabData.proofOfAddress = this.cabData.proofOfAddress || '';
    this.cabData.roadTaxExpiry = this.cabData.roadTaxExpiry || 0;

    this.cabData.sevenSeater = this.cabData.sevenSeater || '';
    this.cabData.sixSeater = this.cabData.sixSeater || '';
    this.cabData.vehicleStart = this.cabData.vehicleStart || 0;
    this.cabData.wheelChair = this.cabData.wheelChair || '';
    this.cabData.yearOfRegistration = this.cabData.yearOfRegistration || '';
  }

  setDate(startDate, expiryDate): void {
    const sDate = new Date(startDate);
    const eDate = new Date(expiryDate);
    // this.driverData.startDate = { date: { year: sDate.getFullYear(), month: sDate.getMonth() + 1, day: sDate.getDate() } };
    // this.driverData.driverLicenceExpiry = { date: { year: eDate.getFullYear(), month: eDate.getMonth() + 1, day: eDate.getDate() } };

  }
  ngOnInit() {
    this.spinnerService.show();
    this.loadData();
    if (this.route.routeConfig.path === 'cab/edit/:cabId') {
      // tslint:disable-next-line:no-unused-expression
      this.route && this.route.params.subscribe((params) => {
        this.cabId = params['cabId'];
        if (this.cabId) {
          this.getCabDetails(this.cabId);
          this.spinnerService.hide();
        }
      });
    } else {
      this.formInvalid = false;
      this.cabId = '';
      this.spinnerService.hide();
    }
  }
  loadData() {
    const result = this.httpService.get(this.apiService.API_CAB_POP_UP_Data).subscribe(res => {
      if (res) {
        this.priceList = res['priceList'];
        this.vendorsList = res['vendorList'];
        this.statusList = res['statusList'];
      }

    });
    if (result) {
      this.spinnerService.hide();
    }
  }
  onDateChanged(event: IMyDateModel) {
  }
  onEndDateChanged(event: IMyDateModel) {
  }
}
