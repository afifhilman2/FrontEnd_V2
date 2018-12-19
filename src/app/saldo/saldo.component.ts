import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Http, Headers, Response } from '@angular/http';
import { FormBuilder, FormControl, FormArray, Validator, Validators, FormGroup } from '@angular/forms';
import { PagerService } from '../_service/index';
import { Router, CanActivate } from '@angular/router';

@Component({
  selector: 'app-saldo',
  templateUrl: './saldo.component.html',
  styleUrls: ['./saldo.component.css']
})
export class SaldoComponent implements OnInit {

  wrong:boolean = false;
  modalClose:boolean = false;
  confirmSuccess:boolean = true;
  pageOps:boolean = false;
  pageData:boolean = true;
  msg200 = true;
  msg404 = true;

  withdrawForm = this.fb.group({
    password:['', Validators.required],
    bank_name:['', Validators.required],
    account_number:['', Validators.required],
    account_owner:['', Validators.required],
    withdraw_total:['', Validators.required]
    
  })

  isFieldValid(field: string) {
    return !this.withdrawForm.get(field).valid && this.withdrawForm.get(field).touched;
  }
  
  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }
  
  // validate submit
    validateAllFormFields(formGroup: FormGroup) {         
      Object.keys(formGroup.controls).forEach(field => { 
        const control = formGroup.get(field);            
        
        if (control instanceof FormControl) {            
          control.markAsTouched({ onlySelf: true });
  
        } else if (control instanceof FormGroup) {        
          this.validateAllFormFields(control);            
        }
      });
    }

  balance:any;
  balanceFlag:any;

   // array of all items to be paged
   private allItems: any[];

   // pager object
   pager: any = {};

   // paged items
   pagedItems: any[];

  constructor( public http:Http, private router:Router, public fb:FormBuilder, public appService:AppService, private pagerService:PagerService) { 

    this.appService.getBalanceProvider().subscribe( balance => {

      if(balance.balance.length == 0) {
        this.pageOps = !this.pageOps;
        this.pageData = !this.pageData;
      }

      this.allItems = balance.balance;
      // console.log(balance)

      this.balance = balance;
      this.balanceFlag = balance.balance;
      this.setPageSaldo(1);
    })
  }

  onSubmitWithdraw() {

    if (this.withdrawForm.valid) {
      
      this.appService.withdrawBalanceProvider(this.withdrawForm.value).subscribe( withdraw => {
        // console.log(withdraw);

        if(withdraw.status == 200) 
        
        {

          this.modalClose = !this.modalClose;
          this.msg200 = false;
          this.msg404 = true; 
          this.confirmSuccess = false;
          this.wrong = false; 
        } 
        
        else if(withdraw.status == 404) 
        
        {
          this.modalClose = !this.modalClose;
          this.msg200 = true;
          this.msg404 = false; 
          this.confirmSuccess = false;
          this.wrong = false;
        }
        
        else if(withdraw.status == 400) 
        
        {
          this.wrong = true;
        }
          
      })
        
    } 
    
    else {
      this.validateAllFormFields(this.withdrawForm);
    }

    //  this.router.navigateByUrl('/free', {skipLocationChange: true}).then(()=>
    //       this.router.navigate(['/JualTrip/Saldo']));
  }

  close() {
    this.confirmSuccess= true;
  }

  open() {
    this.modalClose = false;
  }

  setPageSaldo(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPagerSaldo(this.allItems.length, page);

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  keyPress(event: any) {
    const pattern = /[0-9]/;
  
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

}
