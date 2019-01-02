import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Http, Response } from '@angular/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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

  content1 : boolean = true;
  content2 : boolean = false;
  isEdit:boolean = false;

  constructor(public appService: AppService, private http:Http, private toastr: ToastrService, private router:Router) { 
    
  }

  onSubmitEmail(){
    this.appService.forgetPassword(this.user).subscribe(users =>{
      // console.log(users);
      if(users.status == 200){
        this.toastr.success('berisi tautan untuk tahap berikutnya','Silahkan cek Email Anda');
        // this.router.navigate([])
        this.content1 = false;
        this.content2 = true;
      } else if(users.status == 404){
        this.toastr.error('Email Belum Terdaftar') 
      } 
    })
        
  }

  onForgot(user) {
    this.isEdit = true;
    this.user = user;
  }


  ngOnInit() {
  }

}
