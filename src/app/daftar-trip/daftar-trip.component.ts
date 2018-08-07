import { Component, OnInit, Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { Http, Headers, Response } from '@angular/http';
import { Router, CanActivate } from '@angular/router';
import 'rxjs/add/operator/map';

Injectable()

@Component({
  selector: 'app-daftar-trip',
  templateUrl: './daftar-trip.component.html',
  styleUrls: ['./daftar-trip.component.css']
})
export class DaftarTripComponent implements OnInit {

  tripProvider:any[]

  idTrip:any;
  night:any;



  constructor( public appService:AppService, private http:Http, public router:Router) { 
    this.appService.getTripProvider().subscribe (Trip =>{
      this.tripProvider = Trip.provider_trip;
      console.log(Trip);
    })
  }

   //token localstorage
   createAuthorizationHeader (headers:Headers) {
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
}


  ubahTrip(e){
    this.idTrip = e.target.id;
    this.router.navigate(['/JualTrip/UbahTrip', this.idTrip]);
  }

  hapusTrip(e, trip) {
    this.idTrip = e.target.id;
        let headers = new Headers();
        
        this.createAuthorizationHeader (headers);
        return this.http.post('http://travinesia.com:3000/v1/provider/delete_trip/'+ this.idTrip, trip,
        {headers: headers})
        .subscribe(
          (res:Response)=> {
            let delTrip = res.json();
            console.log(delTrip);
            if(delTrip.status == 204) {
              // this.router.navigate(['/JualTrip/DaftarTrip']);
        
                this.router.navigateByUrl('/free', {skipLocationChange: true}).then(()=>
                  this.router.navigate(['/JualTrip/DaftarTrip']));
             }
          }
        )
  }

  kosongkanTrip(e, trip) {
    this.idTrip = e.target.id;
        let headers = new Headers();
        
        this.createAuthorizationHeader (headers);
        return this.http.put('http://travinesia.com:3000/v1/provider/quota_null/'+ this.idTrip, trip,
        {headers: headers})
        .subscribe(
          (res:Response)=> {
            let nullTrip = res.json();
            console.log(nullTrip);
            // if(nullTrip.status == 204) {
            //   // this.router.navigate(['/JualTrip/DaftarTrip']);
        
            //     this.router.navigateByUrl('/free', {skipLocationChange: true}).then(()=>
            //       this.router.navigate(['/JualTrip/DaftarTrip']));
            //  }
          }
        )

        
  }

  ngOnInit() {
  }

}
