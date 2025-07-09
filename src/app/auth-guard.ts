import { CanActivateFn } from '@angular/router';
import { Seller } from './services/seller';
import { inject } from '@angular/core';
import {Router} from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const sellerService = inject(Seller);
  if (sellerService.isSellerLoggedIn) {
    return true;
  }
  const router = inject(Router);
  router.navigate(['/seller-login']);
  return false;
  // if (localStorage.getItem('seller')) {
  //   return true;
  // }
  // return sellerService.isSellerLoggedIn;
};
