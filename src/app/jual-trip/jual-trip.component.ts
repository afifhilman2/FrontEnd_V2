import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';


@Component({
  selector: 'app-jual-trip',
  templateUrl: './jual-trip.component.html',
  styleUrls: ['./jual-trip.component.css']
})
export class JualTripComponent implements OnInit {

  order: string;
  order2: string;

  constructor(private routeActive : ActivatedRoute) { }

  ngOnInit() {
    this.routeActive.queryParams.filter(params => params.order).subscribe(params => {
      // console.log(params); {order: "popular"}

      this.order = params.order;
     // console.log(this.order);  popular
    });
  }

}
