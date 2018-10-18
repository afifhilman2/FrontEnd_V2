import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,  ParamMap, NavigationExtras } from "@angular/router";
import { AppService} from '../app.service';
import { Http, Headers, Response} from '@angular/http';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/switchMap';
import { Product } from '../product';

import { DatePipe, LOCATION_INITIALIZED } from '@angular/common';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-detail-paket',
  templateUrl: './detail-paket.component.html',
  styleUrls: ['./detail-paket.component.css']
})
export class DetailPaketComponent implements OnInit {

  public counter : number;
  idtrip: any[];
  dataTrip: any[];
  detailTrip;
  hargaProduct; 

  formBooking = this.fb.group({
    id_type_trip:'',
    quantity: 1,
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

  
  constructor(private fb: FormBuilder, private router: Router,private datePipe: DatePipe, public active: ActivatedRoute, private http2: HttpClient, private http: Http, private appServis: AppService) { 
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
    
  }

  idAgen;
  getTrip(): void{
    // this.book._id = this.dataTrip;
    this.http.get('http://travinesia.com:3000/get/trip_detail/' + this.dataTrip)
        .subscribe(
          // trip =>{ 
          //   console.log(trip);
          // }
          (res:Response)=>{
            let trip = res.json();
            this.detailTrip = trip.data;
            // console.log(this.detailTrip)
            this.hargaProduct = trip.data.publish_price;
            // this.formBooking.value.publish_price = this.formBooking.value.quantity * this.hargaProduct;
            this.photo = trip.data.photo_trip;
            this.kat = trip.data.category;
            // this.formBooking.value.id_type_trip = trip.data.id_type_trip._id;
            this.quota_left = trip.data.quota_left; 
            this.date = trip.data.date_trip;
            this.fasilitas = trip.data.facility;
            this.idAgen = trip.data.provider._id
            // console.log(this.fasilitas)
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
    // this.book.startDate_trip = e.target.value;
    
  }
  bookId;
  goToProsespemesanan(){
   if(!(localStorage.token == null)){
     if(this.formBooking.valid){
      this.formBooking.patchValue({
        _id: this.dataTrip, 
        publish_price: this.detailTrip.publish_price,
        id_type_trip: this.detailTrip.id_type_trip._id,
        
        // id_type_trip : 
      })
        this.appServis.booking(this.formBooking.value).subscribe(book => {
        let navigationExtras : NavigationExtras={
          queryParams : { data: JSON.stringify(book.data) }
        }
        if (book.status == 200){
          this.router.navigate(['/ProsesPemesanan'], navigationExtras);
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

  increment() { 
    // this.appServis.updateProduct(this.totalHargaBayar+1)
    // this.totalHargaBayar = 1; 
    this.formBooking.value.quantity++;
    // this.formBooking.value.publish_price = this.formBooking.value.quantity * this.hargaProduct;
    // console.log(this.totalHarga)

  }

  decrement() {
    // this.totalHargaBayar = 1;
      if(this.formBooking.value.quantity >1){
        // this.appServis.updateProduct(this.totalHargaBayar-1)
        this.formBooking.value.quantity--;
        // this.formBooking.value.publish_price = this.formBooking.value.quantity * this.hargaProduct;

      }
  }

  showComment: boolean = false;

  textContent;
  sendComment(){
    if(!(localStorage.token == null)){
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
    if(!(localStorage.token == null)){
      return this.cekLogin = true;
    }
  } 

  goToAgen(){
    this.router.navigate(['/EtalaseTravel/' + this.idAgen])
  }
}