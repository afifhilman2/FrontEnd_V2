import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Http, Headers, Response } from '@angular/http';
import { FormBuilder, FormControl, FormArray, Validator, Validators, FormGroup } from '@angular/forms';
import { PagerService } from '../_service/index';

@Component({
  selector: 'app-saldo',
  templateUrl: './saldo.component.html',
  styleUrls: ['./saldo.component.css']
})
export class SaldoComponent implements OnInit {

  withdrawForm = this.fb.group({
    password:'',
    bank_name:'',
    account_number:'',
    account_owner:'',
    withdraw_total:''
    
  })

  balance:any;
  balanceFlag:any;

   // array of all items to be paged
   private allItems: any[];

   // pager object
   pager: any = {};

   // paged items
   pagedItems: any[];

  constructor( public http:Http, public fb:FormBuilder, public appService:AppService, private pagerService:PagerService) { 

    this.appService.getBalanceProvider().subscribe( balance => {

      this.allItems = balance.balance;
      console.log(this.allItems)

      this.balance = balance;
      this.balanceFlag = balance.balance;
      this.setPage(1);
    })
  }

  onSubmitWithdraw() {
    this.appService.withdrawBalanceProvider(this.withdrawForm.value).subscribe( withdraw => {
        
    })
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  ngOnInit() {
  }

}
