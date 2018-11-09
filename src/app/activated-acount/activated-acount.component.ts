import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-activated-acount',
  templateUrl: './activated-acount.component.html',
  styleUrls: ['./activated-acount.component.css']
})
export class ActivatedAcountComponent implements OnInit {

  
  constructor(private appService: AppService, private routeActive: ActivatedRoute, private router:Router) { }

  temporary_token;
  ngOnInit() {
    this.routeActive.paramMap.subscribe(params => {
      this.temporary_token = params.get('id');
      // this.temporary_token = this.temporary_token.substring(0, this.temporary_token.length - 1);
      this.appService.activationAccount(this.temporary_token).subscribe(account => {
        if(account.status==200){
          this.router.navigate(['/LoginPage']);
        }
      })
    })
  }

}
