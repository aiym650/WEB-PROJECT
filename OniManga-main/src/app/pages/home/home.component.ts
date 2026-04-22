import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MangaService } from '../../manga/manga.service';
import { Manga } from '../../manga/models/manga.models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  searchText: string = '';

  allManga: Manga[] = [];
  filteredManga: Manga[] = [];

  constructor(private mangaService: MangaService) {}

  ngOnInit(): void {
    this.mangaService.getMangaList().subscribe((data: Manga[]) => {
      this.allManga = data;
      this.filteredManga = data;
    });
  }

  onSearch(): void {
    const value = this.searchText.toLowerCase().trim();

    if (!value) {
      this.filteredManga = [...this.allManga];
      return;
    }

    this.filteredManga = this.allManga.filter(manga =>
      manga.title.toLowerCase().includes(value) ||
      manga.genre.toLowerCase().includes(value) ||
      manga.author.toLowerCase().includes(value)
    );
  }
}