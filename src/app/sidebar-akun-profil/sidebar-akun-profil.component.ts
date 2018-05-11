import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';

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

  constructor(private routeActive : ActivatedRoute) { }

  ngOnInit() {
    this.routeActive.queryParams.filter(params => params.order).subscribe(params => {
      console.log(params); // {order: "popular"}

      this.order = params.order;
      console.log(this.order); // popular
    });
}
  }
