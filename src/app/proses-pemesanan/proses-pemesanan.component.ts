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
    order_email:'',
    order_telephone:'',
    order_name:'',
    notes:'',
    flag_asuransi:false,
    asuransi_price:0,
    id_promo:'',
    flag_promo: false,
    promo_fee:0,
    uniq_code:'',
    _id: '',
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

  

  ngOnInit() {

    
    this.dataTrip = JSON.parse(this.route.snapshot.queryParams['data'])
    console.log(this.dataTrip)
    this.bayar = this.dataTrip.publish_price * this.dataTrip.quantity;
    // console.log(this.type_trip)
    this.random = Math.floor(Math.random() * 1000);
    this.totalBayar = (this.bayar + this.nbook.asuransi_price) - (this.random + this.nbook.promo_fee);
    this.nbook.asuransi_price = this.nbook.asuransi_price * this.dataTrip.quantity;
    this.nbook._id = this.dataTrip._id;
    this.nbook.order_name = this.dataTrip.id_user.name;
    this.nbook.order_email = this.dataTrip.id_user.email;
    this.nbook.order_telephone = this.dataTrip.id_user.telephone;
    
  
    
  }

  goToPembayaran(e){
    this.idBook = e.target.id;
    this.nbook.uniq_code = this.random;
    this.appService.nextBooking(this.nbook).subscribe(nbook => {
    
        console.log(nbook);

        if(nbook.status = true){
          this.router.navigate(['/ProsesBayar'],{queryParams: {data : JSON.stringify(nbook.data)}}); 
        }
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
}
