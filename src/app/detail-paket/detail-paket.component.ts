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
import {IMyDpOptions, IMyDateModel} from 'mydatepicker';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-detail-paket',
  templateUrl: './detail-paket.component.html',
  styleUrls: ['./detail-paket.component.css']
})
export class DetailPaketComponent implements OnInit {

 
  dataTrip: any[];
  detailTrip;
  hargaProduct; 

  formBooking = this.fb.group({
    id_type_trip:'',
    quantity: '',
    publish_price: '',
    startDate_trip: '',
    _id:'',
    flag_type_trip:'',
  })

  flag_status;
  formatDate = new Date();

  text: any = {
    _id:'',
    content:'',
  }

  diskus;
  diskon
  photo;
  error = HttpErrorResponse;
  kat;
  date: string[];
  fasilitas;
  lat;
  lng;
  valueDiscount;
  discount_amount : number[] = [];
  travelAgent;

  url = 'https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d6030.418742494061!2d-111.34563870463673!3d26.01036670629853!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2smx!4v1471908546569';
  constructor(private toastr:ToastrService, public sanitizer: DomSanitizer, private fb: FormBuilder, private router: Router,private datePipe: DatePipe, public active: ActivatedRoute, private http2: HttpClient, private http: Http, private appServis: AppService) { 
    let id = this.active.snapshot.params['id'];
    this.dataTrip = id;

    this.getTrip();
    
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
    
    this.getDiskusi();
  }


  counterStars(i: number){
    return Array(Math.round(i)).fill(4);
  }

