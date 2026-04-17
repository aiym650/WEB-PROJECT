import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MangaService {
  constructor(private http: HttpClient) { }

  getMangas() {
    return this.http.get('http://127.0.0.1:8000/api/manga/');
  }
}