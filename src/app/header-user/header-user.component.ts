import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.css']
})
export class HeaderUserComponent implements OnInit {


  profile:any =[];
  provider:any=[];
  query:any;

  dropLogout: boolean = false;

  changeHead:boolean = true;
  changeHeadUser:boolean = false;

  categoryAllTrip;
  dataUser;
  photo;
  photos = ("../assets/img/user.png");
  
  querySearch(e) {
    this.query= e.target.value;
    // console.log(this.query);
  }
  



  constructor(public appService: AppService, private router: Router) {
    // this.photos = ;
    this.appService.getUsers().subscribe(profile => {
      this.dataUser = profile.data;
      this.photos = profile.data.photo;
      // console.log(profile);
    });

    // this.appService.getProvider().subscribe(provider => {
    //   console.log(provider);
    // });

    // this.appService.getCategoryTrip().subscribe (categoryAllTrip =>  {
    //   this.categoryAllTrip = categoryAllTrip.data; 
    // });

   }

   logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']); 
  }

  openLogout(): void{
    this.dropLogout = !this.dropLogout;
  }


  ngOnInit() {


    

  }

}
