import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import { AppService } from '../app.service';

@Component({
  selector: 'app-trv-sidebar',
  templateUrl: './trv-sidebar.component.html',
  styleUrls: ['./trv-sidebar.component.css']
})
export class TrvSidebarComponent implements OnInit {

  order: string;

  show:boolean =false;
  dataUser;
  photo = '../assets/img/user.png'

  toggleCollapse() {
    this.show =!this.show;
  }

  constructor(private routeActive : ActivatedRoute, private appService: AppService) {
    this.appService.getUsers().subscribe(user =>{
      this.dataUser = user.data;
      this.photo = user.data.photo;
      // console.log(this.dataUser);
    })
   }

  ngOnInit() {
    this.routeActive.queryParams.filter(params => params.order).subscribe(params => {
      // console.log(params); {order: "popular"}

      this.order = params.order;
     // console.log(this.order);  popular
    });
  }

}
