import { Component, OnInit } from '@angular/core';
import { Product } from '../services/product';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { cart, order, priceSummary } from '../data-type';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-checkout',
  imports: [FormsModule, CommonModule, FontAwesomeModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout implements OnInit {
  faPlaced = faCircleCheck;
  cartData: cart[] | undefined;
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  };
  totalPrice: number | undefined;
  orderMsg: string | undefined;
  emptyCartMsg: string | undefined;
  constructor(private product: Product, private router: Router) { }
  ngOnInit(): void {
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
      this.totalPrice = this.priceSummary.total;
    });
  }

  orderNow(data: order) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (this.priceSummary.price <= 0) {

      this.emptyCartMsg = "Your cart is empty, please add something";
      setTimeout(() => {
        this.emptyCartMsg = undefined;
      }, 3000);
      return;
    }
    if (this.priceSummary) {
      let orderData: order = {
        ...data,
        totalPrice: this.priceSummary.total,
        userId,
        id: undefined
      }
      this.cartData?.forEach((item) => {
        setTimeout(() => {
          item.id && this.product.deleteCartItems(item.id);
        }, 600);
      })
      this.product.orderNow(orderData).subscribe((result) => {
        if (result) {
          this.orderMsg = "Your order has been placed";
          setTimeout(() => {
            this.router.navigate(['my-orders']);
            this.orderMsg = undefined;
          }, 3000);
        }
      })
    }
  }
}
