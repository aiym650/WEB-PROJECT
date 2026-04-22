import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { HeaderComponent } from './core/header.component';
import { MangaService } from './services/manga.service';
import { ToastService } from './core/toast.service';
import { SearchService } from './core/search.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    FormsModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showSearch = false;
  isMenuOpen = false;
  mangas: any[] = [];
  searchText: string = '';
  toastMessage = '';

  constructor(
    private router: Router,
    private mangaService: MangaService,
    private toastService: ToastService,
    private searchService: SearchService
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const url = event.urlAfterRedirects;

      this.showSearch =
        url === '/' ||
        url === '/home' ||
        url === '/manga' ||
        url === '/categories';
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onSearch() {
    const value = this.searchText.trim();
    this.searchService.setSearchText(value);
  }

  ngOnInit() {
    this.toastService.toastMessage$.subscribe(message => {
      this.toastMessage = message;
    });

    this.mangaService.getMangas().subscribe({
      next: (data: any) => {
        this.mangas = data;
        console.log('Данные из Django получены:', data);
      },
      error: (err) => {
        console.error('Ошибка связи с бэкендом:', err);
      }
    });

    const currentUrl = this.router.url;
    this.showSearch =
      currentUrl === '/' ||
      currentUrl === '/home' ||
      currentUrl === '/manga' ||
      currentUrl === '/categories';
  }
}