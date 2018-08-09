import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AppService } from '../app.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-proses-pemesanan',
  templateUrl: './proses-pemesanan.component.html',
  styleUrls: ['./proses-pemesanan.component.css']
})
export class ProsesPemesananComponent implements OnInit {

  dataTrip: any[];
  detailTrip: any;
  booking: any;
  detailBooking: any[]= [];

  startDay;
  startMonth;
  startYear;
  endDay;
  endMonth;
  endYear;
  jumlahOrang;
  bayar;
  dataUser;
  name;
  random;
  asuransi: any = 30000;
  hargaAsuransi;
  totalBayar;
  promo;

  nbook: any = {
    email:'',
    telephone:'',
    coded_amount:'',
    catatan_provider:'',
    order_name:'',
    id_booking: '',
    uniq_code:'',
    id_trip: ''
  }


  loaded: boolean = true;

  constructor(private router: Router, private datePipe: DatePipe, private http: Http, private active: ActivatedRoute, private appService: AppService) { 
    let id = this.active.snapshot.params['id'];
    this.dataTrip = id;
    // console.log(this.dataTrip)
    //get data user

    // this.appService.getUsers().subscribe(getUser =>{
    //   this.dataUser = getUser.data;
    //   this.name = getUser.data.name;
    //   // console.log(this.dataUser)
    // })

    // this.appService.getBooking().subscribe(getBook =>{
    //   this.booking = getBook.data;
     
      
    // })
    this.getBookingId();

  }

  idDataTrip;
  days;
  idBook;

  book;
  idTrip;
  dataTripBook;

  ngOnInit() {
    // this.http.get('http://travinesia.com:3000/get/detail_trip/' + this.idDataTrip)
    //     .subscribe(
    //       (res:Response)=>{
    //         let trip = res.json();
    //         this.detailTrip = trip;
    //         console.log(this.detailTrip);
    //         // alert(JSON.stringify(this.detailTrip.trip_name));
    //         // console.log(trip);
    //       }
            
    //     )

    this.random = Math.floor(Math.random() * 1000);
    
      
  
    
  }

  // getBookId(bookId: string){
  //   this.appService.getBookingId(bookId).subscribe(book=>{
  //     this.idBook = book.data;
  //     console.log(this.idBook);
  //   })
  // }

  createAuthorizationHeader (headers:Headers) {
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
  }

  getBookingId(){
    let headers = new Headers();
    this.createAuthorizationHeader(headers)
    this.http.get('http://travinesia.com:3000/v1/user/detailBooking/' + this.dataTrip, {headers: headers})
    .subscribe( (res: Response) => {
      let dataBook = res.json();
      this.booking = dataBook.data;
      this.idDataTrip = dataBook.data.id_booking;
      this.idTrip = dataBook.data.id_trip;
      this.getTrip(this.idTrip)
      console.log(this.idTrip);
      console.log(this.booking);
      this.startDay = this.datePipe.transform(dataBook.data.startDate_trip, 'd');
      this.startMonth = this.datePipe.transform(dataBook.data.startDate_trip, 'MMMM');
      this.startYear = this.datePipe.transform(dataBook.data.startDate_trip, 'yyyy');
      this.endDay = this.datePipe.transform(dataBook.data.endDate_trip, 'd');
      this.endMonth = this.datePipe.transform(dataBook.data.endDate_trip, 'MMMM');
      this.endYear = this.datePipe.transform(dataBook.data.endDate_trip, 'yyyy');
      this.jumlahOrang = dataBook.data.quantity;
      this.bayar = dataBook.data.publish_price * dataBook.data.quantity;
      // console.log(this.bayar);
      this.hargaAsuransi = this.asuransi * this.jumlahOrang;
      this.promo = 0.1 * this.bayar;
      this.totalBayar = this.bayar + this.random;
      // console.log(this.booking)
      this.nbook.order_name = dataBook.data.order_name;
      this.nbook.telephone = dataBook.data.telephone;

      this.loaded = false;
     }      
    )

    
  }

 
  

  getTrip(_idTrip){
    let headers = new Headers();
    this.createAuthorizationHeader(headers)
    this.http.get('http://travinesia.com:3000/get/trip_detail/' + _idTrip, {headers: headers})
    .subscribe(
      (res:Response)=>{
        let tripData = res.json();
        this.dataTripBook = tripData;
        console.log(this.dataTripBook)

      }
    )
  }

  

  goToPembayaran(e){
    this.idBook = e.target.id;

    this.nbook.id_booking = this.idDataTrip;
    this.nbook.order_name;
    this.nbook.coded_amount = this.totalBayar;
    this.nbook.email;
    this.nbook.telephone;
    this.nbook.catatan_provider;
    this.nbook.uniq_code = this.random;

    
    console.log(this.nbook.uniq_code);

    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    this.http.put('http://travinesia.com:3000/v1/user/detailBooking/' + this.dataTrip , this.nbook , {headers: headers})
    .subscribe(
      (res: Response) => {
        let bokData = res.json();
        this.book = bokData
        // console.log(this.book);

        if(bokData.status = true){
          this.router.navigate(['/ProsesBayar', this.dataTrip]); 
        }
      }
    )
    // this.appService.nextBooking(this.nbook).subscribe(nbook=>{
    //   let bookData = nbook;
    //   console.log(bookData);
    //   this.router.navigate(['ProsesBayar', this.idBook ])
    // })
    
    
  }
}
