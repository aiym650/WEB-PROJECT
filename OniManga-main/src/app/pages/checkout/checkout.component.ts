import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { CartService } from '../../core/cart.service';
import { ToastService } from '../../core/toast.service';
import { Manga } from '../../manga/models/manga.models';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  fullName = '';
  phone = '';
  address = '';
  city = '';

  cardName = '';
  cardNumber = '';
  expiryDate = '';
  cvv = '';

  deliveryType: 'delivery' | 'pickup' = 'delivery';

  orderItems: Manga[] = [];
  username: string = localStorage.getItem('username') || 'Guest';

  constructor(
    private cartService: CartService,
    private router: Router,
    private toastService: ToastService,
    private http: HttpClient
  ) {
    this.orderItems = this.cartService.getItems();
    this.initializeBalance();
  }

  get totalPrice(): number {
    return this.orderItems.reduce((sum, item) => sum + Number(item.price), 0);
  }

  getUserKey(prefix: string): string {
    return `${prefix}_${this.username}`;
  }

  initializeBalance(): void {
    const balanceKey = this.getUserKey('balance');
    const savedBalance = localStorage.getItem(balanceKey);

    if (savedBalance === null || isNaN(Number(savedBalance))) {
      localStorage.setItem(balanceKey, '100');
    }
  }

  isDelivery(): boolean {
    return this.deliveryType === 'delivery';
  }

  isPickup(): boolean {
    return this.deliveryType === 'pickup';
  }

  onlyDigits(value: string): string {
    return value.replace(/\D/g, '');
  }

  formatCardNumber() {
    let digits = this.onlyDigits(this.cardNumber).slice(0, 16);
    this.cardNumber = digits.replace(/(.{4})/g, '$1 ').trim();
  }

  formatPhone() {
    let digits = this.onlyDigits(this.phone);

    if (digits.startsWith('8')) {
      digits = '7' + digits.slice(1);
    }

    if (!digits.startsWith('7')) {
      digits = '7' + digits;
    }

    digits = digits.slice(0, 11);

    let formatted = '+7';
    if (digits.length > 1) formatted += ' ' + digits.slice(1, 4);
    if (digits.length > 4) formatted += ' ' + digits.slice(4, 7);
    if (digits.length > 7) formatted += ' ' + digits.slice(7, 9);
    if (digits.length > 9) formatted += ' ' + digits.slice(9, 11);

    this.phone = formatted;
  }

  formatExpiryDate() {
    let digits = this.onlyDigits(this.expiryDate).slice(0, 4);

    if (digits.length >= 3) {
      this.expiryDate = digits.slice(0, 2) + '/' + digits.slice(2);
    } else {
      this.expiryDate = digits;
    }
  }

  formatCvv() {
    this.cvv = this.onlyDigits(this.cvv).slice(0, 3);
  }

 async payNow(form: NgForm) {
  if (this.orderItems.length === 0) {
    this.toastService.show('Your cart is empty');
    return;
  }

  if (form.invalid) {
    this.toastService.show('Please correct the checkout fields');
    return;
  }

  const balanceKey = this.getUserKey('balance');
  const shippingKey = this.getUserKey('shipping_info');
  const cartKey = `cartItems_${this.username}`;
  const token = localStorage.getItem('access_token');

  let currentBalance = Number(localStorage.getItem(balanceKey));
  if (isNaN(currentBalance)) {
    currentBalance = 100;
  }

  const total = Number(this.totalPrice.toFixed(2));

  if (currentBalance < total) {
    this.toastService.show('Insufficient balance');
    return;
  }

  if (this.deliveryType === 'delivery') {
    const shippingInfo = {
      name: this.fullName,
      phone: this.phone,
      address: this.address,
      city: this.city
    };
    localStorage.setItem(shippingKey, JSON.stringify(shippingInfo));
  } else {
    localStorage.setItem(
      shippingKey,
      JSON.stringify({
        name: '',
        phone: '',
        address: '',
        city: ''
      })
    );
  }

  try {
    for (const item of this.orderItems) {
      await firstValueFrom(
        this.http.post(
          'http://127.0.0.1:8000/api/orders/',
          {
            manga: item.id,
            delivery_type: this.deliveryType
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
      );
    }

    currentBalance = Number((currentBalance - total).toFixed(2));
    localStorage.setItem(balanceKey, currentBalance.toString());

    this.cartService.clearCart();
    localStorage.setItem(cartKey, JSON.stringify([]));

    this.toastService.show('Payment successful');
    this.router.navigate(['/profile']);
  } catch (err) {
    console.log('Order API failed', err);
    this.toastService.show('Order save failed. Nothing was purchased');
  }

  }
}