import { Injectable } from '@angular/core';
import { Manga } from '../manga/models/manga.models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: Manga[] = [];

  constructor(private http: HttpClient) {
    this.loadCart();
  }

  private getStorageKey(): string {
    const username = localStorage.getItem('username') || 'guest';
    return `cartItems_${username}`;
  }

  private loadCart(): void {
    const savedCart = localStorage.getItem(this.getStorageKey());
    this.items = savedCart ? JSON.parse(savedCart) : [];
  }

  private saveCart(): void {
    localStorage.setItem(this.getStorageKey(), JSON.stringify(this.items));
  }

  getItems(): Manga[] {
    this.loadCart();
    return [...this.items];
  }

  addToCart(item: Manga): void {
    this.loadCart();
    this.items.push(item);
    this.saveCart();
  }

  clearCart(): void {
    this.items = [];
    this.saveCart();
  }

  getCount(): number {
    this.loadCart();
    return this.items.length;
  }

  removeOne(itemToRemove: Manga): void {
    this.loadCart();

    const index = this.items.findIndex(item => item.id === itemToRemove.id);
    if (index !== -1) {
      this.items.splice(index, 1);
      this.saveCart();
    }
  }

  addToCartApi(manga: Manga): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/cart/', {
      manga: manga.id,
      quantity: 1
    });
  }
}