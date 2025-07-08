import { Component, OnInit } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../services/product';
import { product } from '../data-type';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartShopping, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [NgbCarouselModule, NgIf, NgFor, FontAwesomeModule, CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  faCart = faCartShopping;
  faInfo = faInfoCircle;
  popularProd: undefined | product[];
  trendyProd: undefined | product[];
  constructor(private product: Product) { };

  ngOnInit(): void {
    this.product.popularProducts().subscribe((data) => {
      this.popularProd = Array.isArray(data) ? data : [data];
    });
    this.product.trendyProducts().subscribe((data) => {
      this.trendyProd = Array.isArray(data) ? data : [data];
    });
  }
}

