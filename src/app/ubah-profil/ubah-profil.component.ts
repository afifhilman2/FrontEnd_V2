import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-ubah-profil',
  templateUrl: './ubah-profil.component.html',
  styleUrls: ['./ubah-profil.component.css']
})
export class UbahProfilComponent implements OnInit {

  pattern: string|RegExp;
  userProfile:any[];
  edit = {
    name :'', 
    birthday :'', 
    gender :'', 
    email :'', 
    telephone: '',
    identity_number : '',
    day:'',
    month:'',
    year:'',
    photo: '../assets/img/user.png'
  }


  typePassword = {
    password :'', 
    new_password:'',
    repeatPassword:''
  }

  new_password;
  repeadPassword;

  filestring: string = '../assets/img/user.png';
  poto: any;
  dataEdit: any[]; 
  editData: any[];
  date;
  daraUser;

  constructor(private toastr:ToastrService, private appServis: AppService, private datePipe: DatePipe, private router: Router) { 
    this.appServis.getUsers().subscribe(edit=>{
      this.edit.name = edit.data.name;
      this.edit.email = edit.data.email;
      this.edit.telephone = edit.data.telephone;
      // if(userProfile.data.gender==''){
      //   this.edit.gender = '';
      // }
      this.edit.identity_number = edit.data.identity_number;
      this.edit.birthday = edit.data.birthday;

      this.daraUser = edit.data;
      this.edit.day = this.datePipe.transform(edit.data.birthday, 'dd');
      this.edit.month = this.datePipe.transform(edit.data.birthday, 'MM');
      this.edit.year = this.datePipe.transform(edit.data.birthday, 'yyyy');
      this.edit.photo = edit.data.photo;
      this.edit.gender = edit.data.gender;

      // console.log(this.daraUser);
    });
  }

  show: boolean = false;
  pwdLama(){
    this.show = !this.show;
  }

  showBaru:boolean = false
  updatePwdBaru(){
    this.showBaru = !this.showBaru;
  }

  showUBaru:boolean = false
  pwdBaru(){
    this.showUBaru = !this.showUBaru;
  }  

  keyPress(event: any) {
    const pattern = /[0-9]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  ngOnInit() {
    
  }

  onRadioType(t){
    this.edit.gender = t.target.value;
    // console.log(this.edit.gender);
  }

  onSelectDate(t){
    this.edit.day = t.target.value;
    
  }

  onSelectMonth(t){
    this.edit.month = t.target.value;
    
  }

  onSelectYear(t){
    this.edit.year = t.target.value;
    
  }

  onSubmit(){
    this.edit.birthday =  this.edit.month + '/' + this.edit.day + '/' + this.edit.year;
      
    this.appServis.editUser(this.edit).subscribe(edit => {
      if(edit.status == 200){
        this.toastr.success('Profil Berhasil Disimpan')
        this.router.navigateByUrl('/free', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/Akun/Profile']));
      }
    })
  }


  getFiles(evt) {
    let files = evt.target.files;
    let image = files[0];
    //   let ext = files[0].name.match(/\.(.+)$/)[1];

  // if (files && image && (ext.toLowerCase()==='jpg' || ext.toLowerCase()==='png' || ext.toLowerCase()==='jpeg')) {
  //   // this.ng2ImgMax.compressImage(image, 0.250).subscribe(
  //   //   result => {
  //   //     this.uploadedImage = new File([result], result.name);
        let reader = new FileReader();
        reader.onload =this._handleReaderLoaded.bind(this);
        reader.readAsBinaryString(image);
    //   },
    //   error => {
    //     console.log('😢 Oh no!', error);
    //   }
    // );
  
    // }
  }

  _handleReaderLoaded(readerEvt) {
    let binaryString = readerEvt.target.result;
    this.edit.photo = btoa(binaryString);
    this.appServis.editProfilePictureUser(this.edit).subscribe(user => {
      // console.log(user)
      if(user.status == 200){
        this.router.navigateByUrl('/free', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/Akun/Profile']));
        this.toastr.success('Foto Berhasil Diubah')
      }
    })
    this.edit.photo = "data:image/jpeg;base64,"+ btoa(binaryString);
    
  }
  


  changePassword(){
    // console.log(this.typePassword)
    if(this.typePassword.new_password==this.typePassword.repeatPassword && this.typePassword.password!=this.typePassword.new_password){
      this.appServis.changePwd(this.typePassword).subscribe(pwd => {
        console.log(pwd);
        if(pwd.status == 200){
          this.toastr.success('Password Berhasil Diubah')
        }else if(pwd.status == 400){
          this.toastr.error('Masukkan Password Baru')
        }
        
      })
    }else{
      this.toastr.error('Ulangi password tidak sama denga Pasword Baru', 'Password Lama Tidak Boleh sama dengan Password Baru')
      // console.log("Password Baru harus sama dengan Ulangi Password Baru dan atau Password lama tidak boleh sama dengan password baru")
    }
    // this.appServis.changePassword(this.pwd).subscribe(pwd =>{
    //   console.log(pwd)
    // })
  }

}

