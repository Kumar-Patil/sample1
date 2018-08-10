import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-finance',
  templateUrl: './settlement-finance.component.html',
  styleUrls: ['./settlement-finance.component.css']
})
export class SettlementFinanceComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log(sessionStorage.getItem('authSuccess'));
  }

}
