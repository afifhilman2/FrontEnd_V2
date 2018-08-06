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

  newUser = {
    name:'',
    telephone:'',
    email:'',
    password:''
  }
  constructor( private fb: FormBuilder, private appService: AppService, private router:Router) { 
  }

  ngOnInit() {
  }
  
  onSubmit(){
    
      this.appService.registerUser(this.newUser).subscribe(newUser =>{
        if(newUser.succes=true){
          this.router.navigate(['/LoginPage']); 
        }
      })
  }
}  
