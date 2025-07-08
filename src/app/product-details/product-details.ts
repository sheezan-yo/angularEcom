import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../services/product';
import { cart, product } from '../data-type';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [NgIf, CommonModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetails implements OnInit {
  productDet: undefined | product;
  pdtQuantity: number = 1;
  removeCart: boolean = false;
  cartData: product | undefined;
  constructor(private route: ActivatedRoute, private product: Product) { }
  ngOnInit(): void {
    let pdId = this.route.snapshot.paramMap.get('productId') ?? '';
    pdId && this.product.getProduct(pdId).subscribe((result: product) => {
      this.productDet = result;

      let cartData = localStorage.getItem('localCart');
      if (cartData && pdId) {
        let items = JSON.parse(cartData);
        items = items.filter((item: product) => pdId == item.id.toString());
        if (items.length) {
          this.removeCart = true;
        } else {
          this.removeCart = false;
        }
      }

      let user = localStorage.getItem('user');
      if (user) {
        let userId = user && JSON.parse(user).id;
        this.product.getCartList(userId);
        this.product.cartData.subscribe((result) => {
          let item = result.filter((item: product) => pdId?.toString() === item.productId?.toString());
          if (item.length) {
            this.cartData = item[0];
            this.removeCart = true;
          }
        });
      }
    });

  }
  quantity(val: string) {
    if (val && val == 'subt') {
      if (this.pdtQuantity <= 1) {
        console.warn("quantity can't be less than 1");
        return;
      }
      this.pdtQuantity--;
    } else if (val && val == 'plus') {
      if (this.pdtQuantity >= 20) {
        console.warn("quantity can't be more than 20");
        return;
      }
      this.pdtQuantity++;
    }
  }

  addToCart() {
    if (this.productDet) {
      this.productDet.quantity = this.pdtQuantity;
      if (!localStorage.getItem('user')) {
        this.product.localAddToCart(this.productDet);
        this.removeCart = true;
      } else {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        let cartData: cart = { ...this.productDet, userId, productId: this.productDet.id, id: undefined };
        delete cartData.id;
        this.product.addToCart(cartData).subscribe((result) => {
          if (result) {
            this.product.getCartList(userId);
            this.removeCart = true;
          }
        })
      }
    }
  }

  removeFromCart(productId: string) {
    if (!localStorage.getItem('user')) {
      this.product.removeItemCart(productId);
    } else {
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
      this.cartData && this.product.removeFromCart(this.cartData.id).subscribe((result) => {
        if (result) {
          this.product.getCartList(userId);
        }
      });
      this.removeCart = false;
    }
  }
}
