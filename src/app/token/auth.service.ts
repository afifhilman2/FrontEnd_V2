import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Headers, Http, HttpModule } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { TokenParams } from '../token/token-params.component';
import { Product } from '../token/product.component';

@Injectable ()
export class AuthService {

    AccessToken:string ="";
    constructor(private http:Http) {

    }

    private TokenAPI = 'http://travinesia.com:3000/v1/user/authenticate';
    private AuthAPI = 'http://travinesia.com:3000/v1/user/profile';

    login(email:string, password:string): Observable<TokenParams> {
        var headerForTokenAPI = new Headers({'Content-type': 'application/x-www-form-urlencoded'});
        var data = "grant_type=password&email=" + email + "&password=" + password;

        return this.http.post(this.TokenAPI, data, { headers: headerForTokenAPI })
        .map(res => res.json());
    }

    auth(): Observable<Product[]> {
        var HeadersForAuthAPI = new Headers();
        if (this.AccessToken) {
            HeadersForAuthAPI.append('Authorization', 'Bearer' + this.AccessToken);
        }

        return this.http.get(this.AuthAPI, {
            headers: HeadersForAuthAPI
        })
        .map(res => res.json());
    }

    //guard route service

    // public isAuthenticated() { 
    //     const token = localStorage.getItem('token');
    //     return !this.jwtHelper.isTokenExpired(token);
    // }
}

