import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { AppService } from '../app.service';
import { TokenParams } from '../token/token-params.component';
// import { AuthService } from '../token/auth.service';
import { Router, CanActivate } from '@angular/router';
import { Http, Response } from '@angular/http';
import { TrvSearchResultComponent } from '../trv-search-result/trv-search-result.component';
import { DataService} from '../data.service';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

import { Subject }           from 'rxjs/Subject';
import { Product } from '../product';

import { AuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  // pipes : [SearchFilterPipe],
  
})
export class HeaderComponent implements OnInit {


  noUser = false;
  userTravel = true;
  providerTravel = true;
  
  data = {
    name:'',
    telephone:'',
    email:'',
    photo:''
  }

  tripData;

  user = {
    email:'',
    password:''
  }

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

  // stateForm: FormGroup;

  heroes: Observable<Product[]>;
  private searchTerms = new Subject<string>();
  name;
  loginUser: boolean = false;

  private userSocial: SocialUser;
  private loggedIn: boolean;

  profile:any =[];
  provider:any=[];
  query:any;

  dropLogout: boolean = false;

  dataUser;
  photos :"../assets/img/user.png";
  photosProvider :"../assets/img/user.png";

  userBio;
  travelBio;

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

  openLogout(): void{
    this.dropLogout = !this.dropLogout;
  }

  show: boolean = false;
  pwd() {
    this.show = !this.show;
  }
  
  results: Object;
  searchTerm$ = new Subject<string>();
  id;

  constructor(private toastr: ToastrService, public dataSevie:DataService, private http:Http, private fb: FormBuilder, public appService: AppService, private authService:AuthService, private router:Router, myElement: ElementRef) {

    this.appService.getCategoryTrip().subscribe (categoryAllTrip =>  {
      this.categoryAllTrip = categoryAllTrip.data; 
    });
    
    this.appService.getUsers().subscribe(profile => {
      if(profile.status == 200){
        this.photos = profile.data.photo;
        this.userBio = profile.data.name;
      }
    });

    this.appService.getProvider().subscribe(profile => {
      if(profile.status == 200){
        this.travelBio = profile.provider.travel_name;
        this.id = profile.provider._id
      }
    })

    this.appService.search(this.searchTerm$).subscribe(results => {
        this.results = results.data;
    });

    //validation
    this.initializeErrorMessage();
    this.rForm = fb.group({
      'password':[null, Validators.required],
      'email':['', Validators.required],
    });
  }

  logout(): void{
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');

    this.router.navigateByUrl('/free', {skipLocationChange: true}).then(()=>
    this.router.navigate(['']))
  }

  //search
  goToSearch(trip_name){
    this.router.navigateByUrl('/search', {skipLocationChange: true}).then(()=>
    this.router.navigate(['/search'], {queryParams:{keyword: trip_name, flag_search: 1}}));
   }
   
  searchTrip(_id) {
    this.router.navigateByUrl('/free', {skipLocationChange: true}).then(()=>
    this.router.navigate(['/search'], {queryParams :{keyword : _id, flag_search: 2}}))
  }


  goSearch(trip_name){
   this.goToSearch(trip_name) 
  }

  //tutup search

  initializeErrorMessage() {
    this.emailAlertMessage = "Email harus diisi";
    this.passwordAlertMessage = "Password harus diisi";
    this.emailAtAlertMessage = "Alamat email salah"
  }
    //login
   onSubmit() {
  
    this.appService.addUser(this.user).subscribe(user => {
      // console.log(user)
      if(user.status == 200){

        this.toastr.success('Login Berhasil')
        sessionStorage.setItem("token", user.token);
        sessionStorage.setItem("role", user.role);
        
        if (sessionStorage.role == 1 ) {
          this.userTravel = false;
          this.noUser = true;
          this.providerTravel = true;
          this.router.navigateByUrl('/free', {skipLocationChange: true}).then(()=>
          this.router.navigate(['']));
        }
        else if (sessionStorage.role == 2) {
          this.providerTravel = false;
          this.noUser = true;
          this.userTravel = true;
          this.router.navigateByUrl('/free', {skipLocationChange: true}).then(()=>
          this.router.navigate(['']))
        }
      }
      else if(user.status == 400) {
        this.toastr.error('Email atau Password salah')
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

  ngOnInit() {
    if (sessionStorage.role == 1 ) {
      this.noUser = true;
      this.userTravel = false;
      this.providerTravel = true;
    }
    else if (sessionStorage.role == 2) {
      this.noUser = true;
      this.userTravel = true;
      this.providerTravel = false;
    
    }
    this.dataSevie.currentMessage.subscribe(trip => this.trip = trip);
  }

  get isLogin(){
    if(this.appService.loggedIn()){
      return this.loginUser = true;
    }
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.authService.authState.subscribe((user) => {
      this.userSocial = user;
      // console.log(this.userSocial)
    });
    this.appService.loginGoogle(this.userSocial.authToken).subscribe(userGoogle => {
      // console.log(userGoogle)
      if(userGoogle.status == 200){
        this.data.name = userGoogle.name;
        this.data.photo = userGoogle.photo;
        this.data.email = userGoogle.email;
        this.data.telephone = userGoogle.telephone;
        sessionStorage.setItem("token", userGoogle.token);
        sessionStorage.setItem("branch_session", JSON.stringify(this.data));
        sessionStorage.setItem("role", userGoogle.role);
        this.router.navigateByUrl('/free', {skipLocationChange: true}).then(()=>
        this.router.navigate(['']))
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
      // console.log(user)
      if(user.status==200){
        this.data.name = user.name;
        this.data.photo = user.photo;
        this.data.email = user.email;
        this.data.telephone = user.telephone;
        sessionStorage.setItem("token", user.token);
        sessionStorage.setItem("branch_session", JSON.stringify(this.data));
        sessionStorage.setItem("role", user.role);
        this.router.navigateByUrl('/free', {skipLocationChange: true}).then(()=>
        this.router.navigate(['']))
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

  pengembangan(){
    this.toastr.warning('Fitur Dalam Tahap Pengembangan');
  }

  goEtalase() {
    this.router.navigate(['/EtalaseTravel/'+ this.id]);
  }
}
