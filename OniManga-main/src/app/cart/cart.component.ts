import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../core/cart.service';
import { Manga } from '../manga/models/manga.models';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  items: Manga[] = [];

  constructor(private cartService: CartService) {
    this.items = this.cartService.getItems();
  }

  clearCart() {
    this.cartService.clearCart();
    this.items = [];
  }

  get total(): number {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }
}
