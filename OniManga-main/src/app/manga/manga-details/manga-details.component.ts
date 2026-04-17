import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MangaService } from '../manga.service';
import { Manga } from '../models/manga.models';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-manga-details',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './manga-details.component.html',
  styleUrls: ['./manga-details.component.css']
})
export class MangaDetailsComponent implements OnInit {
  manga?: Manga;

  constructor(private route: ActivatedRoute, private mangaService: MangaService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.mangaService.getMangaById(id).subscribe(data => {
      this.manga = data;
    });
  }
}
