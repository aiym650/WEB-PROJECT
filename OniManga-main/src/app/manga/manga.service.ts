import { Injectable } from '@angular/core';
import { Manga } from './models/manga.models';
import { Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MangaService {
  constructor(private http: HttpClient) {}
  
  getMangaList(): Observable<Manga[]> {
  return this.http.get<Manga[]>('http://127.0.0.1:8000/api/manga/');
}

  getMangaById(id: number): Observable<Manga> {
  return this.http.get<Manga>(`http://127.0.0.1:8000/api/manga/${id}/`);
}
}
