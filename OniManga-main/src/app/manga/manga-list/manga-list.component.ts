import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MangaService } from '../manga.service';
import { Manga } from '../models/manga.models';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../core/cart.service';
import { AuthService } from '../../auth/auth.service';
import { ToastService } from '../../core/toast.service';
import { SearchService } from '../../core/search.service';

@Component({
  selector: 'app-manga-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './manga-list.component.html',
  styleUrls: ['./manga-list.component.css']
})
export class MangaListComponent implements OnInit {
  mangaList: Manga[] = [];
  filteredManga: Manga[] = [];

  constructor(
    private router: Router,
    private mangaService: MangaService,
    private cartService: CartService,
    public authService: AuthService,
    private toastService: ToastService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.mangaService.getMangaList().subscribe(data => {
      this.mangaList = data;
      this.filteredManga = data;
    });

    this.searchService.searchText$.subscribe(value => {
      const text = value.toLowerCase().trim();

      if (!text) {
        this.filteredManga = [...this.mangaList];
        return;
      }

      this.filteredManga = this.mangaList.filter(manga =>
        manga.title.toLowerCase().includes(text) ||
        manga.genre.toLowerCase().includes(text) ||
        manga.author.toLowerCase().includes(text)
      );
    });
  }

  goToDetails(id: number) {
    this.router.navigate(['/manga', id]);
  }

  addToCart(manga: Manga) {
    if (!this.authService.isAuthenticated()) {
      this.toastService.show('Please login to add items to cart');
      return;
    }

   this.cartService.addToCart(manga);

this.cartService.addToCartApi(manga).subscribe({
  next: () => {
    this.toastService.show(`${manga.title} added to cart`);
  },
  error: () => {
    this.toastService.show('Cart API request failed');
  }
});
  }
}