import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private router: Router, private toastr:ToastrService) { }

  ngOnInit() {
  }

  goDiskon(){
    this.router.navigate(['/search'],{queryParams:{flag_search: 4}});
  }

  gototerm(){
    this.toastr.warning('Masih Dalam Pengembangan')
  }
}
