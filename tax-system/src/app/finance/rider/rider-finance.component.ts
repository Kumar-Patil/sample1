import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-finance',
  templateUrl: './rider-finance.component.html',
  styleUrls: ['./rider-finance.component.css']
})
export class RiderFinanceComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log(sessionStorage.getItem('authSuccess'));
  }

}
