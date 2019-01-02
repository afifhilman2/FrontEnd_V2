import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

import { Router, CanActivate } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, FormArray, Validator, Validators } from '@angular/forms';
// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/map';

import { AuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {
  // searchTerm : FormControl = new FormControl();

  // searchResult = [];
  
  data = {
    name:'',
    telephone:'',
    email:'',
    photo:''
  }

  formLogin = this.fb.group({
    email :['',Validators.required],
    password:['',[Validators.required, Validators.minLength(8)]]
  })

  notifEmail: boolean = false;
  private userSocial: SocialUser;
  private loggedIn: boolean;
  
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

  constructor(private toastr:ToastrService ,private service: AppService, private router: Router, private fb:FormBuilder, private authService: AuthService){
    
    // this.massage = JSON.parse(sessionStorage.getItem("newUser.stauts"))
    // console.log(this.massage)

    var os = this.getMobileOperationSystem();
    if(os == 'Android' || os == 'Windows Phone' || os == 'iOS'){
      window.location.href = 'https://m.travinesia.com/login'
    }
  }

  
  ngOnInit() {
  }

  userTravel;
  noUser;
  providerTravel;
  onSubmit() {
  
    this.service.addUser(this.formLogin.value).subscribe(loginUser => {
      if (this.formLogin.valid) {
        if( loginUser.status == 200){
          // sessionStorage.setItem("token", loginUser.token);
          sessionStorage.setItem("role", loginUser.role);
          this.data.name = loginUser.name;
          this.data.photo = loginUser.photo;
          this.data.email = loginUser.email;
          this.data.telephone = loginUser.telephone;
          sessionStorage.setItem("token", loginUser.token);
          sessionStorage.setItem("branch_session", JSON.stringify(this.data));
          this.toastr.success('Login Berhasil')
          this.router.navigate([''])
        } else if(loginUser.status == 403){
          this.toastr.warning('Silahkan Verifikasi Akun Anda', '', { timeOut: 5000 })
        } else if(loginUser.status == 400){
          this.toastr.error('Email atau Password Salah', '', {timeOut:5000})
        }
      }
      else {
        this.validateAllFormFields(this.formLogin)
      }
    })
   }

   signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.authService.authState.subscribe((user) => {
      this.userSocial = user;
    });
    this.service.loginGoogle(this.userSocial.authToken).subscribe(userGoogle => {
      // console.log(userGoogle)
      if(userGoogle.status == 200){
        this.data.name = userGoogle.name;
        this.data.photo = userGoogle.photo;
        this.data.email = userGoogle.email;
        this.data.telephone = userGoogle.telephone;
        sessionStorage.setItem("token", userGoogle.token);
        sessionStorage.setItem("branch_session", JSON.stringify(this.data));
        sessionStorage.setItem("role", userGoogle.role);
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
    this.service.loginFacebook(this.userSocial.authToken).subscribe(user => {
      // console.log(user)
      if(user.status==200){
        this.data.name = user.name;
        this.data.photo = user.photo;
        this.data.email = user.email;
        this.data.telephone = user.telephone;
        sessionStorage.setItem("token", user.token);
        sessionStorage.setItem("branch_session", JSON.stringify(this.data));
        sessionStorage.setItem("role", user.role);
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

  signOut(): void {
    this.authService.signOut();
  }

  
  getMobileOperationSystem(){
    var userAgent = navigator.userAgent;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent)) {
        return "iOS";
    }

    return "unknown";
  }
}
