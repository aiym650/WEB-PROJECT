import { Injectable } from '@angular/core';
import { Manga } from '../manga/models/manga.models';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: Manga[] = [];

  getItems(): Manga[] {
    return [...this.items];
  }

  addToCart(item: Manga): void {
    this.items.push(item);
  }

  clearCart(): void {
    this.items = [];
  }

  getCount(): number {
    return this.items.length;
  }
}
