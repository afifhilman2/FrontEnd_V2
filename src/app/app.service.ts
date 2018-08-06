import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { Product } from './product'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpHeaders } from '@angular/common/http';



import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';



@Injectable ()

export class AppService {
    users:string[];
    headers
    url: string;
    idCategory:'';

    private totalharga: BehaviorSubject<number> = new BehaviorSubject<number>(0)

    constructor (public http:Http, public http2: HttpClient) {
        this.url  = 'https://api.datamuse.com/words?ml='
    }

    //token localstorage
    createAuthorizationHeader (headers:Headers) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    }

    //httpClient Headers
    requestHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    //user
    getUsers() {
        let headers = new Headers();
        
        this.createAuthorizationHeader (headers);
        return this.http.get('http://travinesia.com:3000/v1/user/profile',
        {headers: headers})
        .map(res => res.json());
    }

    //provider
    getProvider() {
        let headers = new Headers();
        
        this.createAuthorizationHeader (headers);
        return this.http.get('http://travinesia.com:3000/v1/provider/profile',
        {headers: headers})
        .map(res => res.json());
    }

    getTripProvider() {
        let headers = new Headers();
        
        this.createAuthorizationHeader (headers);
        return this.http.get('http://travinesia.com:3000/v1/provider/all_trip',
        {headers: headers})
        .map(res => res.json());
    }

    getCategoryTrip() {
        return this.http.get('http://travinesia.com:3000/get/category')
        .map(res => res.json());
    }

    // getSearchTrip() {
    //     return this.http.get('http://travinesia.com:3000/get/category/:category')
    //     .map(res => res.json());
    // }

    getProvinceTrip() {
        return this.http.get('http://travinesia.com:3000/get/province')
        .map(res => res.json());
    }

    etTypeTrip() {
        return this.http.get('http://travinesia.com:3000/get/type')
        .map(res => res.json());
    }   

    getDataTrip() {
        return this.http.get('http://travinesia.com:3000/get/trip/')
        .map(res => res.json())
    }

    // getDatatripByid(product: Product){
    //     return this.http.get('http://travinesia.com:3000/get/detail_trip/'+ product._id)
    //     .map(res => res.json() as Product[]);
    // }
    

    //post
    //register
    registerUser(newUser) {
        return this.http.post('http://travinesia.com:3000/v1/user/users', newUser)
        .map(res => res.json());
    }

    //login
    addUser(user) {
        return this.http.post('http://travinesia.com:3000/v1/user/authenticate', user)
        .map(res => res.json());
    }

    //with token
    postBeTravel(travel) {
        
        let headers = new Headers();
        this.createAuthorizationHeader (headers);
        // console.log(headers)
        return this.http.post('http://travinesia.com:3000/v1/user/register_provider',travel,
        {headers: headers})
        .map(res => res.json());
    }

    addTripProvider(trip) {
        let headers = new Headers();
        this.createAuthorizationHeader (headers);

        return this.http.post('http://travinesia.com:3000/v1/provider/add_trip',trip,
        {headers: headers})
        .map(res => res.json());
    }

    editProfileProvider(provider) {
        let headers = new Headers();
        this.createAuthorizationHeader (headers);

        return this.http.put('http://travinesia.com:3000/v1/provider/profile',provider,
        {headers: headers})
        .map(res => res.json());
    }

    //searchResult
    search_word(term){
        return this.http.get(this.url + term).map(res => {
            return res.json().map(item => {
                return item.word
            })
        })
    }

    //booking
    private extractData(res: Response){
        let body = res.json();
            return body || {};
        }

    booking(book){
        let headers = new Headers();
        this.createAuthorizationHeader(headers);       

        return this.http.post('http://travinesia.com:3000/v1/user/addbooking', book, { headers: headers })
        .map(res => res.json())
        
        
    }

    getBooking(){
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.get('http://travinesia.com:3000/v1/user/bookinguser', {headers: headers})
        .map(res => res.json());
    }


    //akhir booking


    //edit user

    editUser(edit){
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.put('http://travinesia.com:3000/v1/user/profile', edit , {headers: headers})
        .map(res => res.json());
    }

    // getProfil(){
    //     let headers = new Headers();
    //     this.createAuthorizationHeader(headers);
    //     return this.http.put('http://travinesia.com:3000/v1/user/profile', {headers: headers})
    //     .map(res => res.json());
    // }

    // change password 
    changePwd(pwd){
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.post('http://travinesia.com:3000/v1/user/change_password', pwd, {headers: headers})
        .map(this.extractData);
    }

    search(term: string): Observable<Product[]> {
        return this.http
                   .get(`http://travinesia.com:3000/get/trip/?trip_name=${term}`)
                   .map(response => response.json().data as Product[]);
      }

     

    
    diskusi(){
        return this.http.get('http://travinesia.com:3000/get/trip/discussion/:id')
        .map(res => res.json());
    }

    getBookingId(){
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.get('http://travinesia.com:3000/v1/user/detailBooking/', {headers: headers})
        .map(this.extractData)
    }

    nextBooking(nbook){
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.put('http://travinesia.com:3000/v1/user/detailBooking', nbook, {headers: headers})
        .map(this.extractData);
    }
    

}