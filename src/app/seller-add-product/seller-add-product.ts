import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../services/product';
import { product } from '../data-type';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-seller-add-product',
  imports: [FormsModule, NgIf],
  templateUrl: './seller-add-product.html',
  styleUrl: './seller-add-product.css'
})
export class SellerAddProduct implements OnInit {
  addProductMsg: string | undefined;
  isProdAdd: boolean = false;
  constructor(private product: Product) { }

  ngOnInit(): void {

  }

  submit(data: product) {
    this.product.addProduct(data).subscribe((result) => {
      console.warn(result);
      if (result) {
        this.addProductMsg = "Product added successfully";
        this.isProdAdd = true;
      } else {
        this.addProductMsg = "Product can't be added";
        this.isProdAdd = false;
      }
    });
  } 

  clearFields() {
    const inputs = document.getElementsByTagName('input');
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = '';
    }
    const descInput = document.getElementById('descriptionInput') as HTMLInputElement | null;
    if (descInput) {
      descInput.value = '';
    }
    const categInput = document.getElementById('categoryInput') as HTMLInputElement | null;
    if (categInput) {
      categInput.value = 'null';
    }
  }
}
