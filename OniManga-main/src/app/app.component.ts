import { Component, OnInit } from '@angular/core'; // Добавили OnInit
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { HeaderComponent } from './core/header.component';
import { MangaService } from './services/manga.service'; // 1. Импортируем наш новый сервис

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit { // 2. Добавили implements OnInit
  showSearch = false;
  isMenuOpen = false;
  mangas: any[] = []; // 3. Сюда сохраним список манги из базы

  // 4. Добавляем mangaService в конструктор рядом с router
  constructor(private router: Router, private mangaService: MangaService) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const url = this.router.url;
      this.showSearch = !(url.includes('login') || url.includes('register'));
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // 5. Этот метод сработает сразу при запуске сайта
  ngOnInit() {
    this.mangaService.getMangas().subscribe({
      next: (data: any) => {
        this.mangas = data; // Сохраняем "Наруто" в переменную
        console.log('Данные из Django получены:', data);
      },
      error: (err) => {
        console.error('Ошибка связи с бэкендом:', err);
      }
    });
  }
}