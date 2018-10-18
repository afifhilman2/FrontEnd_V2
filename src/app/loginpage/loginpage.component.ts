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

  constructor(private service: AppService, private router: Router, private fb:FormBuilder){
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
  
    this.service.addUser(this.formLogin.value).subscribe(loginUser => {
      localStorage.setItem("token", loginUser.token);
      if (localStorage.token == loginUser.token) {
        // this.changeHead = !this.changeHead;
        // this.changeHeadUser = !this.changeHeadUser;
        if(loginUser.status=200){
          this.router.navigate(['/'])
        }
      }
      else {
        this.validateAllFormFields(this.formLogin)
      }
    })
   }

}
