import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import { AppService } from '../app.service';

@Component({
  selector: 'app-sidebar-akun-profil',
  templateUrl: './sidebar-akun-profil.component.html',
  styleUrls: ['./sidebar-akun-profil.component.css']
})
export class SidebarAkunProfilComponent implements OnInit {
  order: string;

  show:boolean =false;

  toggleCollapse() {
    this.show =!this.show;
  }

  constructor(private routeActive : ActivatedRoute, private appService : AppService) { }

  ngOnInit() {
    this.routeActive.queryParams.filter(params => params.order).subscribe(params => {
      // console.log(params); // {order: "popular"}

      this.order = params.order;
      // console.log(this.order); // popular
    });

    this.getDiskon()
  }

  diskon;
  getDiskon(){
    this.appService.getDiscountTrip().subscribe(diskon =>{
      this.diskon = diskon.data;
      
      // console.log(diskon)
    })
  }
}
