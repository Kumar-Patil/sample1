import { Component } from '@angular/core';
import { MouseEvent } from '@agm/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ds-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class DSTrackingComponent {
  // google maps zoom level
  zoom = 8;

  // initial center position for the map
  // lat: number = 51.673858;
  // lng: number = 7.815982;

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  // tslint:disable-next-line:member-ordering
  markers: marker[] = [
    /*{
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
    ,*/
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
}

// just an interface for type safety.
// tslint:disable-next-line:class-name
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
