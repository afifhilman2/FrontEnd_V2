import { Component, OnInit, Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { Http, Headers, Response } from '@angular/http';
import { FormBuilder, FormControl, FormArray, Validator, Validators, FormGroup } from '@angular/forms';
import { Router, CanActivate } from '@angular/router';
import 'rxjs/add/operator/map';

Injectable()

@Component({
  selector: 'app-daftar-trip',
  templateUrl: './daftar-trip.component.html',
  styleUrls: ['./daftar-trip.component.css']
})
export class DaftarTripComponent implements OnInit {

  tripProvider:any[];
  photo_trip:any[];
  data:number = 0;
  date:any[];
  indexDate:any;
  idTrip:any;
  hapus:any;
  night:any;
  discount_price:any;

  quota = {
    quota_trip:[] =[]
  }

  diskon = {
    discount_date:[]=[]
  }

  diskonForm = this.fb.group({
    value:['', Validators.required]
  })
  

  constructor( public appService:AppService, private http:Http, public router:Router, private fb:FormBuilder) { 
    this.appService.getTripProvider().subscribe (Trip =>{

      this.tripProvider = Trip.trip;
      this.date = Trip.trip[this.data].date_trip
      
      // console.log(this.tripProvider)

      if (Trip.success == false) {
        alert('Belum ada trip');
        }
    })
  }

   //token localstorage
   createAuthorizationHeader (headers:Headers) {
    headers.append('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
}

kosong(i,e) {
  this.data=i;
  this.idTrip = e.target.id
}

beriDiskon(i,e) {
  this.data=i;
  this.idTrip = e.target.id
}

discPrice(e){
  this.discount_price = e.target.value;
  // console.log(this.discount_price);
}

keyPress(event: any) {
  const pattern = /[0-9]/;

  let inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
  }
}

checked(e,y) {
  // for(this.indexDate=0; this.indexDate<this.data; this.indexDate++){
  //   this.quota.quota_trip[this.indexDate] = ''
  // }
  // const quotaArray = <FormArray>this.quota_null; 
  if(e.target.checked) {
    this.quota.quota_trip[y] = "0";
  }
  else  {
    this.quota.quota_trip[y] = '';
  }

}

checkedDiscount(e,d,y) {
  // const discountArray = <FormArray>this.diskonForm.controls.discount_date; 
  // console.log(discountArray);

  if(e.target.checked) {
    this.diskon.discount_date[y] = this.diskonForm.value.value;
    // discountArray.push(new FormControl(d));
    // console.log(this.diskon.discount_date);
  }
  else if(!e.target.checked)  {
    this.diskon.discount_date[y] = '';
    // console.log(this.diskon.discount_date);
    // let index = discountArray.controls.findIndex(x=> x.value == d)
    // discountArray.removeAt(index);
  }

}

  onSubmitKosong() {

    this.appService.kosongkanKuotaProvider(this.idTrip, this.quota).subscribe(kosong => {
      
      // console.log(kosong);
    })
  }

  onSubmitDiskon() {

    // console.log(this.diskon);
    // this.appService.beriDiskonProvider(this.idTrip, this.diskon).subscribe(diskon => {
      
      
    // })
  }

  ubahTrip(e){
    this.idTrip = e.target.id;
    this.router.navigate(['/JualTrip/UbahTrip', this.idTrip]);
  }

  salinTrip(e){
    this.idTrip = e.target.id;
    this.router.navigate(['/JualTrip/SalinTrip', this.idTrip]);
    // console.log(this.idTrip);
  }

  hapusTrip(trip) {
    
        let headers = new Headers();
        
        this.createAuthorizationHeader (headers);
        return this.http.post('https://travinesia.com:1210/v1/provider/delete_trip/'+ this.hapus, trip,
        {headers: headers})
        .subscribe(
          (res:Response)=> {
            let delTrip = res.json();
            // console.log(delTrip);
            if(delTrip.status == 200) {
        
                this.router.navigateByUrl('/free', {skipLocationChange: true}).then(()=>
                  this.router.navigate(['/JualTrip/DaftarTrip']));
             }
          }
        )
  }

  idHapus(e) {
    this.hapus = e.target.id;
  }

  goDetail(e){
    let id = e.target.id
    this.router.navigate(['/traveler/DetailPaket/' + id])
  }

  ngOnInit() {
  }

}
