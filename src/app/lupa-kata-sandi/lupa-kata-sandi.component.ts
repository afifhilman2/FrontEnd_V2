import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Http, Response } from '@angular/http';

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

  succes : boolean = false;
  isEdit:boolean = false;

  constructor(public appService: AppService, private http:Http) { 
    
  }

  onSubmitEmail(user){
    this.http.put('https://travinesia.com:1210/v1/user/forgot_password', this.user)
    .subscribe(
      (res: Response) =>{
        let users = res.json();
        console.log(users);
        if(users.status == 200){
          this.succes = !this.succes;
        }
      }
    )
  }

  onForgot(user) {
    this.isEdit = true;
    this.user = user;
  }


  ngOnInit() {
  }

}
