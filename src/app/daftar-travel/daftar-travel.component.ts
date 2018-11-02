import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Http } from '@angular/http';
import { FormGroup, FormBuilder, FormControl, FormArray, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-daftar-travel',
  templateUrl: './daftar-travel.component.html',
  styleUrls: ['./daftar-travel.component.css']
})
export class DaftarTravelComponent implements OnInit {

  text200:boolean = false;
  text400:boolean = false;
  activeModal:boolean= false;
  blurModal:boolean= false;
  responModal:boolean = false;
  photo:any = '../assets/img/user.png';
  size;
  type;
  imgError:boolean = true;

  toggleLogin():void {
    this.activeModal = false;
    this.blurModal = false;
    this.text200 = false;
    this.text400 = false;
    this.responModal = false;
  }

  closeModal():void {
    this.activeModal = false;
    this.responModal = false;
    this.blurModal = false;
    this.text200 = false;
    this.text400 = false;

  }


  myForm = this.fb.group({
    travel_name:['', Validators.required],
    slogan :['', Validators.required], 
    description :['', Validators.required], 
    office_address :['', Validators.required], 
    province :['', Validators.required], 
    office_phone_number :['', [Validators.required, Validators.minLength(10)]], 
    domain :['', Validators.required], 
    logo : ['', Validators.required], 
    medsoc_account:['', Validators.required],
  })
  
  province:any[];

  // validation function

isFieldValid(field: string) {
  return !this.myForm.get(field).valid && this.myForm.get(field).touched;
}

displayFieldCss(field: string) {
  return {
    'has-error': this.isFieldValid(field),
    'has-feedback': this.isFieldValid(field)
  };
}

// validate submit
  validateAllFormFields(formGroup: FormGroup) {         
    Object.keys(formGroup.controls).forEach(field => { 
      const control = formGroup.get(field);            
      
      if (control instanceof FormControl) {            
        control.markAsTouched({ onlySelf: true });

      } else if (control instanceof FormGroup) {        
        this.validateAllFormFields(control);            
      }
    });
  }

  validate1(field: string) { 
    const control = this.myForm.get(field);            
    
    if (control instanceof FormControl) {            
      control.markAsTouched({ onlySelf: true });

    }
}

  keyPress(event: any) {
    const pattern = /[0-9]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  domainPress(event: any) {
    const pattern = /[0-9\_\-\a-z]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  socialPress(event:any) {
    const pattern = /[0-9\_\-\a-z]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }


  constructor( public appService:AppService, private fb:FormBuilder, private http:Http ) {
    this.appService.getProvinceTrip().subscribe(province => {
      this.province = province.data;   
    });
   }

   onNext() {
    if (this.myForm.controls.travel_name.valid && this.myForm.controls.slogan.valid && this.myForm.controls.description.valid && this.myForm.controls.office_address.valid && this.myForm.controls.province.valid && this.myForm.controls.office_phone_number.valid && this.myForm.controls.domain.valid && this.myForm.controls.medsoc_account.valid ) 
    
    {
      this.activeModal = true;
      this.blurModal = true;
        
    } else {
      this.validate1('travel_name');
      this.validate1('slogan');
      this.validate1('description');
      this.validate1('office_address');
      this.validate1('province');
      this.validate1('office_phone_number');
      this.validate1('domain');
      this.validate1('medsoc_account');
    }      
   }

   onSubmitTravel() {
    
    this.appService.postBeTravel(this.myForm.value).subscribe(travel => {
      console.log(travel);

      if(travel.status == 200) {

        this.activeModal = false;
        this.blurModal = true;
        this.responModal = true;
        this.text200 = true;
        this.text400 = false;
        
                

      } else if (travel.status == 400) {
        
        this.activeModal = false;
        this.blurModal = true;
        this.responModal = true; 
        this.text400 = true;
        this.text200 = false;
        
      }

      })
      
    if (this.myForm.valid) {
      this.activeModal = false;
      
        
    } else {
     this.validateAllFormFields(this.myForm);
    }      
  }

  public base64textString:String="";
  
  handleFileSelect(evt){

    this.size = evt.target.files[0].size;
    this.type = evt.target.files[0].type;

    if(this.type == 'image/png' || this.type == 'image/jpg' || this.type == 'image/jpeg') {
     
      let files = evt.target.files;
      let file = files[0];
    
    if (files && file) {
        let reader = new FileReader();

        reader.onload =this._handleReaderLoaded.bind(this);

        reader.readAsBinaryString(file);
    }

    }

    else 

    {
      this.imgError = false;
      this.activeModal = false;
      this.responModal = false;
      this.blurModal = false;
      this.text200 = false;
      this.text400 = false;
    }
     
  }
  
  _handleReaderLoaded(readerEvt) {
     let binaryString = readerEvt.target.result;
            this.myForm.value.logo= btoa(binaryString);    
            this.photo = "data:image/jpeg;base64,"+ btoa(binaryString);   
    }

    close() {
      this.imgError = true;
    }

  ngOnInit() {
  }

}
