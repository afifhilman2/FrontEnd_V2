import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formRegister = this.fb.group({
    name:['', Validators.required],
    telephone:['', Validators.required],
    email:['', Validators.required],
    password:['',[Validators.required, Validators.minLength(8)]],
  })
  // newUser = {
  //   name:'',
  //   telephone:'',
  //   email:'',
  //   password:''
  // }

  show: boolean = false;
  password(){
    this.show = !this.show;
  }

  isFieldValid(field: string) {
    return !this.formRegister.get(field).valid && this.formRegister.get(field).touched;
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
  constructor( private fb: FormBuilder, private appService: AppService, private router:Router) { 
  }

  ngOnInit() {
  }
  
  onSubmit(){
    if(this.formRegister.valid){
      this.appService.registerUser(this.formRegister.value).subscribe(newUser =>{
          console.log(newUser)
          if(newUser.status = 200){
            sessionStorage.setItem("newUser.stauts", newUser.status)
            this.router.navigate(['/LoginPage']); 
          }
      })
    }else{
      this.validateAllFormFields(this.formRegister);
    }
  }

  fbLogin() {
    this.appService.fbLogin().then(() => {
      console.log('User has been logged in');
      this.router.navigate(['/']);
    });  }
}  
