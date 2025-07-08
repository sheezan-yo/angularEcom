import { Component, OnInit } from '@angular/core';
import { cart, priceSummary } from '../data-type';
import { Product } from '../services/product';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  imports: [NgIf, NgFor, CommonModule, RouterLink],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.css'
})
export class CartPage implements OnInit {
  cartData: cart[] | undefined;
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }
  constructor(private product: Product, private router: Router) { }
  ngOnInit(): void {
    this.loadDetails();
  }

  loadDetails() {
    this.product.currentCart().subscribe((result) => {
      this.cartData = result;
      let price = 0;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.price * +item.quantity);
        } else {
          price = price + (+item.price);
        }
      });
      this.priceSummary.price = price;
      this.priceSummary.discount = price * 0.15;
      this.priceSummary.tax = price * 0.1;
      this.priceSummary.delivery = this.cartData.length ? 10 : 0;
      this.priceSummary.total = this.priceSummary.price + (this.priceSummary.tax) + this.priceSummary.delivery - (this.priceSummary.discount);
    });
  }

  checkout() {
    this.router.navigate(['/checkout']);
  }

  removeFromCart(cartId: string | undefined) {
    cartId && this.cartData && this.product.removeFromCart(cartId).subscribe((result) => {
      this.loadDetails();
    });
  }
}
