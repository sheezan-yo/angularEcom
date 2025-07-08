import { EventEmitter, Injectable } from '@angular/core';
import { login, signUp } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class User {
  private url = environment.url;
  isUserLoggedIn = new BehaviorSubject<boolean>(false);
  invalidUserAuth = new EventEmitter<boolean>(false);
  constructor(private http: HttpClient, private router: Router) { }
  userSignup(user: signUp) {
    return this.http.post(`${this.url}/users`, user, { observe: 'response' })
      .subscribe((result) => {
        console.warn(result);
        if (result) {
          localStorage.setItem('user', JSON.stringify(result.body));
          this.router.navigate(['/']);
        }
      });
  }
  userLogin(data: login) {
    return this.http.get<signUp[]>(`${this.url}/users?email=${data.email}&password=${data.password}`, { observe: 'response' }).subscribe((result) => {
      if (result && result.body?.length) {
        this.invalidUserAuth.emit(false);
        localStorage.setItem('user', JSON.stringify(result.body[0]));
        this.router.navigate(['/']);
      } else {
        this.invalidUserAuth.emit(true);
      }
    });
  }
  reloadUser() {
    if (localStorage.getItem('user')) {
      this.isUserLoggedIn.next(true);
      this.router.navigate(['/']);
    }
  }
}
