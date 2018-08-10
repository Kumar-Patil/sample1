import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-finance',
  templateUrl: './vendor-finance.component.html',
  styleUrls: ['./vendor-finance.component.css']
})
export class VendorFinanceComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log(sessionStorage.getItem('authSuccess'));
  }

}
