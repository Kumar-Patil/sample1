import { Component, OnInit, ViewChild } from '@angular/core';
import { IMyDpOptions, IMyDateModel } from 'angular4-datepicker/src/my-date-picker';
import { FileUploadService } from '../../common/service/file-upload.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SurgingAddEditModel } from '../model/surgingAddOrEdit.model';
import { BaseApiService } from '../../common/baseApi.service';
import { DriverService } from '../../common/driver.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Observable } from 'rxjs/Observable';
import { HttpEventType } from '@angular/common/http';
import { HttpService } from '../../common/http.service';
import { AlertsService } from 'angular-alert-module';
import { ApiService } from '../../common/api.service';
@Component({
  selector: 'app-add-driver',
  templateUrl: './add-surging.component.html',
  styleUrls: ['./add-surging.component.css']
})
export class AddEditSurgingComponent implements OnInit {

  @ViewChild('surgingDetails') surgingDetails: NgForm;
  private formInvalid: boolean;
  private isLoginValid = false;
  private isPersonalDetailsValid = false;
  private isLicencingValid = false;

  selectedFiles: FileList;
  currentFileUpload: File;
  userId: string;
  isProofOfAddressSelected = false;
  // queue: Observable<FileQueueObject[]>;
  surgeId: string;
  surgingData: SurgingAddEditModel;
  statusList: any[] = [];
  constructor(private route: ActivatedRoute, private spinnerService: Ng4LoadingSpinnerService, private router: Router,
    private baseApiService: BaseApiService, private driverService: DriverService, public uploader: FileUploadService,
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private alerts: AlertsService,
    private apiService: ApiService) {
    this.surgingData = new SurgingAddEditModel();
  }

  public surgeExpiryStartDateOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd-mm-yyyy',
  };

  // Initialized to specific date (09.10.2018).
  public surgeExpiryStartDate: any = {
    date: { year: 2018, month: 10, day: 9 }
  };

  public surgeExpiryEndDateOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd-mm-yyyy',
  };

  public surgeExpiryEndDate: any = { date: { year: 2018, month: 10, day: 9 } };

  public insurenceExpiryDateOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd-mm-yyyy',
  };

  public insurenceExpiryDate: any = { date: { year: 2018, month: 10, day: 9 } };

  // file uploader
  fileToUpload: File = null;

  addOrUpdateDriverData(isAdd: boolean) {
    if (this.validateForm()) {
      this.surgingData.surgeExpiryStartDate = this.surgingData.surgeExpiryStartDate.epoc * 1000;
      this.surgingData.surgeExpiryEndDate = this.surgingData.surgeExpiryEndDate.epoc * 1000;
      if (isAdd) {
        this.setDefaultFields();
        this.httpService.post(this.surgingData, this.apiService.API_SURGE_ADD).subscribe(res => {
          this.alerts.setMessage('Added successfully!', 'success');
          this.router.navigate([`/surging`]);
        });
      } else {
        this.httpService.put(this.surgingData, this.apiService.API_SURGE_UPDATE).subscribe(res => {
          if (res) {
            this.surgingData = res;
          }
          this.alerts.setMessage('Updated successfully!', 'success');
          this.router.navigate([`/surging`]);
        });
      }
    }
  }

  setDriverData = (res) => {
  }

  setDefaultFields() {
    this.surgingData.surgeId = 0;
  }

  validateForm() {
    if (this.surgingDetails.valid) {
      this.formInvalid = false;
      return true;
    } else {
      return false;
    }
  }

  setDefault() {
    this.surgingData.surgeExpiryStartDate = this.surgingData.surgeExpiryStartDate;
    this.surgingData.surgeExpiryEndDate = this.surgingData.surgeExpiryEndDate;
  }

  setDate(startDate, expiryDate): void {
    const sDate = new Date(startDate);
    const eDate = new Date(expiryDate);
    this.surgingData.surgeExpiryStartDate = { date: { year: sDate.getFullYear(), month: sDate.getMonth() + 1, day: sDate.getDate() } };
    this.surgingData.surgeExpiryEndDate = { date: { year: eDate.getFullYear(), month: eDate.getMonth() + 1, day: eDate.getDate() } };

  }
  ngOnInit() {
    this.spinnerService.show();
    this.getStatusList();
    if (this.route.routeConfig.path === 'surge/edit/:surgeId') {
      // tslint:disable-next-line:no-unused-expression
      this.route && this.route.params.subscribe((params) => {
        this.surgeId = params['surgeId'];
        if (this.surgeId) {
          this.getPricingDetails(this.surgeId);
          this.spinnerService.hide();
        }
      });
    } else {
      this.formInvalid = false;
      this.surgeId = '';
      this.spinnerService.hide();
    }
  }
  getPricingDetails(id: string) {
    this.httpService.getById(id, this.apiService.API_SURGE_DETAILS).subscribe(res => {
      if (res) {
        this.surgingData = res;
        this.setDate(this.surgingData.surgeExpiryStartDate, this.surgingData.surgeExpiryEndDate);
      }
    });
  }
  onDateChanged(event: IMyDateModel) {
    // alert(event.epoc);
    // this.surgingData.surgeExpiryStartDate = event.epoc;
    // event properties are: event.date, event.jsdate, event.formatted and event.epoc
  }
  onEndDateChanged(event: IMyDateModel) {
    // this.surgingData.surgeExpiryEndDate = event.epoc;
  }
  getStatusList() {
    this.httpService.get(this.apiService.API_COMMON_STATUS_LIST).subscribe(res => {
      if (res) {
        this.statusList = res;
      }
    });
  }
}
