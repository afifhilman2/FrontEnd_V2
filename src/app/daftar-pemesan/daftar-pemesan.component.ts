import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-daftar-pemesan',
  templateUrl: './daftar-pemesan.component.html',
  styleUrls: ['./daftar-pemesan.component.css']
})
export class DaftarPemesanComponent implements OnInit {


  transaksi1:boolean = true;
  transaksi2:boolean = false;

  togglePesan():void {
    this.transaksi1 = !this.transaksi1;
    this.transaksi2 = !this.transaksi2;
  }

  constructor() { }

  ngOnInit() {
  }

}
