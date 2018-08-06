import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { timer } from 'rxjs/observable/timer';
import { take, map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs'
import { Http, Headers, Response } from '@angular/http';



@Component({
  selector: 'app-proses-bayar2',
  templateUrl: './proses-bayar2.component.html',
  styleUrls: ['./proses-bayar2.component.css']
})
export class ProsesBayar2Component implements OnInit {

  countDown;
  count = 60 * 60 * 24;
  c;
  counter= 0;
  dataBooking;
  dataTrip;
  coded_amount;

  constructor(private active: ActivatedRoute,private http: Http, private router:Router, private datePipe: DatePipe) {
  //   this.countDown = timer(0,1000).pipe(
  //     take(this.count),
  //     map(()=> --this.count)
  //  );

  let id = this.active.snapshot.params['id'];
    this.dataTrip = id;

  Observable.interval(1000).map((x)=>{
    this.c = --this.count;
  }).subscribe((x) =>{
    this.countDown = this.convertSecons(this.c);
  })
  // this.countDown = this.convertSecons(this.turun)
  
  //  this.c = this.datePipe.transform(this.countDown, 'hh:mm:ss');
  
  setInterval(this.turun, 1000) 
   }


   turun(){
      if(this.count>0){
        this.count--
      }
   }

   convertSecons(s){
     let jam = Math.floor((s/3600) % 24)
     let min = Math.floor((s/60) % 60);
     let sec = s % 60;
     return jam + ':' + min + ':' + sec;
   }

  ngOnInit() {
    this.getBookingId();
  }

  createAuthorizationHeader (headers:Headers) {
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
  }

  getBookingId(): void{
    let headers = new Headers();
    this.createAuthorizationHeader(headers)
    this.http.get('http://travinesia.com:3000/v1/user/detailBooking/' + this.dataTrip, {headers: headers})
    .subscribe( 
      (res: Response) => {
      let dataBook = res.json();
        this.dataBooking = dataBook.data;
        console.log(this.dataBooking);
        this.coded_amount = dataBook.data.coded_amount;
        
      }
    )
  }

 

  

  

  
  goToPemesanan(){
    this.router.navigate(['traveler/Akun/Pemesanan', this.dataTrip]);
  }


}
