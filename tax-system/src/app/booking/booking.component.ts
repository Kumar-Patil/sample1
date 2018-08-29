import { Component, OnInit } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { } from '@types/googlemaps';
import { AddUserDataModel } from './model/userData.model';
import { ViewChild, ElementRef, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  @ViewChild('source') public searchElement: ElementRef;
  @ViewChild('destination') public searchElement1: ElementRef;
  @ViewChild('book') book: NgForm;
  userData: AddUserDataModel;
  destinaton_address: any;
  source_address: any;
  surge: boolean;
  boost: boolean;
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
      draggable: false
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
    {
      'cust_id': 'geomie',
      'driver': 'nekr',
      'source': 'geredc',
      'destination': 'wwedsa',
      'time': '3423',
      'eta': 'rewe',
      'status': 'active'
    }
  ];
  constructor(private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {
    this.userData = new AddUserDataModel();
  }

  public search() {

  }
  public search1() {

  }
  public addOrUpdateDriverData() {
    alert(this.userData.source);
  }
  ngOnInit() {
    this.boost = true;
    this.surge = true;
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
