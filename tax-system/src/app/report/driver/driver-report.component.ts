import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './driver-report.component.html',
  styleUrls: ['./driver-report.component.css']
})
export class DriverReportComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log(sessionStorage.getItem('authSuccess'));
  }

}
