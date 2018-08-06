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

import { Pipe, PipeTransform} from '@angular/core'
import { SearchFilterPipe } from './search-pipe'

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


  toggleLogin():void {
    this.showLogin = !this.showLogin;
  }

  toggleDropdown():void {
    this.showDropDown = !this.showDropDown;
  }

  
  // private results: Observable<SearchItem[]>;
  private searchField: FormControl;
  
  constructor( public data:DataService, private http:Http, private fb: FormBuilder, public appService: AppService, private authService:AuthService, private router:Router, myElement: ElementRef) {

    //get all category trip
    this.appService.getCategoryTrip().subscribe (categoryAllTrip =>  {
      this.categoryAllTrip = categoryAllTrip.data; 
    });
    

    this.appService.getDataTrip().subscribe(dataTrip => {
      this.filterTrip = dataTrip.data;
      this.name = dataTrip.data.trip_name;
      console.log(this.filterTrip);
    });

    //validation
    this.initializeErrorMessage();
    this.rForm = fb.group({
      'password':[null, Validators.required],
      'email':['', Validators.required],
    });


    this.initForm();
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
      if (localStorage.token == user.token) {
        // this.changeHead = !this.changeHead;
        // this.changeHeadUser = !this.changeHeadUser;
        this.router.navigate(['/traveler'])
        
      }
      else {
        this.router.navigate(['']);
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
       
      // this.filter();
      this.heroes = this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.appService.search(term)
        // or the observable of empty heroes if there was no search term
        : Observable.of<Product[]>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Product[]>([]);
      });
  }

  
    


  search(term: string): void {
    
    this.searchTerms.next(term);
  }

  // search = (text$: Observable<string>) =>
  //   text$.pipe(
  //     debounceTime(200),
  //     distinctUntilChanged(),
  //     map(term => term.length < 2 ? []
  //       : this.filterTrip.filter(v => v.toLowerCase().startsWith(term.toLocaleLowerCase())).splice(0, 10))
  //   );
  
  

  
  states = ['Alabama', 'Alaska',  'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District of Columbia', 'Florida'
  , 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky'
  , 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina',
  'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico',
  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia', 'Washington',
   'West Virginia', 'Wisconsin', 'Wyoming']; 
   
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
     return this.stateForm.value.search;
   }



  
}
