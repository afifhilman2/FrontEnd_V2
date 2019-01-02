import { Component, OnInit, Type } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Response, Headers, RequestOptions, ResponseType } from '@angular/http';
import { AppService } from '../app.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-proses-pemesanan',
  templateUrl: './proses-pemesanan.component.html',
  styleUrls: ['./proses-pemesanan.component.css']
})
export class ProsesPemesananComponent implements OnInit {

  dataTrip;

  
  bayar;
  random;
  totalBayar;
  promo;

  nbook: any = {
    _id: '',
    order_email:'',
    order_telephone:'',
    order_name:'',
    notes:'',
    code:'',
    publish_price:'',
    id_province:'',
    id_category:'',
    flag_asuransi:false,
    asuransi_price:0,
    id_promo:'',
    flag_promo: false,
    promo_fee:0,
    uniq_code:'',
    
  }


  type_trip;
  trip;
  // loaded: boolean = true;

  constructor(private router: Router, private datePipe: DatePipe, private http: Http, private route: ActivatedRoute, private appService: AppService) { 
       

  }

  idDataTrip;
  idBook;

  book;
  idTrip;
  dataTripBook;

  starEmpty= "https://img.travinesia.com/iconweb/icon card trip_bintang kosong.png"
  star = "https://img.travinesia.com/icon/ikon card trip_bintang_16x16.png"
  trip_star: boolean[] = [false,false,false,false,false];
  rating
  

  ngOnInit() {

    // if(sessionStorage.getItem("book_trip") != null){
      this.dataTrip = JSON.parse(sessionStorage.getItem("book_trip"))
    console.log(this.dataTrip)
    this.bayar = this.dataTrip.publish_price * this.dataTrip.quantity;
    // console.log(this.type_trip)
    this.nbook.publish_price = this.dataTrip.publish_price;
    this.random = Math.floor(Math.random() * 1000);
    this.totalBayar = (this.bayar + this.nbook.asuransi_price) - (this.random + this.nbook.promo_fee);
    this.nbook.asuransi_price = this.nbook.asuransi_price * this.dataTrip.quantity;
    this.nbook._id = this.dataTrip._id;
    this.nbook.order_name = this.dataTrip.id_user.name;
    this.nbook.order_email = this.dataTrip.id_user.email;
    this.nbook.order_telephone = this.dataTrip.id_user.telephone;
    this.nbook.id_province = this.dataTrip.id_trip.id_province;
    this.nbook.id_category = this.dataTrip.id_trip.category[0];

    if(this.dataTrip.id_trip.rate_div!=0){
      this.rating = Math.floor(this.dataTrip.id_trip.rate_total/this.dataTrip.id_trip.rate_div);
      for(var i = 0; i < this.rating; i++){
        this.trip_star[i] = !this.trip_star[i];
      }
    }
    // } else {
    //   this.router.navigate(['/'])
    // }
    
  }

  goToPembayaran(e){
    this.idBook = e.target.id;
    this.nbook.uniq_code = this.random;
    // console.log(this.nbook)
    this.appService.nextBooking(this.nbook).subscribe(nbook => {
    
        // console.log(nbook);
        sessionStorage.setItem("booking", JSON.stringify(nbook.data) )
        // if(nbook.status = true){
          this.router.navigate(['/ProsesBayar']); 
        // }
      }
    )
  }

  check(e){
    if(e.target.checked){
      
      this.nbook.asuransi_price = 30000;
      this.nbook.flag_asuransi = true;
      this.nbook.asuransi_price = this.nbook.asuransi_price * this.dataTrip.quantity;
      this.totalBayar = (this.bayar + this.nbook.asuransi_price) - (this.random + this.nbook.promo_fee);
    }
    else{
      this.nbook.asuransi_price = 0;
      this.nbook.flag_asuransi = false;
      this.nbook.asuransi_price = this.nbook.asuransi_price * this.dataTrip.quantity;
      this.totalBayar = (this.bayar + this.nbook.asuransi_price) - (this.random + this.nbook.promo_fee);
    }
  }

  massage: boolean = false;
  tooglePromo(){
    // console.log(this.nbook.code);
    this.appService.checkPromo(this.nbook.code).subscribe(promo =>{
      if(promo.status == 400){
        this.massage = true;
      }
      // console.log(promo)
    })
  }
}
