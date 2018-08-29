import { Component, OnInit } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { } from '@types/googlemaps';

import { ViewChild, ElementRef, NgZone } from '@angular/core';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  @ViewChild('search') public searchElement: ElementRef;
  @ViewChild('source') public searchElement1: ElementRef;

  markers: marker[] = [
    {
      lat: 51.673858,
      lng: 7.815982,
      label: 'A',
      draggable: true
    },
    {
      lat: 51.373858,
      lng: 7.215982,
      label: 'B',
      draggable: false
    },
    {
      lat: 51.723858,
      lng: 7.895982,
      label: 'C',
      draggable: true
    }
    ,
    {
      lat: 52.723858,
      lng: 6.895982,
      label: 'D',
      draggable: true
    }
    ,
    {
      lat: 12.860198,
      lng: 77.66,
      label: 'E',
      draggable: true
    },
    {
      lat: 12.860198,
      lng: 77.66,
      label: 'B',
      draggable: true
    }
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
  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) { }

  public search() {

  }
  public search1() {

  }
  ngOnInit() {
    this.mapsAPILoader.load().then(
      () => {
        let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types: ["address"] });

        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          alert('lattitude' + place.geometry.location.lat());
          console.log('latttttt---'+place.geometry.location.lat());
          alert('lngi' + place.geometry.location.lat());
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
        });
      });

  this.mapsAPILoader.load().then(
  () => {
    let autocomplete = new google.maps.places.Autocomplete(this.searchElement1.nativeElement, { types: ["address"] });

    autocomplete.addListener("place_changed", () => {
      this.ngZone.run(() => {
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();
        alert('lng' + place.geometry.location.lng());
        alert("lngi" + place.geometry.location.lat());
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
}
