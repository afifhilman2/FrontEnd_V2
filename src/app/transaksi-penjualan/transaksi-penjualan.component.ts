import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http,Headers, Response } from '@angular/http';
import {Router, ActivatedRoute} from "@angular/router";
import { AppService} from '../app.service';
import { PagerService } from '../_service/index';

@Component({
  selector: 'app-transaksi-penjualan',
  templateUrl: './transaksi-penjualan.component.html',
  styleUrls: ['./transaksi-penjualan.component.css']
})
export class TransaksiPenjualanComponent implements OnInit {

  idParams:any;
  transaction:any[];
  quantity:number[] = [];

  
  id_transaction = {
    _id:''
  }

  // trip
  trip_name;
  days;
  night;
  category;
  id_type_trip;
  publish_price;
  quota_trip;
  date_trip:any[] ;
  daftar_quota_left:any[];
  quota_left;

  // booking
  booking:any[];

   // array of all items to be paged
   private allItems: any[];

   // pager object
   pager: any = {};

   // paged items
   pagedItems: any[];

  constructor(private appService:AppService, private http:Http, public route:Router, private pagerService: PagerService ) { 
   

  }

  togglePesanPrivate(e):void {

    this.idParams= e.target.id;
    this.route.navigate(['/JualTrip/DaftarPemesananPrivate/' + this.idParams])
    
  }

  togglePesan(e):void {

    this.idParams= e.target.id;
    this.route.navigate(['/JualTrip/DaftarPemesanan/' + this.idParams])
  }

  dateChange(value,i) {
    this.quantity[i] = this.transaction[i].quota_left[value]
  }

  daftarChange(value) {
    this.quota_left = this.daftar_quota_left[value];
  }

  goDetail(e){
    let id = e.target.id
    this.route.navigate(['/traveler/DetailPaket/' + id])
  }

  
  ngOnInit() {

    this.appService.getTransactionProvider().subscribe (transaction => {
      this.transaction = transaction.data;
      
      // console.log(this.transaction)

      this.allItems = transaction.data;

      for( let x=0; x<transaction.data.length; x++ ) {
        this.quantity [x] = transaction.data[x].quota_left[0]; 
      }


      this.setPage(1);
    })


   }

   setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

}
