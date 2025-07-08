import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { login, signUp } from '../data-type';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Seller {
  private url = environment.url;
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private router: Router) { }

  userSignUp(data: signUp) {
    this.http.post(`${this.url}/seller`, data, { observe: 'response' }).subscribe((result) => {
      console.warn(result);
      if (result) {
        localStorage.setItem('seller', JSON.stringify(result.body));
        this.router.navigate(['seller-home']);
      }
    });
  }
  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }
  userLogin(data: login) {
    this.http.get(`${this.url}/seller?email=${data.email}&password=${data.password}`, { observe: 'response' }).subscribe(() => {
    })
  }
}
