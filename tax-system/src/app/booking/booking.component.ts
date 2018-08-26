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
  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) { }

  public search() {

  }
  public search1() {

  }
  ngOnInit() {
    this.mapsAPILoader.load().then(
      () => {
        let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types: ["address"] });

        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();
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
            alert('lng'+ place.geometry.location.lng());
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
