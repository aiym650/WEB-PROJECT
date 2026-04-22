import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface PurchaseItem {
  id: number;
  title: string;
  price: number;
  date: string;
  status: string;
  is_received: boolean;
  delivery_type: string;
  is_refunded?: boolean;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  username: string = localStorage.getItem('username') || 'Guest';
  email: string = localStorage.getItem('email') || '';
  balance: number = 0;
  purchases: PurchaseItem[] = [];

  shippingInfo = {
    name: '',
    phone: '',
    address: '',
    city: ''
  };

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  getUserKey(prefix: string): string {
    return `${prefix}_${this.username}`;
  }

  ngOnInit(): void {
    const balanceKey = this.getUserKey('balance');
    const shippingKey = this.getUserKey('shipping_info');

    console.log('PROFILE USERNAME:', this.username);
    console.log('BALANCE KEY:', balanceKey);
    console.log('BALANCE VALUE:', localStorage.getItem(balanceKey));

    this.balance = Number(localStorage.getItem(balanceKey)) || 100;

    const savedShipping = localStorage.getItem(shippingKey);
    if (savedShipping) {
      this.shippingInfo = JSON.parse(savedShipping);
    }

    this.loadOrders();
  }

  loadOrders(): void {
    const token = localStorage.getItem('access_token');
    console.log('PROFILE TOKEN:', token);

    this.http.get<any[]>('http://127.0.0.1:8000/api/orders/', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe({
      next: (orders) => {
        this.purchases = orders.map(order => ({
          id: order.id,
          title: order.manga_title,
          price: Number(order.price),
          date: order.created_at ? order.created_at.split('T')[0] : '',
          status: order.is_refunded
            ? 'Returned'
            : order.delivery_type === 'pickup'
              ? 'Received'
              : order.is_received
                ? 'Received'
                : 'Paid',
          is_received: order.is_received,
          delivery_type: order.delivery_type,
          is_refunded: order.is_refunded
        }));
      },
      error: (err) => {
        console.log('Failed to load orders', err);
      }
    });
  }

  confirmReceived(item: PurchaseItem): void {
    const token = localStorage.getItem('access_token');

    this.http.patch(
      `http://127.0.0.1:8000/api/orders/${item.id}/`,
      { is_received: true },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).subscribe({
      next: () => {
        item.status = 'Received';
        item.is_received = true;
      },
      error: (err) => {
        console.log('ERROR:', err);
      }
    });
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }
}