import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AppService } from '../app.service';

import { Router, CanActivate } from '@angular/router';
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

  loginUser = {
    email:'',
    password: ''
  }

  constructor(private service: AppService, private router: Router){
    // this.searchTerm.valueChanges
    //     .debounceTime(400) 
    //     .subscribe(data => {
    //         this.service.search_word(data).subscribe(response =>{
    //             this.searchResult = response
    //         })
    //     })

    //     this.searchTerm.valueChanges
    //     .subscribe(data => {
    //         this.service.search_word(data).subscribe(response =>{
    //             this.searchResult = response
    //         })
    //     })
  }

  
  ngOnInit() {
  }

  onSubmit() {
  
    this.service.addUser(this.loginUser).subscribe(loginUser => {
      localStorage.setItem("token", loginUser.token);
      if (localStorage.token == loginUser.token) {
        // this.changeHead = !this.changeHead;
        // this.changeHeadUser = !this.changeHeadUser;
        this.router.navigate(['/traveler'])
        
      }
      else {
        this.router.navigate(['']);
      }
    })
   }

}
