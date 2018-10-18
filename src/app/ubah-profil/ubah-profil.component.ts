import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { DatePipe } from '@angular/common';




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

  // name:any;
  // email:any;
  // telephone:any;
  // gender:string = '';
  // identity_number:string = '';
  // day:string = '';
  // month:string = '';
  // year:string = '';
  // birthday:string = '';
  // photo:string = '';

  pwd = {
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

  constructor( private appServis: AppService, private datePipe: DatePipe) { 
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

      console.log(this.daraUser);
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
    console.log(this.edit.gender);
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

  onSubmit(edit){
    this.edit.birthday =  this.edit.month + '/' + this.edit.day + '/' + this.edit.year;
      
    this.appServis.editUser(this.edit).subscribe(edit => {
      console.log(edit);
    })
  }


  getFiles(event) {
    var files = event.target.files;
    var reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(files[0]);
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.filestring = btoa(binaryString); 
    this.filestring = "data:image/jpeg;base64,"+btoa(binaryString); // Converting binary string data.
    // console.log(this.filestring)
  }
  // onSelectPhoto(evt){
  //   let files = evt.target.files;
  //   let file = files[0];

  //   if(files && file) {
  //     let reader = new FileReader();
  //     reader.onload = this._handleReaderLoaded1.bind(this);
  //     reader.readAsBinaryString(file);
  //   }
  // }

  // _handleReaderLoaded1(readerEvt){
  //   let binaryString = readerEvt.target.reasult;
  //   this.poto = btoa(binaryString);
  //   this.poto = "data:image/jpg;base64,"+btoa(binaryString);
  //   console.log(this.poto);
  // }


  changePassword(pwd){
    if(this.pwd.new_password==this.pwd.repeatPassword && this.pwd.password!=this.pwd.new_password){
      // this.pwd.new_password;
      // this.pwd.password;
      // this.pwd.repeatPassword;
      this.appServis.changePwd(this.pwd).subscribe(pwd => {
        console.log(pwd);
      })
    }else{
      console.log("Password Baru harus sama dengan Ulangi Password Baru dan atau Password lama tidak boleh sama dengan password baru")
    }
    // this.appServis.changePassword(this.pwd).subscribe(pwd =>{
    //   console.log(pwd)
    // })
  }
}

