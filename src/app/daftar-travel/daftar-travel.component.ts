import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { TokenParams } from '../token/token-params.component';
import { AuthService } from '../token/auth.service';
import { Http } from '@angular/http';
import { toBase64String } from '@angular/compiler/src/output/source_map';

@Component({
  selector: 'app-daftar-travel',
  templateUrl: './daftar-travel.component.html',
  styleUrls: ['./daftar-travel.component.css']
})
export class DaftarTravelComponent implements OnInit {

  showLogin:boolean = false;

  toggleLogin():void {
    this.showLogin = !this.showLogin;
  }


  travel = {
    travel_name:'',
    slogan :'', 
    description :'', 
    office_address :'', 
    province :'', 
    office_phone_number :'', 
    domain :'', 
    logo : ''
  }
  

  province:any[];

  constructor( public appService:AppService, private http:Http ) {
    this.appService.getProvinceTrip().subscribe(province => {
      this.province = province.data;   
    });
   }

   onSelectProv(e) {
     this.travel.province = e.target.value;
   }

   onSubmitTravel() {
     this.appService.postBeTravel(this.travel).subscribe(travel => {
      console.log(travel);
      })
      
  }


  public base64textString:String="";

  
  handleFileSelect(evt){
      let files = evt.target.files;
      let file = files[0];
    
    if (files && file) {
        let reader = new FileReader();

        reader.onload =this._handleReaderLoaded.bind(this);

        reader.readAsBinaryString(file);
    }
  }
  
  _handleReaderLoaded(readerEvt) {
     let binaryString = readerEvt.target.result;
            this.travel.logo= btoa(binaryString);          
    }


  ngOnInit() {
  }

}
