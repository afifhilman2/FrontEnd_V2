import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-trv-search-navbar',
  templateUrl: './trv-search-navbar.component.html',
  styleUrls: ['./trv-search-navbar.component.css']
})
export class TrvSearchNavbarComponent implements OnInit {

  query:any;

  constructor(
    private route:ActivatedRoute,
    private router:Router
  ) {
    this.route.params.subscribe((params:Params) => {
      this.query = params.query;
    });
   }

  ngOnInit() {
  }

}
