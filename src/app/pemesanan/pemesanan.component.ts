import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-pemesanan',
  templateUrl: './pemesanan.component.html',
  styleUrls: ['./pemesanan.component.css']
})
export class PemesananComponent implements OnInit {
  public order: string;
  otherContent: boolean = false;

  constructor(private routeActive : ActivatedRoute) { 
  
  }

  ngOnInit() {
    this.routeActive.queryParams.filter(params => params.order).subscribe(params => {
      console.log(params); // {order: "popular"}

      this.order = params.order;
      console.log(this.order); // popular
    });
  }

  showContent(): void{
    this.otherContent = !this.otherContent;
  }

}
