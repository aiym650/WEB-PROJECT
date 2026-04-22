import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../core/cart.service';
import { Manga } from '../manga/models/manga.models';
import { ToastService } from '../core/toast.service';

interface CartGroupedItem {
  manga: Manga;
  quantity: number;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  items: Manga[] = [];

  constructor(
    private cartService: CartService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.loadCart();
  }

  loadCart() {
    this.items = this.cartService.getItems();
  }

  get groupedItems(): CartGroupedItem[] {
    const map = new Map<number, CartGroupedItem>();

    for (const item of this.items) {
      if (map.has(item.id)) {
        map.get(item.id)!.quantity += 1;
      } else {
        map.set(item.id, {
          manga: item,
          quantity: 1
        });
      }
    }

    return Array.from(map.values());
  }

  addOne(manga: Manga) {
    this.cartService.addToCart(manga);
    this.loadCart();
  }

  removeOne(manga: Manga) {
    const index = this.items.findIndex(item => item.id === manga.id);

    if (index !== -1) {
      this.items.splice(index, 1);
      localStorage.setItem('cartItems', JSON.stringify(this.items));
      this.loadCart();
    }
  }

  clearCart() {
    this.cartService.clearCart();
    this.items = [];
  }

  get total(): number {
    return this.items.reduce((sum, item) => sum + Number(item.price), 0);
  }

  goToCheckout() {
    if (this.items.length === 0) {
      this.toastService.show('Your cart is empty.');
      return;
    }

    this.router.navigate(['/checkout']);
  }
}