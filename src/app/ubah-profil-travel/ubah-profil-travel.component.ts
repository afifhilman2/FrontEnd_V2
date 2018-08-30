import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Http } from '@angular/http';
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-ubah-profil-travel',
  templateUrl: './ubah-profil-travel.component.html',
  styleUrls: ['./ubah-profil-travel.component.css']
})
export class UbahProfilTravelComponent implements OnInit {

  

  provider = {
    slogan:'',
    description:'',
    office_address:'',
    province:'',
    office_phone_number:'',
    cover:'',
  }

  provinceTrip:any[];
  

  constructor(public appService:AppService, private http:Http, private router:Router) {
    this.appService.getProvider().subscribe(profile => {
      this.provider.slogan = profile.provider.slogan;
      this.provider.description = profile.provider.description;
      this.provider.office_address = profile.provider.office_address;
      this.provider.province = profile.provider.province;
      this.provider.office_phone_number = profile.provider.office_phone_number;

    })

    this.appService.getProvinceTrip().subscribe( province => {
      this.provinceTrip = province.data;
    })

   }

   onEditProfile() {
     this.appService.editProfileProvider(this.provider).subscribe(provider =>{
       console.log(provider);
       if(provider.status == 200) {
 
         this.router.navigateByUrl('/free', {skipLocationChange: true}).then(()=>
           this.router.navigate(['/JualTrip/JualTrip']));
      }
     })
   }


  ngOnInit() {

  }

}
