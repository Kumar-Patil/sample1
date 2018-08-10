import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './vendor-report.component.html',
  styleUrls: ['./vendor-report.component.css']
})
export class VendorReportComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log(sessionStorage.getItem('authSuccess'));
  }

}
