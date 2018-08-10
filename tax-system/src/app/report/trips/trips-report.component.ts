import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './trips-report.component.html',
  styleUrls: ['./trips-report.component.css']
})
export class TripsReportComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log(sessionStorage.getItem('authSuccess'));
  }

}
