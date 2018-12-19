import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AppService } from '../app.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  user = this.fb.group({
    email:['',Validators.required],
    token:['',Validators.required],
    password:['', [Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),Validators.minLength(8)]],
    repeatPassword:['', [Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),Validators.minLength(8)]]
  })

  flag_match : boolean = false;
  temporary_token;

  show: boolean = false;
  pwdLama(){
    this.show = !this.show;
  }

  showBaru: boolean = false;
  pwdBaru(){
    this.showBaru = !this.showBaru;
  }

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
  constructor(private toastr: ToastrService,private fb : FormBuilder, private appService: AppService, private routeActive: ActivatedRoute) {

    this.routeActive.paramMap.subscribe(params => {
      this.temporary_token = params.get('id');
      this.appService.getForgotPassword(this.temporary_token).subscribe(user => {
        if(user.status == 200){
          this.toastr.success('Password Berhasil Disimpan')
          this.user.patchValue({
            email: user.message,
            token: user.token
          })
        }
        else if (user.status==400){
          this.toastr.warning('Password Baru Tidak Dapat Disimpan')
        }
      })
    })
   }

  ngOnInit() {
  }

  onSubmit(){
    
    
    if(this.user.valid && this.user.value.password == this.user.value.repeatPassword){
      this.appService.saveNewPassword(this.user.value).subscribe(user => {
        console.log(user)
      })
    }
    else if (this.user.value.password != this.user.value.repeatPassword){
      this.flag_match = true;
      this.validateAllFormFields(this.user);
    }
  }

}
