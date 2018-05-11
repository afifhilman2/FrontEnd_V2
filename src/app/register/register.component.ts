import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppService } from '../app.service';

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
  constructor( private fb: FormBuilder, private appService: AppService) { 
  }

  ngOnInit() {
  }
  
  onSubmit(){
    
      this.appService.registerUser(this.newUser).subscribe(newUser =>{
        console.log(newUser);
      })
  }
}  
