import { Component, OnInit } from '@angular/core';
import { Product } from '../services/product';
import { order } from '../data-type';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-my-orders',
  imports: [NgFor, CommonModule],
  templateUrl: './my-orders.html',
  styleUrl: './my-orders.css'
})
export class MyOrders implements OnInit {
  orderData: order[] | undefined;
  constructor(private product: Product) { }
  ngOnInit(): void {
    this.getOrderList();
  }
  cancelOrder(orderId: number | undefined) {
    orderId && this.product.cancelOrder(orderId).subscribe((result) => {
      this.getOrderList();
    })
  }
  getOrderList() {
    this.product.orderList().subscribe((result) => {
      if (result) this.orderData = result;
    })
  }
}
