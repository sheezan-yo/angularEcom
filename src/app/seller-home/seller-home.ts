import { Component, OnInit } from '@angular/core';
import { Product } from '../services/product';
import { product } from '../data-type';
import { NgFor, NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faPenToSquare, faSquarePen } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-seller-home',
  imports: [NgIf, NgFor, CommonModule, FontAwesomeModule, RouterLink],
  templateUrl: './seller-home.html',
  styleUrl: './seller-home.css'
})
export class SellerHome implements OnInit {
  productList: undefined | product[];
  productMsg: undefined | string;
  isDeleted: boolean = false;
  icon = faTrash;
  pentosquare = faPenToSquare;
  squarepen = faSquarePen;
  constructor(private product: Product) { }

  ngOnInit(): void {
    this.list();
  }

  deleteProduct(id: string) {
    this.product.deletePdt(id).subscribe((result) => {
      if (result) {
        this.productMsg = "Product deleted successfully";
        this.isDeleted = true;
        this.list();
      } else {
        this.productMsg = "Error deleting product";
        this.isDeleted = false;
      }
    });
    setTimeout(() => {
      this.productMsg = undefined;
    }, 3000);
  }

  list() {
    this.product.productList().subscribe((result) => {
      console.warn(result);
      if (result) {
        this.productList = result;
      }
    });
  }
}
