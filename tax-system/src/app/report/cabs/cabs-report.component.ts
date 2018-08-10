import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './cabs-report.component.html',
  styleUrls: ['./cabs-report.component.css']
})
export class CabsReportComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log(sessionStorage.getItem('authSuccess'));
  }

}
