import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http,Headers, Response } from '@angular/http';
import {Router, ActivatedRoute} from "@angular/router";
import { AppService} from '../app.service';
import { PagerService } from '../_service/index';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-transaksi-penjualan',
  templateUrl: './transaksi-penjualan.component.html',
  styleUrls: ['./transaksi-penjualan.component.css']
})
export class TransaksiPenjualanComponent implements OnInit {

  idParams:any;
  transaction:any[];
  quantity:number[] = [];
  pageOpsOpen:boolean = false;
  pageDataOpen:boolean = true;
  pageOpsPrivate:boolean = false;
  pageDataPrivate:boolean = true;

  
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
   private allItems: any[] = [];
   private allItemsPrivate: any[] = [];

   // pager object
   pager: any = {};
   pagerPrivate:any = {};

   // paged items
   pagedItems: any[];
   pagedItemsPrivate: any[];

  constructor(private appService:AppService, private http:Http, public route:Router, private pagerService: PagerService ) { 
   

    this.appService.getTransactionProvider().subscribe (transaction => {
      this.transaction = transaction.data;
           
      for(let p=0; p < transaction.data.length; p++) {
        // console.log(p);
        if(this.transaction[p].id_type_trip.type_trip == 'Open Trip') {
          this.allItems.push(transaction.data[p]);
          // console.log(this.allItems)
          
        }
         else {
          this.allItemsPrivate.push(transaction.data[p]);
          // console.log(this.allItemsPrivate);
        }
      }

      if(this.allItems.length == 0) {
        this.pageOpsOpen = !this.pageOpsOpen;
        this.pageDataOpen = !this.pageDataOpen;
      }

      if(this.allItemsPrivate.length == 0) {
        this.pageOpsPrivate = !this.pageOpsPrivate;
        this.pageDataPrivate = !this.pageDataPrivate;
      }

      for( let x=0; x<transaction.data.length; x++ ) {
        this.quantity [x] = transaction.data[x].quota_left[0]; 
      }


      this.setPage(1);
      // this.setPagePrivate(1);
    })
  }

  togglePesanPrivate(e):void {

    this.idParams= e.target.id;
    this.route.navigate(['/Provider/DaftarPemesananPrivate/' + this.idParams])
    
  }

  togglePesan(e):void {

    this.idParams= e.target.id;
    this.route.navigate(['/Provider/DaftarPemesanan/' + this.idParams])
  }

  dateChange(value,i) {
    this.quantity[i] = this.transaction[i].quota_left[value]
  }

  daftarChange(value) {
    this.quota_left = this.daftar_quota_left[value];
  }

  goDetail(e){
    let id = e.target.id
    this.route.navigate(['/DetailPaket/' + id])
  }

  
  ngOnInit() {
    window.scrollTo(0, 0);
   }

   setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);
    this.pagerPrivate = this.pagerService.getPager(this.allItemsPrivate.length, page)
  


    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    this.pagedItemsPrivate = this.allItemsPrivate.slice(this.pagerPrivate.startIndex, this.pagerPrivate.endIndex + 1);
    
  }
}
