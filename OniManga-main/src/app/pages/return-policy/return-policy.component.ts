import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

interface ApiOrder {
  id: number;
  manga_title: string;
  price: number | string;
  created_at: string;
  is_received: boolean;
  delivery_type: string;
  is_refunded?: boolean;
}

@Component({
  selector: 'app-return-policy',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './return-policy.component.html',
  styleUrl: './return-policy.component.css'
})
export class ReturnPolicyComponent {
  customerName: string = '';
  orderId: string = '';
  bookTitle: string = '';
  receivedDate: string = '';
  reason: string = '';

  returnStatus: 'approved' | 'denied' | 'not-found' | '' = '';
  refundAmount: number = 0;

  username: string = localStorage.getItem('username') || 'Guest';

  constructor(private http: HttpClient) {}

  getUserKey(prefix: string): string {
    return `${prefix}_${this.username}`;
  }

  async checkReturnEligibility() {
    this.returnStatus = '';
    this.refundAmount = 0;

    const balanceKey = this.getUserKey('balance');
    const token = localStorage.getItem('access_token');

    if (!token) {
      this.returnStatus = 'not-found';
      return;
    }

    try {
      const orders = await firstValueFrom(
        this.http.get<ApiOrder[]>('http://127.0.0.1:8000/api/orders/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      );

      const trimmedOrderId = this.orderId.trim();
      const trimmedBookTitle = this.bookTitle.trim().toLowerCase();

      const order = orders.find((item) => {
        const sameId = String(item.id) === trimmedOrderId;
        const sameTitle =
          !trimmedBookTitle ||
          item.manga_title.toLowerCase() === trimmedBookTitle;

        return sameId && sameTitle;
      });

      if (!order) {
        this.returnStatus = 'not-found';
        return;
      }

      if (order.is_refunded) {
        this.returnStatus = 'denied';
        return;
      }

      const baseDate = this.receivedDate
        ? new Date(this.receivedDate)
        : new Date(order.created_at);

      const today = new Date();
      const diffInMs = today.getTime() - baseDate.getTime();
      const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

      if (diffInDays > 14) {
        this.returnStatus = 'denied';
        return;
      }

      await firstValueFrom(
        this.http.patch(
          `http://127.0.0.1:8000/api/orders/${order.id}/refund/`,
          { is_refunded: true },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
      );

      const price = Number(order.price) || 0;
      const currentBalance = Number(localStorage.getItem(balanceKey)) || 0;
      const newBalance = Number((currentBalance + price).toFixed(2));
      localStorage.setItem(balanceKey, newBalance.toString());

      this.refundAmount = price;
      this.returnStatus = 'approved';
    } catch (err) {
      console.log('Refund lookup failed:', err);
      this.returnStatus = 'not-found';
    }
  }
}