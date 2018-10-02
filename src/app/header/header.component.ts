import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { AppService } from '../app.service';
import { TokenParams } from '../token/token-params.component';
import { AuthService } from '../token/auth.service';
import { Router, CanActivate } from '@angular/router';
import { Http, Response } from '@angular/http';
import { TrvSearchResultComponent } from '../trv-search-result/trv-search-result.component';
import { DataService} from '../data.service';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

import { Subject }           from 'rxjs/Subject';
import { Product } from '../product';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  // pipes : [SearchFilterPipe],
  
})
export class HeaderComponent implements OnInit {

  
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
  // heroes: Observable<Product[]>;
  // private searchTerms = new Subject<{}>();
  

  showDropDown: boolean = false;

  stateForm: FormGroup;

  heroes: Observable<Product[]>;
  private searchTerms = new Subject<string>();
  name;
  loginUser: boolean = false;

  

  profile:any =[];
  provider:any=[];
  query:any;

  dropLogout: boolean = false;

  // changeHead:boolean = true;
  // changeHeadUser:boolean = false;

  // categoryAllTrip;
  dataUser;
  photo;
  photos = ("../assets/img/user.png");

  querySearch(e) {
    this.query= e.target.value;
    console.log(this.query);
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

  
  // private results: Observable<SearchItem[]>;
  private searchField: FormControl;
  
  results: Object;
  searchTerm$ = new Subject<string>();

  constructor( public data:DataService, private http:Http, private fb: FormBuilder, public appService: AppService, private authService:AuthService, private router:Router, myElement: ElementRef) {

    // get all category trip
    this.appService.getCategoryTrip().subscribe (categoryAllTrip =>  {
      this.categoryAllTrip = categoryAllTrip.data; 
      console.log(this.categoryAllTrip)
    });
    

    this.appService.search(this.searchTerm$).subscribe(results => {
        this.results = results.data;
        // console.log(this.results);
    });

    //validation
    this.initializeErrorMessage();
    this.rForm = fb.group({
      'password':[null, Validators.required],
      'email':['', Validators.required],
    });

    this.initForm();

  }

  
  goToSearch(trip_name){
    this.appService.searchName(trip_name).subscribe(trip_name =>{
      // console.log(trip_name)
      if(trip_name.status == 200){
        this.router.navigateByUrl('/free', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/searchNavbar'], {queryParams: {data : JSON.stringify(trip_name.data)}}));
      }
    })
   }
   
   searchCategory;
   searchTrip(_id) {
    // this.idCategory = e.target.id;
    
    
    this.appService.searchCategory(_id).subscribe(searchCategory =>{
      this.searchCategory = searchCategory.data;
      console.log(this.searchCategory)
      // console.log(this.categoryAllTrip);
      if(searchCategory.status = 200){
        this.router.navigateByUrl('/free', {skipLocationChange: true}).then(()=>
        this.router.navigate(['traveler/search'], {queryParams :{data : JSON.stringify(this.searchCategory)}}))
      }
    })
    // this.router.navigateByUrl('/free', {skipLocationChange: true}).then(()=>
    // this.router.navigate(['traveler/search', this.idCategory]))
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
      if (user.success== true) {
        // this.login = user.token;
        
        // this.changeHead = !this.changeHead;
        // this.changeHeadUser = !this.changeHeadUser;
        this.router.navigateByUrl('/free', {skipLocationChange: true}).then(()=>
        this.router.navigate([''])
      )
        
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
    this.myToken = this.authService.AccessToken;

    this.data.currentMessage.subscribe(trip => this.trip = trip);
    
     
  }

  search(term: string): void {
    
    this.searchTerms.next(term);
  }

 
   initForm(): FormGroup {
    return this.stateForm = this.fb.group({
      search: [null]
    })
  }

  selectValue(value) {
    
    this.stateForm.patchValue({"search": value});
    
    this.showDropDown = false;
  }
   closeDropDown() {
     this.showDropDown = !this.showDropDown;
   }
 
   openDropDown() {
     this.showDropDown = !this.showDropDown;
   }
 
   getSearchValue() {
     return this.stateForm.value.search.debounceTime(300).distinctUntilChanged();
   }

  get isLogin(){
    if(!(localStorage.token == null)){
      // this.loginUser = !this.loginUser;
      return this.loginUser = true;
    }
     
   }
}
