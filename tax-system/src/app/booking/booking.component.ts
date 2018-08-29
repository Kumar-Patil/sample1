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
  constructor(private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {
    this.userData = new AddUserDataModel();
  }

  public search() {

  }
  public search1() {

  }
  public addOrUpdateDriverData(val) {
    alert('Got it b');
    alert(this.userData.name);
  }
  ngOnInit() {
    this.mapsAPILoader.load().then(
      () => {
        let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types: ["address"] });

        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();
            alert(place.formatted_address);
            alert("lattitude" + place.geometry.location.lat());
            alert("lngi" + place.geometry.location.lat());
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
          });
        });
      }
    );

    this.mapsAPILoader.load().then(
      () => {
        let autocomplete = new google.maps.places.Autocomplete(this.searchElement1.nativeElement, { types: ["address"] });
        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();
            alert(place.adr_address)
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
