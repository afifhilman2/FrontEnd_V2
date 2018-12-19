import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Http } from '@angular/http';
import {Router, ActivatedRoute} from "@angular/router";
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-ubah-profil-travel',
  templateUrl: './ubah-profil-travel.component.html',
  styleUrls: ['./ubah-profil-travel.component.css']
})
export class UbahProfilTravelComponent implements OnInit {

  photoLogo = '';
  photoCover = '';
  size;
  type;
  imgError:boolean = true;
  id;

  myForm = this.fb.group({
    description:'',
    office_address:'',
    province:'',
    office_phone_number:'',
    slogan:'',
    logo:'',
    cover:''
  }
)

  provinceTrip:any[];
  

  constructor(public appService:AppService, private toastr: ToastrService, public fb:FormBuilder, private http:Http, private router:Router) {
    this.appService.getProvider().subscribe(profile => {
      // console.log(profile.provider)

      this.photoLogo = profile.provider.logo;
      this.photoCover = profile.provider.cover;
      this.id = profile.provider._id;

      this.myForm.patchValue({
        slogan : profile.provider.slogan,
        description : profile.provider.description,
        office_address : profile.provider.office_address,
        province : profile.provider.province._id,
        office_phone_number : profile.provider.office_phone_number,

      })

    })


    this.appService.getProvinceTrip().subscribe( province => {
      this.provinceTrip = province.data;
    })

   }

   onEditProfile() {

     this.appService.editProfileProvider(this.myForm.value).subscribe(provider =>{
      //  console.log(provider);
       if(provider.status == 200) {

        this.toastr.success('Profil Travel Berhasil diubah');
 
         this.router.navigateByUrl('/free', {skipLocationChange: true}).then(()=>
           this.router.navigate(['/EtalaseTravel/'+ this.id]));
      }
     })
   }

   keyPress(event: any) {
    const pattern = /[0-9]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  
  close() {
    this.imgError = true;
  }

  uploadImage1(evt) {

    this.size = evt.target.files[0].size;
    this.type = evt.target.files[0].type;

    if(this.type == 'image/png' || this.type == 'image/jpg' || this.type == 'image/jpeg') {

      let files = evt.target.files;
      let file = files[0];
    
    if (files && file) {
        let reader = new FileReader();

        reader.onload =this._handleReaderLoaded1.bind(this);

        reader.readAsBinaryString(file);
    }

    } else 

    {
      this.imgError = false;
    }

  }
  
  _handleReaderLoaded1(readerEvt) {
     let binaryString = readerEvt.target.result;

      this.myForm.value.logo= btoa(binaryString); 
      this.photoLogo="data:image/jpeg;base64,"+ btoa(binaryString); 
      
      this.appService.editLogoProvider(this.myForm.value).subscribe(logo => {
      }) 
            
    }

    uploadImageCover(evt) {

      this.size = evt.target.files[0].size;
      this.type = evt.target.files[0].type;
  
      if(this.type == 'image/png' || this.type == 'image/jpg' || this.type == 'image/jpeg') {

        let files = evt.target.files;
        let file = files[0];
      
      if (files && file) {
          let reader = new FileReader();
  
          reader.onload =this._handleReaderLoadedCover.bind(this);
  
          reader.readAsBinaryString(file);
      }

      } else 

      {
        this.imgError = false;
      }
      
    }
    
    _handleReaderLoadedCover(readerEvt) {
      let binaryString = readerEvt.target.result;
      this.myForm.value.cover= btoa(binaryString); 
      this.photoCover="data:image/jpeg;base64,"+ btoa(binaryString);   

      this.appService.editCoverProvider(this.myForm.value).subscribe(cover => {
    })
            
             
      }


  ngOnInit() {
    window.scrollTo(0, 0);
  }

}
