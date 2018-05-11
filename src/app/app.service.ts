import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { RequestOptions } from '@angular/http/src/base_request_options';
@Injectable ()

export class AppService {
    users:string[];
    headers
    url: string;
    idCategory:'';

    constructor (public http:Http) {
        this.url  = 'https://api.datamuse.com/words?ml='
    }

    //token localstorage
    createAuthorizationHeader (headers:Headers) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    }

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

    getDataTrip() {
        return this.http.get('http://travinesia.com:3000/get/trip/')
        .map(res => res.json());
    }

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


    //searchResult
    search_word(term){
        return this.http.get(this.url + term).map(res => {
            return res.json().map(item => {
                return item.word
            })
        })
    }


} 