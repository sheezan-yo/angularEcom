import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../services/product';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  imports: [FormsModule],
  templateUrl: './seller-update-product.html',
  styleUrl: './seller-update-product.css'
})
export class SellerUpdateProduct implements OnInit {
  productData: undefined | product;
  productMsg: undefined | string;
  constructor(private route: ActivatedRoute, private product: Product, private router: Router) { }
  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    console.warn(productId);
    productId && this.product.getProduct(productId).subscribe((data) => {
      console.warn(data);
      this.productData = data;
    });
  }

  submit(data: any): void {
    if (this.productData) {
      data.id = this.productData.id;
    }
    this.product.updateProduct(data).subscribe((result) => {
      if (result) {
        this.productMsg = "Product updated successfully, redirecting to Sellerhome...";
      }
    });
    setTimeout(() => {
      this.productMsg = undefined;
    }, 2000);
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
    setTimeout(() => {
      this.router.navigate(['seller-home']);
    }, 2000);
  }
}
