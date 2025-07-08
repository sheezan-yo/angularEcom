import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, product } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Product {
  private url = environment.url;
  cartData = new EventEmitter<product[] | []>();
  constructor(private http: HttpClient) { }

  addProduct(data: product) {
    return this.http.post(`${this.url}/products`, data);
  }

  productList() {
    return this.http.get<product[]>(`${this.url}/products`);
  }

  deletePdt(id: string) {
    return this.http.delete(`${this.url}/products/${id}`);
  }

  getProduct(id: string) {
    return this.http.get<product>(`${this.url}/products/${id}`);
  }

  updateProduct(product: product) {
    return this.http.put<product>(`${this.url}/products/${product.id}`, product);
  }

  popularProducts() {
    return this.http.get<product>(`${this.url}/products?_limit=3`);
  }

  trendyProducts() {
    return this.http.get<product>(`${this.url}/products?_limit=8`);
  }

  searchProducts(query: string) {
    return this.http.get<product>(`${this.url}/products?q=${query}`);
  }

  localAddToCart(data: product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
  }

  removeItemCart(productId: string) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: product[] = JSON.parse(cartData);
      items = items.filter((item: product) => productId !== item.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  addToCart(cartData: cart) {
    return this.http.post(`${this.url}/cart`, cartData);
  }

  getCartList(userId: number) {
    return this.http.get<product[]>(`${this.url}/cart?userId=` + userId, { observe: 'response' }).subscribe((result) => {
      if (result && result.body) {
        this.cartData.emit(result.body);
      }
    });
  }

  removeFromCart(cartId: string) {
    return this.http.delete(`${this.url}/cart/` + cartId);
  }

  currentCart() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<cart[]>(`${this.url}/cart?userId=` + userData.id);
  }

  orderNow(data: order) {
    return this.http.post(`${this.url}/orders`, data);
  }

  orderList() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<order[]>(`${this.url}/orders?userId=` + userData.id);
  }
  deleteCartItems(cartId: number) {
    return this.http.delete(`${this.url}/cart/` + cartId, { observe: 'response' }).subscribe((result) => {
      if (result) {
        this.cartData.emit([]);
      }
    })
  }
  cancelOrder(orderId: number) {
    return this.http.delete(`${this.url}/orders/` + orderId);
  }
} 