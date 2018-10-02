import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,  ParamMap } from "@angular/router";
import { AppService} from '../app.service';
import { Http, Headers, Response} from '@angular/http';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/switchMap';
import { Product } from '../product';

import { DatePipe, LOCATION_INITIALIZED } from '@angular/common';


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

  book: any = {
    id_type_trip:'',
    quantity: '',
    publish_price: '',
    startDate_trip: '',
    _id:'',
  }

  text: any = {
    _id:'',
    content:'',
  }

  
  

  

  diskus;

  name;
  photo;
  error = HttpErrorResponse;
  loaded : boolean = true;
  kat

  
  constructor(private router: Router,private datePipe: DatePipe, public active: ActivatedRoute, private http2: HttpClient, private http: Http, private appServis: AppService) { 
    let id = this.active.snapshot.params['id'];
    this.dataTrip = id;

    // this.appServis.diskusi().subscribe(disk => {
    //   this.diskus = disk.data;
    //   console.log(this.diskus);
    // })

  
    
  }


  

  ngOnInit() {
    this.getTrip();
    this.getDiskusi();
  }

  
  getTrip(): void{
    this.book._id = this.dataTrip;
    this.http.get('http://travinesia.com:3000/get/trip_detail/' + this.dataTrip)
        .subscribe(
          // trip =>{ 
          //   console.log(trip);
          // }
          (res:Response)=>{
            let trip = res.json();
            this.detailTrip = trip.data;
            this.hargaProduct = trip.data.publish_price;
            this.totalHarga = this.totalHargaBayar * this.hargaProduct;
            this.photo = trip.data.photo_trip;
            this.kat = trip.data.category;
            this.book.id_type_trip = trip.data.id_type_trip._id
            console.log(this.detailTrip);
            this.loaded = false;
          }          
        )

        
  }

  getDiskusi(){
    this.text._id = this.dataTrip;
    this.appServis.diskusi(this.dataTrip).subscribe(discus =>{
      this.diskus = discus.data;
      console.log(this.diskus)
    })
  }

  review;
  getReview(){
    this.appServis.review(this.dataTrip).subscribe(riview =>{
      this.review = riview.data;
    })
  }




  sendDate(e){
    this.book.startDate_trip = e.target.value;
    
  }


  goToProsespemesanan(e){
    
    this.book.quantity = this.totalHargaBayar;
    this.book.publish_price = this.totalHarga;
    console.log(this.book);
    this.idtrip = e.target.id
    
   if(!(localStorage.token == null)){
    this.appServis.booking(this.book).subscribe(book => {
      // this.bookId = book.data;
      // this.idT = book.data._id;
      console.log(this.book);
      
      if (book.status == 200){
        this.router.navigate(['/ProsesPemesanan'], {queryParams: {data : JSON.stringify(book.data)}});
      }
    });

   }else {
    alert('Please log in')
    this.router.navigate(['/LoginPage']);
    return false;
   }
     
    
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

  showComment: boolean = false;

  textContent;
  sendComment(){
    if(!(localStorage.token == null)){
      // console.log(this.text._id);
      // console.log(this.text.content);
      // console.log('login')
      // this.showComment = !this.showComment;
    // this.router.navigate(['/LoginPage']);
    this.appServis.sendDiskusi(this.dataTrip,this.text).subscribe(text =>{
      console.log(text);
    })
  }else{
    // console.log('belom login')
    
    this.router.navigate(['/LoginPage']);
    }
  }

  cekLogin: boolean = false;
  get isLogin(){
    if(!(localStorage.token == null)){
      return this.cekLogin = true;
    }
  }
 
}