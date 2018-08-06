import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,  ParamMap } from "@angular/router";
import { AppService} from '../app.service';
import { Http, Headers, Response} from '@angular/http';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/switchMap';
import { Product } from '../product';

import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-detail-paket',
  templateUrl: './detail-paket.component.html',
  styleUrls: ['./detail-paket.component.css']
})
export class DetailPaketComponent implements OnInit {

  public counter : number;
  idtrip: any[];
  dataTrip: any[];
  detailTrip: any[] = [];
  totalHarga;
  totalHargaBayar: any = 1;
  hargaProduct; 
  number: number;
  date;
  idB : any;

  book: any = {
    id_trip : '',
    id_booking: '',
    id_user:'',
    id_type_trip:'',
    id_paymentMethod:'',
    id_statusPayment:'',
    id_statusBooking:'',
    order_name:'',
    quota_trip:'',
    quantity: '',
    name_traveler:'',
    age_traveler:'',
    identity_number:'',
    publish_price: '',
    startDate_trip: '',
    endDate_trip:'',
    uniq_code:'',
    coded_amount:'',
    trip_name:'',
  }

  day;
  month;
  year;
  

  idBook;
  idT;

  diskus;
  booking;
  bookId;

  name;
  photo;

  
  constructor(private router: Router,private datePipe: DatePipe, public active: ActivatedRoute, private http2: HttpClient, private http: Http, private appServis: AppService) { 
    let id = this.active.snapshot.params['id'];
    this.dataTrip = id;

    this.appServis.diskusi().subscribe(disk => {
      this.diskus = disk.data;
    })

  
    
  }


  

  ngOnInit() {
    this.getTrip();
     
      

  }

  
  getTrip(): void{
    this.http.get('http://travinesia.com:3000/get/detail_trip/' + this.dataTrip)
        .subscribe(
          // trip =>{ 
          //   console.log(trip);
          // }
          (res:Response)=>{
            let trip = res.json();
            this.detailTrip = trip.data;
            this.date = trip.data.date_trip;
            this.hargaProduct = trip.data.publish_price;
            this.idBook = trip.data.id_trip;
            this.name = trip.data.trip_name;
            this.totalHarga = this.totalHargaBayar * this.hargaProduct;
            this.photo = trip.data.photo_trip;
            console.log(this.detailTrip)
          }
            
        )
  }




  sendDate(e){
    this.book.startDate_trip = e.target.value;
    
  }


  goToProsespemesanan(e){
    
    this.book.quantity = this.totalHargaBayar;
    this.book.publish_price = this.totalHarga;
    this.book.id_trip = this.idBook;
    this.idtrip = e.target.id;
    this.book.trip_name = this.name
    
    console.log(this.idtrip);
    this.appServis.booking(this.book).subscribe(book => {
      this.bookId = book.data;
      this.idT = book.data._id;
      // console.log(this.bookId);
      if(!(this.idT === null)){
        if(book.status = true){
          this.router.navigate(['/ProsesPemesanan', this.idT ]); 
        }
      }else{
        alert('Please log in')
        this.router.navigate(['/LoginPage']);
        return false;
      }
     
      
    })  
    
  }

  increment() { 
    // this.appServis.updateProduct(this.totalHargaBayar+1)
    // this.totalHargaBayar = 1; 
    this.totalHargaBayar++;
    this.totalHarga = this.totalHargaBayar * this.hargaProduct;
    // console.log(this.totalHarga)

  }

  decrement() {
    // this.totalHargaBayar = 1;
      if(this.totalHargaBayar >1){
        // this.appServis.updateProduct(this.totalHargaBayar-1)
        this.totalHargaBayar--;
        this.totalHarga = this.totalHargaBayar * this.hargaProduct;

      }
  }

 

  
}