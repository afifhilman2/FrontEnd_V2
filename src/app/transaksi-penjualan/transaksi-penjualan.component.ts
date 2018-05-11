import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaksi-penjualan',
  templateUrl: './transaksi-penjualan.component.html',
  styleUrls: ['./transaksi-penjualan.component.css']
})
export class TransaksiPenjualanComponent implements OnInit {

  content1:boolean = true;
  content2:boolean = false;

  togglePesan():void {
    this.content1 = !this.content1;
    this.content2 = !this.content2;
  }

  constructor() { }

  ngOnInit() {
  }

}
