import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import { AppService } from '../app.service';
import { Http } from '@angular/http';


@Component({
  selector: 'app-jual-trip',
  templateUrl: './jual-trip.component.html',
  styleUrls: ['./jual-trip.component.css']
})
export class JualTripComponent implements OnInit {

  order: string;
  order2: string;
  loaded:boolean = true;

  id;
  profileProvider;

  constructor(private routeActive : ActivatedRoute, public appService:AppService, private http:Http, private route:Router) { 
    this.appService.getProvider().subscribe(profile => {

      this.id = profile.provider._id

      if(profile.success == false) {

        alert('Belum Login ');
      }

      this.profileProvider = profile.provider;
    })

  }

  goEtalase() {
    this.route.navigate(['/EtalaseTravel/'+ this.id]);
  }

  ngOnInit() {
    this.routeActive.queryParams.filter(params => params.order).subscribe(params => {
      // console.log(params); {order: "popular"}

      this.order = params.order;
     // console.log(this.order);  popular
    });
  }

}
