import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,  ParamMap, NavigationExtras } from "@angular/router";
import { AppService} from '../app.service';
import { Http, Headers, Response} from '@angular/http';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/switchMap';
import { Product } from '../product';

import { DatePipe, LOCATION_INITIALIZED } from '@angular/common';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-detail-paket',
  templateUrl: './detail-paket.component.html',
  styleUrls: ['./detail-paket.component.css']
})
export class DetailPaketComponent implements OnInit {

  idtrip: any[];
  dataTrip: any[];
  detailTrip;
  hargaProduct; 

  formBooking = this.fb.group({
    id_type_trip:'',
    quantity: '',
    publish_price: '',
    startDate_trip: '',
    _id:'',
    
  })


  text: any = {
    _id:'',
    content:'',
  }

  diskus;

  name;
  photo;
  error = HttpErrorResponse;
  // loaded : boolean = true;
  kat;
  date: string[];
  fasilitas;
  lat;
  lng;
  url = 'https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d6030.418742494061!2d-111.34563870463673!3d26.01036670629853!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2smx!4v1471908546569';;
  constructor(public sanitizer: DomSanitizer, private fb: FormBuilder, private router: Router,private datePipe: DatePipe, public active: ActivatedRoute, private http2: HttpClient, private http: Http, private appServis: AppService) { 
    let id = this.active.snapshot.params['id'];
    this.dataTrip = id;
    
  }


  isFieldValid(field: string) {
    return !this.formBooking.get(field).valid && this.formBooking.get(field).touched;
  }
  
  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }
  
  // validate submit
    validateAllFormFields(formGroup: FormGroup) {         //{1}
      Object.keys(formGroup.controls).forEach(field => {  //{2}
        const control = formGroup.get(field);             //{3}
        
        if (control instanceof FormControl) {             //{4}
          control.markAsTouched({ onlySelf: true });
  
        } else if (control instanceof FormGroup) {        //{5}
          this.validateAllFormFields(control);            //{6}
        }
      });
    }
  ngOnInit() {
    this.getTrip();
    this.getDiskusi();
    // this.url = 'https://maps.google.com/maps?q='+this.lat+','+this.lng+'&hl=es;z=14&amp&output=embed';
  }

  counterStars(i: number){
    return Array(Math.round(i)).fill(4);
  }

  idAgen;
  getTrip(): void{
    // this.book._id = this.dataTrip;
    this.http.get('https://travinesia.com:1210/get/trip_detail/' + this.dataTrip)
        .subscribe(
          // trip =>{ 
          //   console.log(trip);
          // }
          (res:Response)=>{
            let trip = res.json();
            this.detailTrip = trip.data;
            console.log(this.detailTrip)
            this.hargaProduct = trip.data.publish_price;
            this.photo = trip.data.photo_trip;
            this.kat = trip.data.category;
            this.quota_left = trip.data.quota_left; 
            this.date = trip.data.date_trip;
            this.fasilitas = trip.data.facility;
            this.idAgen = trip.data.provider._id;
            this.totalHarga = this.quantity * this.hargaProduct;
            this.lat = trip.data.latitude;
            console.log(this.lat)
            this.lng = trip.data.longitude;
            console.log(this.lng)
            this.url = 'https://maps.google.com/maps?q='+this.lat+','+this.lng+'&hl=es;z=14&amp&output=embed';
            // this.loaded = false;

          }          
        )   
  }

  coment = this.fb.group({
    id_diskusi:'',
    comment:''
  })

  idDiskusi;
  sendId(e){
    this.idDiskusi = e.target.id;
  }
  addComent(){
    this.coment.patchValue({
      id_diskusi: this.idDiskusi
    })
    
    this.appServis.addComment(this.coment.value).subscribe(comment => {
      console.log(comment)  
    })
  }

  getDiskusi(){
    this.text._id = this.dataTrip;
    this.appServis.diskusi(this.dataTrip).subscribe(discus =>{
      this.diskus = discus.data;
    })
  }

  review;
  getReview(){
    this.appServis.review(this.dataTrip).subscribe(riview =>{
      this.review = riview.data;
    })
  }
  sendDate(e){
    // this.book.startDate_trip = e.target.value;
    
  }
  quantity=1;
  goToProsespemesanan(){
    
   if(!(sessionStorage.token == null)){
     if(this.formBooking.valid){
      this.formBooking.patchValue({
        _id: this.dataTrip, 
        publish_price: this.totalHarga,
        id_type_trip: this.detailTrip.id_type_trip._id,
        quantity: this.quantity,
        flag_type_trip: this.detailTrip.data.id_type_trip.id_type_trip
        
      })
      console.log(this.formBooking.value)
        this.appServis.booking(this.formBooking.value).subscribe(book => {
        sessionStorage.setItem("book_trip", JSON.stringify(book.data));
        if (book.status == 200){
          this.router.navigate(['/ProsesPemesanan']);
        }
      });
     }else{
      this.validateAllFormFields(this.formBooking);
     }
   }else {
    alert('Please log in') 
    this.router.navigate(['/LoginPage']);
    return false;
   }
  }

  totalHarga;
  increment() { 
    // this.appServis.updateProduct(this.totalHargaBayar+1)
    // this.totalHargaBayar = 1; 
    this.quantity++;
    this.totalHarga = this.quantity * this.hargaProduct;
    this.formBooking.value.publish_price = this.totalHarga;
    // console.log(this.totalHarga)

  }

  decrement() {
    // this.totalHargaBayar = 1;
      if(this.quantity >1){
        // this.appServis.updateProduct(this.totalHargaBayar-1)
        this.quantity--;
        this.totalHarga = this.quantity * this.hargaProduct;
        this.formBooking.value.publish_price = this.totalHarga;
      }
  }

  showComment: boolean = false;

  textContent;
  sendComment(){
    if(!(sessionStorage.token == null)){
    this.appServis.sendDiskusi(this.dataTrip,this.text).subscribe(text =>{
      console.log(text);
    })
  }else{
    this.router.navigate(['/LoginPage']);
    }
  }

  quota_left : number[];
  quota_dateTrip: number = null
  dateTrip: string ;
  // showLeft : boolean = false;
  onChange(event){
    this.quota_dateTrip = this.quota_left[event-1];
    this.dateTrip = this.date[event-1];
    console.log(this.dateTrip);
  }

  cekLogin: boolean = false;
  get isLogin(){
    if(!(sessionStorage.token == null)){
      return this.cekLogin = true;
    }
  } 

  goToAgen(){
    this.router.navigate(['/EtalaseTravel/' + this.idAgen])
  }
}