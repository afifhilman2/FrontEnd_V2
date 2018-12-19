import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { AppService } from '../app.service';
import { TokenParams } from '../token/token-params.component';
import { AuthService } from '../token/auth.service';
import { Router, CanActivate } from '@angular/router';
import { Http, Response } from '@angular/http';
import { DataService} from '../data.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-header-provider',
  templateUrl: './header-provider.component.html',
  styleUrls: ['./header-provider.component.css']
})
export class HeaderProviderComponent implements OnInit {
  tripData;
  user = {
    email:'',
    password:''
  }

  loginChange:boolean = false;

  showLogin:boolean = false;

  rForm: FormGroup;
  post:any;
  email:string ='';
  password:string = '';
  emailAlertMessage:string ='';
  passwordAlertMessage:string ='';
  emailAtAlertMessage:string ='';


  changeHead:boolean = true;
  changeHeadUser:boolean = false;

  categoryAllTrip:any[];
  categoryAllTripId:any[];
  idCategory:any[];

  getTripSearch:any[]=[];
  trip: any[];


  filterTrip;

  showDropDown: boolean = false;

  stateForm: FormGroup;
  loginUser: boolean = false;

  login;

  profile:any =[];
  provider:any=[];
  query:any;
  name;

  dropLogout: boolean = false;

  dataUser;
  photo;
  photos = ("../assets/img/user.png");

  querySearch(e) {
    this.query= e.target.value;
    // console.log(this.query);

  }

  toggleLogin():void {
    this.showLogin = !this.showLogin;
  }

  toggleDropdown():void {
    this.showDropDown = !this.showDropDown;
  }

  logout(): void{
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');

    this.router.navigateByUrl('/free', {skipLocationChange: true}).then(()=>
    this.router.navigate(['']))
  }

  
  constructor( public data:DataService, private http:Http, private fb: FormBuilder, public appService: AppService, private authService:AuthService, private router:Router, myElement: ElementRef) {


    this.appService.getProvider().subscribe(profile => {
      // console.log(profile);
      
      this.photos = profile.provider.logo;
    })

    // get all category trip
    this.appService.getCategoryTrip().subscribe (categoryAllTrip =>  {
      this.categoryAllTrip = categoryAllTrip.data; 
    });
    

    this.appService.getDataTrip().subscribe(dataTrip => {
      this.filterTrip = dataTrip.data;
      this.name = dataTrip.data.trip_name;
      // console.log(this.filterTrip);
    });

    //validation
    this.initializeErrorMessage();
    this.rForm = fb.group({
      'password':[null, Validators.required],
      'email':['', Validators.required],
    });

    // cek login

    // if(!(localStorage.token == null)){
    //   this.loginUser = true; //true jika toke ada
    // }else{
    //   this.loginUser = false; //jika token gak ada
    // }
    // this.login

    // this.initForm();

  }

   //searchById
   
   searchTrip(e) {
    this.idCategory = e.target.id;
    this.router.navigateByUrl('/free', {skipLocationChange: true}).then(()=>
    this.router.navigate(['/search', this.idCategory]))
  }


   initializeErrorMessage() {
    this.emailAlertMessage = "Email harus diisi";
    this.passwordAlertMessage = "Password harus diisi";
    this.emailAtAlertMessage = "Alamat email salah"
  }

    //login
   onSubmit() {
  
    this.appService.addUser(this.user).subscribe(user => {
      localStorage.setItem("token", user.token);
      // console.log(user);
      
      // this.login = user.success;
      // console.log(this.login)
      if (user.success== true) {
        this.login = user.token;
        
        // this.changeHead = !this.changeHead;
        // this.changeHeadUser = !this.changeHeadUser;
      //   this.router.navigateByUrl('/free', {skipLocationChange: true}).then(()=>
      //   this.router.navigate([''])
      // )
        
      }
      else {
        alert("Login Gagal");
        // this.router.navigate(['']);
      }
    })
   }

   addPost (post) {
     this.email = post.email;
     this.password = post.password;
   }

   //token field
   tokenParams:TokenParams;
   myToken:string;

  //  search(term: string): void {
  //   this.searchTerms.next(term);
  // }

  ngOnInit() {
  }

}
