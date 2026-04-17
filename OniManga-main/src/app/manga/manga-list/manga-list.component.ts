import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MangaService } from '../manga.service';
import { Manga } from '../models/manga.models';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';
import { CartService } from '../../core/cart.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-manga-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './manga-list.component.html',
  styleUrls: ['./manga-list.component.css']
})
export class MangaListComponent implements OnInit {
  mangaList: Manga[] = [];

  constructor(
    private router: Router,
    private mangaService: MangaService,
    private cartService: CartService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.mangaService.getMangaList().subscribe(data => {
      this.mangaList = data;
    });
  }

  goToDetails(id: number) {
    this.router.navigate(['/manga', id]);
  }

  addToCart(manga: Manga) {
    if (!this.authService.isAuthenticated()) {
      alert('Please login to add items to cart.');
      return;
    }
    this.cartService.addToCart(manga);
    alert(`"${manga.title}" added to cart!`);
  }
  
}
