import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

import { Router, CanActivate } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, FormArray, Validator, Validators } from '@angular/forms';
// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/map';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {
  // searchTerm : FormControl = new FormControl();

  // searchResult = [];
  formLogin = this.fb.group({
    email :['',Validators.required],
    password:['',[Validators.required, Validators.minLength(8)]]
  })

  notifEmail: boolean = false;
  
  isFieldValid(field: string) {
    return !this.formLogin.get(field).valid && this.formLogin.get(field).touched;
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
  
  
  show: boolean = false;
  password() {
    this.show = !this.show;
  }

  massage;

  constructor(private service: AppService, private router: Router, private fb:FormBuilder){
    
    this.massage = JSON.parse(sessionStorage.getItem("newUser.stauts"))
    console.log(this.massage)

  }

  
  ngOnInit() {
  }

  userTravel;
  noUser;
  providerTravel;
  onSubmit() {
  
    this.service.addUser(this.formLogin.value).subscribe(loginUser => {
      sessionStorage.setItem("token", loginUser.token);
      sessionStorage.setItem("role", loginUser.role);
      if (sessionStorage.token == loginUser.token) {
        if (sessionStorage.role == 1 ) {
          this.userTravel = false;
          this.noUser = true;
          this.providerTravel = true;
          this.router.navigate(['']);
        }
  
        else if (sessionStorage.role == 2) {
  
          this.providerTravel = false;
          this.noUser = true;
          this.userTravel = true;
  
          this.router.navigateByUrl('/free', {skipLocationChange: true}).then(()=>
          this.router.navigate([''])
        )
        }
      }
      else {
        this.validateAllFormFields(this.formLogin)
      }
    })
   }

}
