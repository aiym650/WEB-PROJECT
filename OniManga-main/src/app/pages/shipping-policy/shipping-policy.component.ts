import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shipping-policy',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shipping-policy.component.html',
  styleUrl: './shipping-policy.component.css'
})
export class ShippingPolicyComponent {
  selectedCity: string = '';
  deliveryPrice: string = '';
  shippingTime: string = '';
  arrivalTime: string = '';

  cities: string[] = [
    'Almaty',
    'Astana',
    'Shymkent',
    'Karaganda',
    'Atyrau',
    'Other'
  ];

  updateShippingInfo() {
    if (this.selectedCity === 'Almaty') {
      this.deliveryPrice = 'Free';
      this.shippingTime = 'Within 24 hours';
      this.arrivalTime = 'Same day or next day';
    } else if (this.selectedCity) {
      this.deliveryPrice = '$3';
      this.shippingTime = '1-2 business days';
      this.arrivalTime = '3-5 business days';
    } else {
      this.deliveryPrice = '';
      this.shippingTime = '';
      this.arrivalTime = '';
    }
  }
}