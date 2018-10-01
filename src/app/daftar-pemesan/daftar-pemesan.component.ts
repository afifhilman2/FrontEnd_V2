import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http,Headers, Response } from '@angular/http';
import {Router, ActivatedRoute} from "@angular/router";
import { AppService} from '../app.service';
import { ComponentFixtureNoNgZone } from '@angular/core/testing';

@Component({
  selector: 'app-daftar-pemesan',
  templateUrl: './daftar-pemesan.component.html',
  styleUrls: ['./daftar-pemesan.component.css']
})
export class DaftarPemesanComponent implements OnInit {
  
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

  constructor(private appService:AppService, private http:Http, public route:Router, public activeRoute: ActivatedRoute ) { 
   
    let id = this.activeRoute.snapshot.params['id']
     this.appService.getDaftarPemesan(id).subscribe( daftar => {
      
      console.log(daftar);
      // trip
      this.daftar_quota_left = daftar.trip.quota_left; 
      this.trip_name = daftar.trip.trip_name;
      this.days = daftar.trip.days;
      this.night = daftar.trip.night;
      this.category = daftar.trip.category[0].category_name;
      this.id_type_trip = daftar.trip.id_type_trip.type_trip;
      this.publish_price = daftar.trip.publish_price;
      this.quota_trip = daftar.trip.quota_trip;
      this.date_trip = daftar.trip.date_trip
      this.quota_left = daftar.trip.quota_left[0];

      // booking
      this.booking = daftar.booking; 
    
    }) 
   
    this.appService.getTransactionProvider().subscribe (transaction => {
      this.transaction = transaction.data;

      for( let x=0; x<transaction.data.length; x++ ) {
        this.quantity [x] = transaction.data[x].quota_left[0]; 
      }

    })

  }

  toggleBack():void {
    this.route.navigate(['/JualTrip/TransaksiPenjualan']);
  }

  dateChange(value,i) {
    this.quantity[i] = this.transaction[i].quota_left[value]
  }

  daftarChange(value) {
    this.quota_left = this.daftar_quota_left[value];
  }

  goDetailPesan(){
    let id = this.activeRoute.snapshot.params['id']
    this.route.navigate(['/traveler/DetailPaket/' + id])
  }

  acceptTrip(e){
    this.id_transaction._id = e.target.id;
    // console.log(this.id_transaction._id);
    this.appService.confirmTransaction(this.id_transaction).subscribe(confirm => {
      console.log(confirm);
      let id = this.activeRoute.snapshot.params['id']
      if(confirm.status == 200) {
        this.route.navigateByUrl('/free', {skipLocationChange: true}).then(()=>
        this.route.navigate(['/JualTrip/DaftarPemesanan/' + id]));
      }
    }); 
  }

  ngOnInit() {

   
  }
}
