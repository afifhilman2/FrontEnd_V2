import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  dayNames=['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  public date= moment();
  public daysArr;

  constructor() { }

  ngOnInit() {
    this.daysArr= this.creatCalendar(this.date);
  }

  public creatCalendar(month){
    let firsDay = moment(month).startOf('M');
    let days = Array.apply(null, {length: month.daysInMonth()})
      .map(Number.call,Number)
      .map((n)=>{
        return moment(firsDay).add(n,'d'); 
      });
    for(let n=0; n<firsDay.weekday();n++){
      days.unshift(null);
    }
    return days;
  }

  public todayCheck(day){
    if(!day){
      return false;
    }
    return moment().format('L') === day.format('L');
  }

  public nextMonth(){
    this.date.add(1,'M');
    this.daysArr = this.creatCalendar(this.date);
  }

  public prevMonth(){
    this.date.subtract(1,'M');
    this.daysArr = this.creatCalendar(this.date);
  }
}
