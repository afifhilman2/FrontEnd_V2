import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-lupa-kata-sandi',
  templateUrl: './lupa-kata-sandi.component.html',
  styleUrls: ['./lupa-kata-sandi.component.css']
})
export class LupaKataSandiComponent implements OnInit {

  user = {
    email:'',
    password:''
  }

  isEdit:boolean = false;

  constructor(public appService: AppService) { 
    
  }

  onSubmitEmail(isEdit){
    
  }

  onForgot(user) {
    this.isEdit = true;
    this.user = user;
  }


  ngOnInit() {
  }

}
