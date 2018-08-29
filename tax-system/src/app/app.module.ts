import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NavComponent } from './nav/nav.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { DriverComponent } from './driver/driver.component';
import { FooterComponent } from './footer/footer.component';
import { ActivityDashboardComponent } from './auth/activity-dashboard/activity-dashboard.component';
import { LoggingService } from './common/service/loggin.service';
import { AuthService } from './common/service/auth.service';
import { HeaderLinkComponent } from './nav/header-link/header-link.component';
import { AddDriverComponent } from './driver/add-driver/add-driver.component';
import { MyDatePickerModule } from 'mydatepicker';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { DriverService } from './common/driver.service';
import { FileUploadService } from './common/service/file-upload.service';
import { ChangePasswordComponent } from './nav/change-password/change-password.component';
import { BaseApiService } from './common/baseApi.service';
import { DeleteModalComponent } from './common/delete/delete-modal/delete-modal.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
/* Adding new components */
import { UserComponent } from './user/user.component';
import { VendorComponent } from './vendor/vendor.component';
import { BookingComponent } from './booking/booking.component';
import { PricingComponent } from './pricing/pricing.component';
import { CabsComponent } from './cabs/cabs.component';
import { RiderComponent } from './rider/rider.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { HttpService } from './common/http.service';
import { AlertsModule } from 'angular-alert-module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddUserComponent } from './user/add-user/add-user.component';
import { AddPricingComponent } from './pricing/add-edit-pricing/add-pricing.component';
import { AddEditSurgingComponent } from './surging/add-edit-surging/add-surging.component';
import { SurgingComponent } from './surging/surging.component';
import { ApiService } from './common/api.service';
import { AddEditCabComponent } from './cabs/add-edit-cab/add-edit-cab.component';
import { AddEditVendorComponent } from './vendor/add-edit-vendor/add-edit-vendor.component';
import { AgmCoreModule } from '@agm/core';
import { DSTrackingComponent } from './delivery/tracking/tracking.component';
// Reporting Modules
import { CabsReportComponent } from './report/cabs/cabs-report.component';
import { DriverReportComponent } from './report/driver/driver-report.component';
import { VendorReportComponent } from './report/vendor/vendor-report.component';
import { TripsReportComponent } from './report/trips/trips-report.component';
// Finance Module
import { VendorFinanceComponent } from './finance/vendor/vendor-finance.component';
import { DriverFinanceComponent } from './finance/driver/driver-finance.component';
import { RiderFinanceComponent } from './finance/rider/rider-finance.component';
import { SettlementFinanceComponent } from './finance/settlement/settlement-finance.component';
import { UiSwitchModule } from 'ngx-toggle-switch';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    NavComponent,
    ResetPasswordComponent,
    DriverComponent,
    FooterComponent,
    ActivityDashboardComponent,
    HeaderLinkComponent,
    AddDriverComponent,
    ChangePasswordComponent,
    DeleteModalComponent,
    UserComponent,
    VendorComponent,
    BookingComponent,
    PricingComponent,
    CabsComponent,
    RiderComponent,
    CabsReportComponent,
    VendorFinanceComponent,
    DeliveryComponent,
    AddUserComponent,
    AddPricingComponent,
    AddEditSurgingComponent,
    SurgingComponent,
    AddEditCabComponent,
    AddEditVendorComponent,
    DSTrackingComponent,
    DriverReportComponent,
    VendorReportComponent,
    TripsReportComponent,
    RiderFinanceComponent,
    DriverFinanceComponent,
    SettlementFinanceComponent,
  ],
  imports: [
    UiSwitchModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    MyDatePickerModule,
    HttpClientModule,
    DataTablesModule,
    ReactiveFormsModule,
    Ng4LoadingSpinnerModule.forRoot(),
    AlertsModule.forRoot(),
    NgbModule.forRoot(),
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyDVttFh9cUbhvjKM0Vscrk-X7CmSXCzq24',
      libraries: ['places']
    })
  ],
  providers: [AuthService, DriverService, FileUploadService, BaseApiService, HttpService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
