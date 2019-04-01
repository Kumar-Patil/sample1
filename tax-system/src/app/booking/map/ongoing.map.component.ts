import { Component } from "@angular/core";
import { MouseEvent, google } from "@agm/core/services/google-maps-types";
import { MarkerManager } from "@agm/core/services/managers/marker-manager";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { MapUtilService } from "../../shared/services/map.util.service";

@Component({
    selector: 'ongoing-cabs',
    templateUrl: './ongoing.component.html',
    styleUrls: ['./ongoing.component.css'],
})
export class OngoingMapComponent implements OnInit {


    zoom: number = 14;
    multiple = 1;
    lngMutltiple = -1;


    constructor(private mapUtilService: MapUtilService) {

    }


    clickedMarker(label: string, index: number) {
        console.log(`clicked the marker: ${label || index}`)
    }

    ngOnInit() {

        // let svg = new SVGElement('');
        // svg.setAttribute('', '');

        let updateTimeout = () => {
            setTimeout(() => {
                this.multiple++;
                this.updateMap();
                console.log('init updateTimeout');
                updateTimeout();
            }, 5000);
        }

        console.log('init');
        updateTimeout();
    }
    // mapClicked($event: any) {
    //     this.markers.push({
    //         lat: $event.coords.lat,
    //         lng: $event.coords.lng,
    //         draggable: true
    //     });
    // }

    // markerDragEnd(m: Marker, $event: MouseEvent) {
    //     console.log('dragEnd', m, $event);
    // }


    markers: Marker[] = [
        {
            lat: 51.373858,
            lng: 7.215982,
            label: new MarkerLabel('1'),
            draggable: true,
            icon: './assets/icons/car-marker-0.svg'
        },
        {
            lat: 51.373858,
            lng: 7.215982,
            label: new MarkerLabel('2'),
            draggable: false,
            icon: './assets/icons/car-marker-0.svg'
        },
        {
            lat: 51.373858,
            lng: 7.215982,
            label: new MarkerLabel('3'),
            draggable: true,
            icon: './assets/icons/car-marker-0.svg'
        }
    ]

    updateMap() {
        for (let i=0; i< this.markers.length ; i++) {
            this.lngMutltiple = Math.pow(-1, this.multiple % 3);
            const lat = this.markers[i].lat + 0.000121 * Math.pow(5, (this.multiple + i) % 3) * this.lngMutltiple;
            const lng = this.markers[i].lng + 0.000821 * Math.pow(3, (this.multiple+i) % 3) * this.lngMutltiple;

            const oldLoc = { lat: this.markers[i].lat, lng: this.markers[i].lng };
            const newLoc = { lat: lat, lng: lng };
            const angle = this.mapUtilService.angleFromCoordinate(oldLoc, newLoc);
            console.log(angle);
            const iconUrl = this.mapUtilService.getIconUrl(angle);
            console.log(iconUrl);
            this.markers[i].icon = iconUrl;

            this.mapUtilService.transition(this.markers[i], [lat, lng]);
        }

    }

    max(coordType: 'lat' | 'lng'): number {
        return Math.max(...this.markers.map(marker => marker[coordType]));
    }

    min(coordType: 'lat' | 'lng'): number {
        return Math.min(...this.markers.map(marker => marker[coordType]));
    }
}

export interface Marker {
    lat: number;
    lng: number;
    label?: any;
    draggable: boolean;
    icon?: any;
}

export class MarkerLabel {
        color= '#f40b0b';
        fontFamily= '';
        backGroundColor='white';
        fontSize= '16px';
        fontWeight= 'bold';
        text= '';
    
    constructor(text: string) {
        this.text = text;
    }
}