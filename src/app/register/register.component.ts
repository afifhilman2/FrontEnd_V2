import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppService } from '../app.service';
import { Router } from '@angular/router';

import { AuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

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


  data = {
    name:'',
    telephone:'',
    email:'',
    photo:''
  }

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
  constructor( private fb: FormBuilder, private appService: AppService, private router:Router, private authService: AuthService) { 
  }

  private userSocial: SocialUser;
  private loggedIn: boolean;

  ngOnInit() {
    
  }
  massage: boolean = false;
  onSubmit(){
    if(this.formRegister.valid){
      this.appService.registerUser(this.formRegister.value).subscribe(newUser =>{
          console.log(newUser)
          if(newUser.status == 200){
            sessionStorage.setItem("newUser.stauts", newUser.status)
            this.router.navigate(['/LoginPage']); 
          } else if(newUser.status == 406){
            this.massage = !this.massage;
          }
      })
    }else{
      this.validateAllFormFields(this.formRegister);
    }
  }

  // fbLogin() {
  //   this.appService.fbLogin().then(() => {
  //     console.log('User has been logged in');
  //     this.router.navigate(['/']);
  //   });  }

    signInWithGoogle(): void {
      this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
      this.authService.authState.subscribe((user) => {
        this.userSocial = user;
      });
      this.appService.loginGoogle(this.userSocial.authToken).subscribe(userGoogle => {
        console.log(userGoogle)
        if(userGoogle.status == 200){
          this.data.name = userGoogle.name;
          this.data.photo = userGoogle.photo;
          this.data.email = userGoogle.email;
          this.data.telephone = userGoogle.telephone;
          sessionStorage.setItem("token", userGoogle.token);
          sessionStorage.setItem("branch_session", JSON.stringify(this.data));
          if(sessionStorage.getItem('url_login')){
            this.router.navigate([sessionStorage.getItem('url_login')]);
            sessionStorage.removeItem('url_login');
          }
          else{
            this.router.navigate(['']);
          }
        }
      })
    }
  
    signInWithFB(): void {
      this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
      this.authService.authState.subscribe((user) => {
        this.userSocial = user;
      });
      this.appService.loginFacebook(this.userSocial.authToken).subscribe(user => {
        console.log(user)
        if(user.status==200){
          this.data.name = user.name;
          this.data.photo = user.photo;
          this.data.email = user.email;
          this.data.telephone = user.telephone;
          sessionStorage.setItem("token", user.token);
          sessionStorage.setItem("branch_session", JSON.stringify(this.data));
          if(sessionStorage.getItem('url_login')){
            this.router.navigate([sessionStorage.getItem('url_login')]);
            sessionStorage.removeItem('url_login');
          }
          else{
            this.router.navigate(['']);
          }
        }
        else if(user.status==400){
          console.log(user.message)
        }
        else if(user.status==403){
          console.log(user.message)
        }
      })
    } 
  
    signOut(): void {
      this.authService.signOut();
    }
}  
