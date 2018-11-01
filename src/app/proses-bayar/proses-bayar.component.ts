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
    admin_fee:0,
    id_paymentMethod:'',
    no_booking:'',
    id_typePayment:'',
    _id:'',
  }

  promo;
  totalBayar;
  random;
  uniq;
  idBooking;
  dataBooking;
  dataBank;
  price;
  book;
  hargaAsuransi;
  payment;
  bca;


  // loaded: boolean = true;

  constructor(private active: ActivatedRoute,private http:Http, private router: Router, private appService: AppService, private datePipe: DatePipe) {
    // let id = this.active.snapshot.params['id']
    // this.idBooking = id;
    // this.appService.getUsers().subscribe(getUser =>{
    //   this.dataUser = getUser.data;
    //   this.name = getUser.data.name;
    //   console.log(this.dataUser)
    // })
   }

   ngOnInit() {
    this.random = Math.floor(Math.random() * 1000);
    this.boking.no_booking = 'TRV' + Math.floor(Math.random() * 1000000000);

    this.getBookingId();

    this.dataBooking = JSON.parse(sessionStorage.getItem("booking"));
    // console.log(this.dataBooking);
    this.totalBayar = ((this.dataBooking.publish_price*this.dataBooking.quantity)+this.dataBooking.asuransi_price)-(this.dataBooking.uniq_code + this.dataBooking.promo_fee)
    this.price = this.dataBooking.publish_price*this.dataBooking.quantity;
    this.hargaAsuransi = this.dataBooking.asuransi_price;
    this.boking._id = this.dataBooking._id;
    

    
  }

  choosePayment(id_payment, id_type_payment){
    
    this.boking.id_paymentMethod = id_payment;
    this.boking.id_typePayment = id_type_payment;
    
  }

   getBookingId(): void{
    this.appService.paymentBooking().subscribe( bookPayment => {
      this.payment = bookPayment.data;
      console.log(this.payment);
      
      // console.log(this.bca);
    })
  }

  
 
  sendValueBank(id_payment, id_type_payment, id_payment_method){
    
    this.dataBank = id_payment_method;
    console.log(this.dataBank);
    if(this.dataBank == 3){
      this.boking.id_paymentMethod = id_payment;
      this.boking.id_typePayment = id_type_payment;
      this.boking.admin_fee = 7000;
    }else if(this.dataBank == 4){
      this.boking.id_paymentMethod = id_payment;
      this.boking.id_typePayment = id_type_payment;
      this.boking.admin_fee = 7500;
    }else{
      this.boking.admin_fee = 0;
    }
    // this.totalBayar = this.bayar + this.uniq + this.price;
    
  }

  goToCheckout(){
    
    // console.log(this.boking)
    this.appService.addPayment(this.boking).subscribe(boking=>{
      console.log(boking)
      sessionStorage.setItem("booking", JSON.stringify(boking.data))
      if(boking.status == 200){
        this.router.navigate(['/ProsesBayar2'])
      }
      
    })
    
  }

  ceck(bank){
    return bank;
  }

}
