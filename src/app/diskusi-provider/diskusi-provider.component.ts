import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Http, Headers, Response } from '@angular/http';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PagerService } from '../_service/index';

@Component({
  selector: 'app-diskusi-provider',
  templateUrl: './diskusi-provider.component.html',
  styleUrls: ['./diskusi-provider.component.css']
})
export class DiskusiProviderComponent implements OnInit {

  discussion:any[];
  id;
  myForm = this.fb.group({
    comment:''
  })

  // array of all items to be paged
  private allItems: any[];

  // pager object
  pager: any = {};

    // paged items
  pagedItems: any[];

  allComments:boolean = false;
  discussionComment:boolean = true;

  constructor(public http:Http, public appService:AppService, private pagerService: PagerService, private fb: FormBuilder, private router: Router) {
    this.appService.getDiscussionProvider().subscribe( discussion => {

      this.discussion = discussion.data;
      // console.log(this.discussion)
      this.allItems =  discussion.data;

      this.setPage(1);
    })
   }

   setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);
  


    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    
  }

   clickId(e) {
     this.id = e.target.id;
    //  console.log(this.id);
   }

   comment() {
     this.allComments = true;
     this.discussionComment = false;
   }

   onSubmitComment(){
   
    this.myForm.value.comment = this.myForm.value.comment.replace(/\n/g, "<br>");
    // console.log(this.myForm.value)
    this.appService.addComment(this.id, this.myForm.value).subscribe(dataComment=>{
      if(dataComment.status == 200){
        this.router.navigateByUrl('/free', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/Provider/DiskusiProvider']));
      }
    });
  }

   counterStars(i: number){
    return Array(Math.round(i)).fill(4);
  }

  ngOnInit() {
    window.scrollTo(0, 0);

  }

}
