import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { cart, login, product, signUp } from '../data-type';
import { User } from '../services/user';
import { Product } from '../services/product';

@Component({
  selector: 'app-user-auth',
  imports: [FormsModule, NgIf, ReactiveFormsModule],
  templateUrl: './user-auth.html',
  styleUrl: './user-auth.css'
})
export class UserAuth implements OnInit {
  showLogin: boolean = false;
  authError: string = "";
  // userForm!: FormGroup;
  constructor(private user: User, private fb: FormBuilder, private product: Product) {
    // this.userForm = this.fb.group({
    //   password: ['', Validators.required, Validators.minLength(3)],
    //   email: ['', Validators.required, Validators.email],
    // })
  }
  ngOnInit(): void {
    this.user.reloadUser();
  }
  opensignup() {
    this.showLogin = false;
  }
  openLogin() {
    this.showLogin = true;
  }
  signup(data: signUp) {
    this.user.userSignup(data);
  }
  login(data: login) {
    this.user.userLogin(data);
    this.user.invalidUserAuth.subscribe((result) => {
      if (result) {
        this.authError = "Please enter valid email or password";
      }
      this.localCartToCart();

    })
  }
  localCartToCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (data) {
      let cartDataList: product[] = JSON.parse(data);
      cartDataList.forEach((product: product, index) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId,
          id: undefined
        };

        delete cartData.id;
        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((result) => {
            if (result) {
              console.warn('item stored in DB');
            }
          })
          if (cartDataList.length === index) {
            localStorage.removeItem('localCart');
          }
        }, 500);
      });
    }

    setTimeout(() => {
      this.product.getCartList(userId);
    }, 2000);
  }
}
