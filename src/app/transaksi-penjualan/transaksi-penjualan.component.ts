import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http,Headers, Response } from '@angular/http';
import {Router, ActivatedRoute} from "@angular/router";
import { AppService} from '../app.service';

@Component({
  selector: 'app-transaksi-penjualan',
  templateUrl: './transaksi-penjualan.component.html',
  styleUrls: ['./transaksi-penjualan.component.css']
})
export class TransaksiPenjualanComponent implements OnInit {

  content1:boolean = true;
  content2:boolean = false;
  idParams:any;
  transaction:any[];
  daftar:any[];

  quantity:number[] = [];

  trip_name;
  days;
  night;
  category;
  id_type_trip;
  publish_price;
  quota_trip;
  date_trip:any[] ;



  constructor(private appService:AppService, private http:Http, public route:Router ) { 
    this.appService.getTransactionProvider().subscribe (transaction => {
      this.transaction = transaction.data;

      for( let x=0; x<transaction.data.length; x++ ) {
        this.quantity [x] = transaction.data[x].quota_left[0]; 
      }

      console.log(this.quantity);
    })

  }

  togglePesan(e):void {

    this.content1 = !this.content1;
    this.content2 = !this.content2;

    this.idParams= e.target.id;
     this.appService.getDaftarPemesan(this.idParams).subscribe( daftar => {
      
      console.log(daftar);

      this.daftar = daftar.trip; 
      this.trip_name = daftar.trip.trip_name;
      this.days = daftar.trip.days;
      this.night = daftar.trip.night;
      this.category = daftar.trip.category[0].category_name;
      this.id_type_trip = daftar.trip.id_type_trip.type_trip;
      this.publish_price = daftar.trip.publish_price;
      this.quota_trip = daftar.trip.quota_trip;
      this.date_trip = daftar.trip.date_trip

    })
    
  }

  toggleBack():void {
    this.content1 = !this.content1;
    this.content2 = !this.content2;
  }

  dateChange(value,i) {
    this.quantity[i] = this.transaction[i].quota_left[value]
  }

  ngOnInit() {

   
  }

}