  idAgen;
  getTrip(): void{
    // this.book._id = this.dataTrip;
    this.http.get('https://travinesia.com:1210/get/trip_detail/' + this.dataTrip)
        .subscribe(
          (res:Response)=>{
            let trip = res.json();
            this.detailTrip = trip.data;
            // console.log(this.detailTrip)
            this.hargaProduct = trip.data.publish_price;
            // this.valueDiscount = trip.data.discount_date[0]
            // console.log(this.valueDiscount)
            this.kat = trip.data.category;
            this.quota_left = trip.data.quota_left; 
            this.date = trip.data.date_trip;
            this.diskon = trip.data.discount_date;
            this.fasilitas = trip.data.facility;
            this.idAgen = trip.data.provider._id;
            this.totalHarga = this.quantity * this.hargaProduct;
            this.lat = trip.data.latitude;
            this.lng = trip.data.longitude;
            this.url = 'https://maps.google.com/maps?q='+this.lat+','+this.lng+'&hl=es;z=14&amp&output=embed';
            // this.loaded = false;
            if(trip.data.flag_discount){
              for(var i = 0; i < trip.data.discount_date.length; i++){
                if(this.discount_amount==null && (trip.data.discount_date[i]!=null || trip.data.discount_date[i]!="")){
                  this.discount_amount = trip.data.discount_date[i];
                  // console.log(this.discount_amount)
                }
                else if(trip.data.discount_date[i]!=null || trip.data.discount_date[i]!=""){
                  if(trip.data.discount_date[i] > this.discount_amount){
                    this.discount_amount = trip.data.discount_date[i];
                    // console.log(this.discount_amount)
                  }
                }
              }
            }

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
    
    this.appServis.addCommentUser(this.coment.value).subscribe(comment => {
      // console.log(comment)  
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

  massage;
  quantity=1;
  goToProsespemesanan(){
    
   if(!(sessionStorage.token == null)){
     if(this.formBooking.valid){
      this.formBooking.patchValue({
        _id: this.dataTrip, 
        publish_price: this.hargaProduct,
        id_type_trip: this.detailTrip.id_type_trip._id,
        quantity: this.quantity,
        flag_type_trip: this.detailTrip.id_type_trip.id_type_trip
      })
      // console.log(this.formBooking.value)
      this.appServis.booking(this.formBooking.value).subscribe(book => {
        // console.log(book)
        sessionStorage.setItem("book_trip", JSON.stringify(book.data));
        if (book.status == 200){
          
          this.router.navigate(['/ProsesPemesanan']);
        }else if(book.status == 400){
          alert('Tanggal Belum dipilih')
          return false
        }else if(book.status == 401){
          this.massage = 'Silahkan Login terlebih dahulu'
        }
      });
      // console.log(this.formBooking.value)
      this.router.navigate(['/ProsesPemesanan']);
        
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
  privateTrip;
  increment() { 
    // console.log(this.detailTrip.id_type_trip.id_type_trip)
    // this.quantity++;
    // this.totalHarga = this.quantity * this.hargaProduct;
    // this.formBooking.value.publish_price = this.totalHarga;
    
    if(this.detailTrip.id_type_trip.id_type_trip == 2){
      this.quantity++; 
      // console.log(this.detailTrip.min_qty_group.length) 
      for( let i = 0; i<this.detailTrip.min_qty_group.length; i++ ){

        if(this.quantity >= this.detailTrip.min_qty_group[i] && this.detailTrip.min_qty_group[i] !=""){
          
          this.hargaProduct = this.detailTrip.publish_price_group[i]
          // console.log(this.hargaProduct)
          this.totalHarga = this.quantity * this.hargaProduct;
        }
        else{
          this.totalHarga = this.quantity * this.hargaProduct;
          }  
      }
    }else if(this.detailTrip.id_type_trip.id_type_trip == 1){
      this.quantity++;
      this.hargaProduct;
      this.totalHarga = this.quantity * this.hargaProduct;
      // console.log(this.hargaProduct)
      // this.formBooking.value.publish_price = this.totalHarga;

    }
    
  }

  decrement() {
    // this.totalHargaBayar = 1;
      if(this.quantity >1){
        // this.appServis.updateProduct(this.totalHargaBayar-1)
        this.quantity--;
        this.totalHarga = this.quantity * this.hargaProduct;
      }
  }

  showComment: boolean = false;

  textContent;
  sendComment(){
    if(!(sessionStorage.token == null)){
    this.appServis.sendDiskusi(this.dataTrip,this.text).subscribe(text =>{
      // console.log(text);
    })
  }else{
    this.router.navigate(['/LoginPage']);
    }
  }

  quota_left : number[];
  quota_dateTrip: number = null
  dateTrip: string ;
  discount;
  harga;
  // showLeft : boolean = false;
  onChange(event, price){
    this.quota_dateTrip = this.quota_left[event-1];
    this.dateTrip = this.date[event-1];
    this.discount = this.diskon[event-1];
    if(this.discount_amount!=null && (this.diskon[event-1]!=null)){
      this.hargaProduct = price * ((100-this.diskon[event-1])/100);
      this.totalHarga = this.quantity * this.hargaProduct;

    }
    else if(this.diskon[event-1] == 0){
      this.hargaProduct = price;
      this.totalHarga = this.quantity * this.hargaProduct;
    }
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

  dateValue(event: IMyDateModel){
    this.formBooking.patchValue({
      startDate_trip : event.jsdate,
    })
  }

  public myDatePickerOptions: IMyDpOptions = {
      
    dateFormat: 'dd mmm yyyy',
    sunHighlight: true,
    inline: false,
    disableUntil: {year: this.formatDate.getFullYear(), month: this.formatDate.getMonth() + 1, day: this.formatDate.getDate()-1},
    editableDateField: false,
    openSelectorOnInputClick: true,
  };

  kerimPesan(){
    this.toastr.warning('Silahkan Hubungi No '+this.detailTrip.provider.office_phone_number, 'Fitur Dalam Tahap Pengembangan')
  }

  goDiskon(){
    this.router.navigate(['/search'],{queryParams:{flag_search: 4}});
  }

  gototerm(){
    this.toastr.warning('Masih Dalam Pengembangan')
  }

  toggle_travel(travel){
    this.router.navigate(['travel/'+travel])
  }
}