import { Injectable } from "@angular/core";
import { Marker } from "../../booking/map/ongoing.map.component";

@Injectable()
export class MapUtilService {


    numDeltas = 100;
    delay = 10; //milliseconds

    transition(marker: Marker, result) {

        let i = 0;
        const deltaLat = (result[0] - marker.lat) / this.numDeltas;
        const deltaLng = (result[1] - marker.lng) / this.numDeltas;

        const delta = [deltaLat, deltaLng];
        let moveMarker = () => {
            marker.lat += delta[0];
            marker.lng += delta[1];
            // console.log(marker.lng + '' + marker.lat);
            if (i != this.numDeltas) {
                i++;
                setTimeout(() => {
                    moveMarker();
                }, this.delay);
            }
        };

        moveMarker();

    }

    angleFromCoordinate(oldLoc: any, newLoc: any) {
        let dy = newLoc['lat'] - oldLoc['lat'];
        let dx = Math.cos(Math.PI / 180 * oldLoc['lat']) * (newLoc['lng'] - oldLoc['lng']);
        let angle = Math.atan2(dy, dx);
        angle = angle * (180.0 / Math.PI);
        angle = 90 - angle;

        return angle;
    }

    getIconUrl(angle: any) {

        let iconUrl = './assets/icons/car-marker-0.svg';

        angle = this.getAngle(angle);
        if (angle > 315 || angle <= 20) {
            iconUrl = './assets/icons/car-marker-0.svg';
        }

        if (angle > 20 && angle <= 60) {
            iconUrl = './assets/icons/car-marker-45.svg';
        }

        if (angle > 60 && angle <= 110) {
            iconUrl = './assets/icons/car-marker-90.svg';
        }

        if (angle > 110 && angle <= 155) {
            iconUrl = './assets/icons/car-marker-135.svg';
        }

        if (angle > 155 && angle <= 200) {
            iconUrl = './assets/icons/car-marker-180.svg';
        }
        if (angle > 200 && angle <= 245) {
            iconUrl = './assets/icons/car-marker-225.svg';
        }

        if (angle > 245 && angle <= 300) {
            iconUrl = './assets/icons/car-marker-270.svg';
        }

        if (angle > 300 && angle <= 345) {
            iconUrl = './assets/icons/car-marker-315.svg';
        }

        return iconUrl;
    }

    getAngle(angle) {
        if (angle < 0) {
            angle = 360 + angle;
            return this.getAngle(angle);
        }
        if (angle >= 360) {
            angle = 360 - angle;
            return this.getAngle(angle);
        }
        return angle;
    }

}
