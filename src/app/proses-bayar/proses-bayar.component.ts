import { Component, OnInit, ValueProvider } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
import { DatePipe } from '@angular/common';
import { Http, Response, Headers } from '@angular/http'

@Component({
  selector: 'app-proses-bayar',
  templateUrl: './proses-bayar.component.html',
  styleUrls: ['./proses-bayar.component.css']
})

export class ProsesBayarComponent implements OnInit {

  
  boking = {
    coded_amount:'',
    id_paymentMethod:'',
    no_booking:'',
  }


  startDay;
  startMonth;
  startYear;
  endDay;
  endMonth;
  endYear;
  jumlahOrang;
  bayar;
  promo;
  totalBayar;
  random;
  dataUser;
  name;
  noPesanan : any;
  uniq;

  idBooking;
  dataBooking;

  dataBank;

  price;
  book;

  loaded: boolean = true;

  constructor(private active: ActivatedRoute,private http:Http, private router: Router, private appService: AppService, private datePipe: DatePipe) {
    let id = this.active.snapshot.params['id']
    this.idBooking = id;
    // this.appService.getUsers().subscribe(getUser =>{
    //   this.dataUser = getUser.data;
    //   this.name = getUser.data.name;
    //   console.log(this.dataUser)
    // })
   }

   ngOnInit() {
    this.random = Math.floor(Math.random() * 1000);
    this.noPesanan = 'TRV' + Math.floor(Math.random() * 1000000000);

    this.getBookingId();
  }

   createAuthorizationHeader (headers:Headers) {
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
  }

   getBookingId(): void{
    let headers = new Headers();
    this.createAuthorizationHeader(headers)
    this.http.get('http://travinesia.com:3000/v1/user/detailBooking/' + this.idBooking, {headers: headers})
    .subscribe( (res: Response) => {
      let dataBook = res.json();
        this.dataBooking = dataBook.data
        console.log(this.dataBooking);
        this.startDay = this.datePipe.transform(dataBook.data.startDate_trip, 'd');
        this.startMonth = this.datePipe.transform(dataBook.data.startDate_trip, 'MMMM');
        this.startYear = this.datePipe.transform(dataBook.data.startDate_trip, 'yyyy');
        this.endDay = this.datePipe.transform(dataBook.data.endDate_trip, 'd');
        this.endMonth = this.datePipe.transform(dataBook.data.endDate_trip, 'MMMM');
        this.endYear = this.datePipe.transform(dataBook.data.endDate_trip, 'yyyy');
        this.bayar = dataBook.data.publish_price * dataBook.data.quantity;
        this.uniq = dataBook.data.uniq_code;
  
        this.loaded = false;
      }
    )
  }
 
  sendValueBank(e){
    this.dataBank = e.target.value;
    console.log(this.dataBank);
    if(this.dataBank == 5){
      this.price = 7000;
    }else if(this.dataBank == 6){
      this.price = 7500;
    }else{
      this.price = 0;
    }
    this.totalBayar = this.bayar + this.uniq + this.price;
    
  }

  goToCheckout(e){


    this.boking.coded_amount = this.totalBayar;
    this.boking.no_booking = this.noPesanan;
    this.boking.id_paymentMethod = this.dataBank;

    console.log(this.boking.coded_amount);
    console.log(this.boking.id_paymentMethod);
    console.log(this.boking.no_booking);
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    this.http.put('http://travinesia.com:3000/v1/user/detailBooking/' + this.idBooking , this.boking , {headers: headers})
    .subscribe(
      (res: Response) => {
        let bokData = res.json();
        this.book = bokData
        console.log(this.book);

        if(bokData.status = true){
          this.router.navigate(['/ProsesBayar2', this.idBooking]); 
        }
      }
    )
    // this.router.navigate(['/ProsesBayar2'])
  }

  ceck(bank){
    return bank;
  }

}
