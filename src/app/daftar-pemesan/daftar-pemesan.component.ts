import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http,Headers, Response } from '@angular/http';
import {Router, ActivatedRoute} from "@angular/router";
import { AppService} from '../app.service';
import { ComponentFixtureNoNgZone } from '@angular/core/testing';
import {saveAs} from 'file-saver';
import { DatePipe } from '@angular/common';
import { PagerService } from '../_service/index';


@Component({
  selector: 'app-daftar-pemesan',
  templateUrl: './daftar-pemesan.component.html',
  styleUrls: ['./daftar-pemesan.component.css']
})
export class DaftarPemesanComponent implements OnInit {
  
  idParams:any;
  transaction:any[];
  quantity:number[] = [];
  pageOps:boolean = false;
  pageData:boolean = true;
  
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
  date_trip;
  daftar_quota_left:any[];
  quota_left;
  photo_trip;
  date;
  id_trip;

  // booking
  booking:any[];

  // array of all items to be paged
  private allItems: any[];

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

  constructor(private appService:AppService, public datePipe:DatePipe, private http:Http, public route:Router, public activeRoute: ActivatedRoute, private pagerService:PagerService ) { 
   
    let id = this.activeRoute.snapshot.params['id']
     this.appService.getDaftarPemesan(id).subscribe( daftar => {
      
      // console.log(daftar);
      // trip
      this.photo_trip = daftar.trip.photo_trip[0];
      this.daftar_quota_left = daftar.trip.quota_left; 
      this.trip_name = daftar.trip.trip_name;
      this.days = daftar.trip.days;
      this.night = daftar.trip.night;
      this.category = daftar.trip.category[0].category_name;
      this.id_type_trip = daftar.trip.id_type_trip.type_trip;
      this.publish_price = daftar.trip.publish_price;
      this.quota_trip = daftar.trip.quota_trip;
      this.date_trip = daftar.trip.date_trip;
      this.date = daftar.trip.date_trip[0];
      // console.log(this.date);
      this.quota_left = daftar.trip.quota_left[0];
      this.id_trip = daftar.trip._id;

      // booking
      this.booking = daftar.booking; 
      this.allItems = daftar.booking;

      if(this.allItems.length == 0) {
        this.pageOps = !this.pageOps;
        this.pageData = !this.pageData;
      }

      
      this.setPageSaldo(1);
    
    }) 
   
    this.appService.getTransactionProvider().subscribe (transaction => {
      this.transaction = transaction.data;

      for( let x=0; x<transaction.data.length; x++ ) {
        this.quantity [x] = transaction.data[x].quota_left[0]; 
      }

    })

  }

  toggleBack():void {
    this.route.navigate(['/Provider/TransaksiPenjualan']);
  }

  dateChange(value,i) {
    this.quantity[i] = this.transaction[i].quota_left[value]
  }

  daftarChange(value) {
    this.quota_left = this.daftar_quota_left[value];
    // this.date = this.date_trip[value];
    this.date = this.datePipe.transform(this.date_trip[value], 'yyyy-MM-dd')

    // console.log(this.date);
  }

  goDetailPesan(){
    let id = this.activeRoute.snapshot.params['id']
    this.route.navigate(['/DetailPaket/' + id])
  }

  acceptTrip(e){
    this.id_transaction._id = e.target.id;
    // console.log(this.id_transaction._id);
    this.appService.confirmTransaction(this.id_transaction).subscribe(confirm => {
      // console.log(confirm);
      let id = this.activeRoute.snapshot.params['id']
      if(confirm.status == 200) {
        this.route.navigateByUrl('/free', {skipLocationChange: true}).then(()=>
        this.route.navigate(['/Provider/DaftarPemesanan/' + id]));
      }
    }); 
  }

  download() {
    var filename = this.trip_name;
    this.appService.downloadPDFTransaction(this.id_trip, this.date).subscribe(
      (res) => {
      saveAs(res, filename+"-eticket.pdf");
      // var fileURL = URL.createObjectURL(res);
      // window.open(fileURL);
      }
    );
   
  }

  setPageSaldo(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPagerSaldo(this.allItems.length, page);

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }


  ngOnInit() {

    // let id = this.activeRoute.snapshot.params['id']
    // this.appService.getDaftarPemesan(id).subscribe( daftar => { 
    
    //   this.date = daftar.trip.date_trip[0];
      
    // console.log(this.date);
    // })

  }
}
