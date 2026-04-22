import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MangaService } from '../../manga/manga.service';
import { Manga } from '../../manga/models/manga.models';
import { CartService } from '../../core/cart.service';
import { AuthService } from '../../auth/auth.service';
import { ToastService } from '../../core/toast.service';
import { SearchService } from '../../core/search.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
  mangaList: Manga[] = [];
  filteredMangaList: Manga[] = [];
  selectedCategory: string = 'All';
  searchTerm: string = '';

  categories: string[] = ['All', 'Shounen', 'Seinen', 'Dark Fantasy', 'Action','Romance','Sport'];

  constructor(
    private mangaService: MangaService,
    private cartService: CartService,
    public authService: AuthService,
    private router: Router,
    private toastService: ToastService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.mangaService.getMangaList().subscribe(data => {
      this.mangaList = data;
      this.applyFilters();
    });

    this.searchService.searchText$.subscribe(text => {
      this.searchTerm = text.toLowerCase().trim();
      this.applyFilters();
    });
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.applyFilters();
  }

  applyFilters(): void {
    let result = [...this.mangaList];

    if (this.selectedCategory !== 'All') {
      result = result.filter(
        manga => manga.genre?.toLowerCase() === this.selectedCategory.toLowerCase()
      );
    }

    if (this.searchTerm) {
      result = result.filter(manga =>
        manga.title?.toLowerCase().includes(this.searchTerm) ||
        manga.author?.toLowerCase().includes(this.searchTerm) ||
        manga.genre?.toLowerCase().includes(this.searchTerm) ||
        manga.description?.toLowerCase().includes(this.searchTerm)
      );
    }

    this.filteredMangaList = result;
  }

  goToDetails(id: number): void {
    this.router.navigate(['/manga', id]);
  }

  addToCart(manga: Manga): void {
    if (!this.authService.isAuthenticated()) {
      this.toastService.show('Please login to add items to cart');
      return;
    }

    this.cartService.addToCart(manga);
    this.toastService.show(`${manga.title} added to cart`);
  }
}