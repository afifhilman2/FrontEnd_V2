import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AppService } from '../app.service';
import { TokenParams } from '../token/token-params.component';
import { AuthService } from '../token/auth.service';
import { Router, CanActivate } from '@angular/router';
import { Http, Response } from '@angular/http';
import { TrvSearchResultComponent } from '../trv-search-result/trv-search-result.component';
import { DataService} from '../data.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

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

  getTripSearch:any[];
  trip:any[];
  


  toggleLogin():void {
    this.showLogin = !this.showLogin;
  }
  
  constructor( public data:DataService, private http:Http, private fb: FormBuilder, public appService: AppService, private authService:AuthService, private router:Router) {

    //get all category trip
    this.appService.getCategoryTrip().subscribe (categoryAllTrip =>  {
      this.categoryAllTrip = categoryAllTrip.data; 
    });

    //validation
    this.initializeErrorMessage();
    this.rForm = fb.group({
      'password':[null, Validators.required],
      'email':['', Validators.required],
    });

  }

   //searchById
   
   searchTrip(e) {
   this.idCategory = e.target.name
    this.http.get('http://travinesia.com:3000/get/category/'+this.idCategory)
    .subscribe(
      (res:Response)=> {
        let tripSearch = res.json();
        this.getTripSearch = tripSearch.data;
        console.log(this.getTripSearch);
      }
    )
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

  ngOnInit() {
    this.myToken = this.authService.AccessToken;

    this.data.currentMessage.subscribe(trip => this.trip = trip)

  }
}
