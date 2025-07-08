import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Seller } from '../services/seller';
import { Router } from '@angular/router';
import { signUp } from '../data-type';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-seller-auth',
  imports: [FormsModule, NgIf],
  templateUrl: './seller-auth.html',
  styleUrl: './seller-auth.css'
})
export class SellerAuth implements OnInit {
  showLogin = false;
  constructor(private seller: Seller, private router: Router) { }

  ngOnInit(): void {
    this.seller.reloadSeller();
  }
  signUp(data: signUp): void {
    console.warn(data);
    this.seller.userSignUp(data);
  }
  login(data: signUp): void {
    this.seller.userLogin(data);
  }
  openLogin() {
    this.showLogin = true;
  }
  openSignup() {
    this.showLogin = false;
  }
}
