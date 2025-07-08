import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../services/product';
import { product } from '../data-type';

@Component({
  selector: 'app-search',
  imports: [NgFor, CommonModule],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search implements OnInit {
  searchResult: undefined | product[];
  constructor(private route: ActivatedRoute, private product: Product, private router: Router) { }
  ngOnInit(): void {
    let query = this.route.snapshot.paramMap.get('query');
    query && this.product.searchProducts(query).subscribe((result) => {
      this.searchResult = Array.isArray(result) ? result : [result];
    })
  }

  productDetail(id: string) {
    this.router.navigate([`/details/${id}`]);
  }
}
