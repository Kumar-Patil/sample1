import { Component, OnInit, OnDestroy } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { } from '@types/googlemaps';
import { AddUserDataModel } from './model/userData.model';
import { ViewChild, ElementRef, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../common/api.service';
import { AlertsService } from 'angular-alert-module';
import { HttpService } from '../common/http.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
import { BoostPricing } from './model/boost.model';
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  objectKeys: Object;
  @ViewChild('source') public searchElement: ElementRef;
  @ViewChild('destination') public searchElement1: ElementRef;
  @ViewChild('book') book: NgForm;
  userData: AddUserDataModel;
  boostPricing: BoostPricing;
  destinaton_address: any;
  source_address: any;
  surge: boolean;
  boost: boolean;
  public interValId: any;
  public inProgressId: any;
  public selectedValues: any;
  markers: marker[] = [
    {
      lat: 12.3136505,
      lng: 76.65913969999997,
      label: 'Source',
      draggable: true
      ,
      iconUrl: 'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png'

    },
    {
      lat: 17.3146607,
      lng: 76.82492090000005,
      label: 'Destination',
      draggable: false,
      iconUrl: ''
    }/*,
    {
      lat: -18.142,
      lng: 178.431,
      label: 'C',
      draggable: true
    }
    ,
    {
      lat: -27.467,
      lng: 153.027,
      label: 'D',
      draggable: true
    }*/
  ];

  cabs = [
    /*{
      'cust_id': 'geomie',
      'driver': 'nekr',
      'source': 'geredc',
      'destination': 'wwedsa',
      'time': '3423',
      'eta': 'rewe',
      'status': 'active'
    }*/
  ];
  constructor(private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone, private apiService: ApiService,
    private alerts: AlertsService,
    private httpService: HttpService,
    private spinnerService: Ng4LoadingSpinnerService
  ) {
    this.userData = new AddUserDataModel();
  }

  public search() {

  }
  public search1() {

  }

  public boostFare(event: any) {
    this.boostPricing.boostEnable = event;
    this.boost = event;
    this.httpService.put(this.boostPricing, this.apiService.API_GET_ENABLE_DISABLE_BOOSTING).subscribe(res => {
    });
  }
  public surgePricing(event: any) {
    this.boostPricing.surgeEnable = event;
    this.surge = event;
    this.httpService.put(this.boostPricing, this.apiService.API_GET_ENABLE_DISABLE_BOOSTING).subscribe(res => {
    });
  }
  public getEnableOrDisableValue() {
    this.httpService.get(this.apiService.API_ENABLE_DISABLE_BOOSTING).subscribe(res => {
      if (res) {
        this.boostPricing = res;
        this.boost = this.boostPricing.boostEnable;
        this.surge = this.boostPricing.surgeEnable;
        this.spinnerService.hide();
      }
    });
  }
  selectChangeHandler(event: any) {
    this.selectedValues = event.target.value;
  }
  private polyData() {
    console.log('Every time interval calling' + this.selectedValues);
    this.httpService.getMapData(this.apiService.API_MAP_DETAILS, this.selectedValues).subscribe(res => {
      if (res) {
        this.markers = res;
        this.spinnerService.hide();
      }
    });
  }
  private inProgress() {
    console.log('Calling Eevery inProgress');
    this.httpService.get(this.apiService.API_TRIP_ON_GOING_LIST).subscribe(res => {
      if (res) {
        this.cabs = res;
        this.spinnerService.hide();
      }
    });
  }
  ngOnDestroy(): void {
    if (this.interValId) {
      clearInterval(this.interValId);
    }
    if (this.inProgressId) {
      clearInterval(this.inProgressId);
    }
  }
  ngOnInit() {
    this.selectedValues = 'all';
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 8
    };

    this.mapsAPILoader.load().then(
      () => {
        let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types: ['address'] });
        autocomplete.addListener('place_changed', () => {
          this.ngZone.run(() => {
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();
            this.userData.source = place.formatted_address;
            this.userData.sourceLattitude = place.geometry.location.lat();
            this.userData.sourceLngitude = place.geometry.location.lng();
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
          });
        });
      }
    );

    this.mapsAPILoader.load().then(
      () => {
        let autocomplete = new google.maps.places.Autocomplete(this.searchElement1.nativeElement, { types: ['address'] });
        autocomplete.addListener('place_changed', () => {
          this.ngZone.run(() => {
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();
            this.userData.destination = place.formatted_address;
            this.userData.destinationLattitud = place.geometry.location.lat();
            this.userData.destinationLngitude = place.geometry.location.lng();
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
          });
        });
      }
    );

    // Poly data
    this.polyData();
    this.interValId = setInterval(() => {
      this.polyData();
    }, 5000);

    this.inProgress();
    this.inProgressId = setInterval(() => {
      this.inProgress();
    }, 5000);

    this.getEnableOrDisableValue();
  }
}

// tslint:disable-next-line:class-name
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  iconUrl?: string;
}
