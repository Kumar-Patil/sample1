import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { DeliveryModel } from './../model/ds.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { DriverService } from '../../common/driver.service';
import { BaseApiService } from '../../common/baseApi.service';
import { DataTableDirective } from 'angular-datatables';
import { HttpService } from '../../common/http.service';
import { AlertsService } from 'angular-alert-module';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../common/api.service';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ds-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class DSTrackingComponent {
  // google maps zoom level
  zoom = 8;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  info: string;
  deliveryDataView: any;
  objectKeys: Object;
  deliveryData: DeliveryModel[] = [];
  constructor(private http: HttpClient, private driverService: DriverService, private spinnerService: Ng4LoadingSpinnerService,
    private chRef: ChangeDetectorRef, private router: Router, private baseApiService: BaseApiService, private httpService: HttpService,
    private alerts: AlertsService, config: NgbCarouselConfig,
    private modalService: NgbModal,
    private apiService: ApiService) { }
  // initial center position for the map
  // lat: number = 51.673858;
  // lng: number = 7.815982;
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.spinnerService.show();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 8
    };

    this.httpService.get(this.apiService.API_DS_LIST).subscribe(res => {
      if (res) {
        this.deliveryData = res;
        this.dtTrigger.next();
        this.spinnerService.hide();
      }
    });
  }
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
view(event: Event, delivery: DeliveryModel, content, index) {
    this.spinnerService.show();
    this.httpService.getById(delivery.deliveryId, this.apiService.API_DS_VIEW).subscribe(res => {
      if (res) {
        this.deliveryDataView = res;
        this.spinnerService.hide();
      }
    });
    this.modalService.open(content, { size: 'lg' });
  }

  delete(content, event: Event, delivery: DeliveryModel, index) {
    this.modalService.open(content, { size: 'sm' }).result.then(
      (closeResult) => {
        // modal close
        console.log('modal closed');
      },
      (dismissReason) => {
        this.deleteDS(delivery.deliveryId);
        this.alerts.setMessage('Deleted successfully!', 'success');
        // location.reload();
        this.deliveryData.splice(index, 1);
      }
    );
  }
  deleteDS(id: any) {
    this.httpService.deletById(id, this.apiService.API_DS_DELETE).subscribe(res => {
    });
  }
  // tslint:disable-next-line:member-ordering
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
}

// just an interface for type safety.
// tslint:disable-next-line:class-name
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
