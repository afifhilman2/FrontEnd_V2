import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { AppService} from '../app.service';

@Component({
  selector: 'app-term-condition',
  templateUrl: './term-condition.component.html',
  styleUrls: ['./term-condition.component.css']
})
export class TermConditionComponent implements OnInit {


  termsAndConditions;

  constructor( public appService:AppService, public router:Router ) {
    
    this.appService.getTermsConditions().subscribe( term => {
      this.termsAndConditions = term.data
      // console.log(term);
     
    });
   }

  ngOnInit() {
  }

}
