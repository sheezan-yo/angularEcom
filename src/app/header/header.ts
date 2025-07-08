import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Seller } from '../services/seller';
import { CommonModule, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { Product } from '../services/product';
import { product } from '../data-type';
import { FormsModule } from '@angular/forms';
import { User } from '../services/user';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgIf, NgSwitch, NgSwitchCase, CommonModule, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {
  isLoggedin = inject(Seller).isSellerLoggedIn;
  isUserLoggedIn = inject(User).isUserLoggedIn;
  loggedOut: boolean = false;
  userLoggedout: boolean = false;
  sellerName: string = "";
  userName: string = "";
  searchResult: product[] | undefined;
  searchFill: string = '';
  cartItems = 0;
  constructor(private router: Router, private product: Product, private user: User) { }

  menuType: string = 'default';
  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.startsWith('/seller')) {
          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore);
          this.sellerName = sellerData.name || '';
          this.menuType = 'seller';
        } else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name || '';
          this.menuType = 'user';
          this.product.getCartList(userData.id);
        }
        else {
          this.menuType = 'default';
        }
      }
    });

    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      this.cartItems = JSON.parse(cartData).length;
    }

    this.product.cartData.subscribe((items) => {
      this.cartItems = items.length;
    })
  }

  logout() {
    if (this.isLoggedin) {
      localStorage.removeItem('seller');
      this.router.navigate(['/']);
      this.loggedOut = true;
    } else {
      this.loggedOut = false;
    }
  }

  logoutUser() {
    if (this.isUserLoggedIn) {
      localStorage.removeItem('user');
      this.router.navigate(['/user-auth']);
      this.product.cartData.emit([]);
      this.userLoggedout = true;
    } else {
      this.userLoggedout = false;
    }
  }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.product.searchProducts(element.value).subscribe((result) => {
        if (element.value == '') {
          this.hideSearch();
        } else {
          this.searchResult = Array.isArray(result) ? result.slice(0, 5) : [result];
        }
      });
    }
  }

  hideSearch() {
    this.searchResult = undefined;
  }

  submitSearch(val: string) {
    this.router.navigate(['/search', val]);
  }

  productDetail(id: string) {
    this.router.navigate(['/details', id]);
  }
}
