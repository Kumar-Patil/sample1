import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { DriverComponent } from './driver/driver.component';
import { ActivityDashboardComponent } from './auth/activity-dashboard/activity-dashboard.component';
import { AddDriverComponent } from './driver/add-driver/add-driver.component';

/* Adding new componets */
import { UserComponent } from './user/user.component';
import { VendorComponent } from './vendor/vendor.component';
import { BookingComponent } from './booking/booking.component';
import { PricingComponent } from './pricing/pricing.component';
import { CabsComponent } from './cabs/cabs.component';
import { RiderComponent } from './rider/rider.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { AddPricingComponent } from './pricing/add-edit-pricing/add-pricing.component';
import { AddEditSurgingComponent } from './surging/add-edit-surging/add-surging.component';
import { SurgingComponent } from './surging/surging.component';
import { AddEditCabComponent } from './cabs/add-edit-cab/add-edit-cab.component';
import { AddEditVendorComponent } from './vendor/add-edit-vendor/add-edit-vendor.component';
import { DSTrackingComponent } from './delivery/tracking/tracking.component';
// Reporting modules
import { CabsReportComponent } from './report/cabs/cabs-report.component';
import { DriverReportComponent } from './report/driver/driver-report.component';
import { VendorReportComponent } from './report/vendor/vendor-report.component';
import { TripsReportComponent } from './report/trips/trips-report.component';

// Finance Module
import { VendorFinanceComponent } from './finance/vendor/vendor-finance.component';
import { DriverFinanceComponent } from './finance/driver/driver-finance.component';
import { RiderFinanceComponent } from './finance/rider/rider-finance.component';
import { SettlementFinanceComponent } from './finance/settlement/settlement-finance.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'forgotPassword',
        component: ForgotPasswordComponent
    },
    {
        path: 'resetPassword',
        component: ResetPasswordComponent
    },
    {
        path: 'driver',
        component: DriverComponent
    },
    { path: 'driver/addDriver', component: AddDriverComponent },
    { path: 'driver/editDriver/:driverId', component: AddDriverComponent },
    {
        path: 'activityDashboard',
        component: ActivityDashboardComponent
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'user',
        component: UserComponent
    }
    ,
    {
        path: 'vendor',
        component: VendorComponent
    },
    { path: 'vendor/add', component: AddEditVendorComponent },
    { path: 'vendor/edit/:id', component: AddEditVendorComponent },
    {
        path: 'booking',
        component: BookingComponent
    }
    ,
    {
        path: 'pricing',
        component: PricingComponent
    }
    ,
    {
        path: 'cabs',
        component: CabsComponent
    }
    ,
    {
        path: 'rider',
        component: RiderComponent
    }
    ,
    {
        path: 'cabsReport',
        component: CabsReportComponent
    }
    ,
    {
        path: 'vendorReport',
        component: VendorReportComponent
    }
    ,
    {
        path: 'driverReport',
        component: DriverReportComponent
    }
    ,
    {
        path: 'tripsReport',
        component: TripsReportComponent
    }
    ,
    {
        path: 'accountVendor',
        component: VendorFinanceComponent
    }
    ,
    {
        path: 'accountRider',
        component: RiderFinanceComponent
    }
    ,
    {
        path: 'accountDriver',
        component: DriverFinanceComponent
    }
    ,
    {
        path: 'accountSettlement',
        component: SettlementFinanceComponent
    }
    ,
    {
        path: 'delivery',
        component: DeliveryComponent
    },
    {
        path: 'tracking',
        component: DSTrackingComponent
    }
    ,
    { path: 'user/add', component: AddUserComponent },
    { path: 'user/edit/:id', component: AddUserComponent },
    { path: 'price/add', component: AddPricingComponent },
    { path: 'price/edit/:pricingId', component: AddPricingComponent }
    ,
    {
        path: 'surging',
        component: SurgingComponent
    },
    { path: 'surge/add', component: AddEditSurgingComponent },
    { path: 'surge/edit/:surgeId', component: AddEditSurgingComponent }
    ,
    { path: 'cab/add', component: AddEditCabComponent },
    { path: 'cab/edit/:cabId', component: AddEditCabComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
