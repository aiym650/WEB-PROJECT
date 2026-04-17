import { Injectable } from '@angular/core';
import { Manga } from './models/manga.models';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MangaService {
  private mangas: Manga[] = [
    {
      id: 1,
      title: 'Berserk',
      description: 'A dark fantasy tale of revenge and struggle.',
      imageUrl: 'https://cdn.myanimelist.net/images/manga/1/157897.webp',
      genre: 'Dark Fantasy',
      author: 'Kentaro Miura',
      price: 14.99
    },
    {
      id: 2,
      title: 'Solo Leveling',
      description: 'Ten years ago, "the Gate" appeared and connected the real world with the realm of magic and monsters. ',
      imageUrl: 'https://cdn.myanimelist.net/images/manga/3/222295.webp',
      genre: 'Shounen',
      author: 'ChugongJang, Sung-rakDisciples',
      price: 13.99
    },
    {
      id: 3,
      title: 'One Piece',
      description: 'Gol D. Roger, a man referred to as the King of the Pirates, is set to be executed by the World Government. ',
      imageUrl: 'https://cdn.myanimelist.net/images/manga/2/253146.webp',
      genre: 'Shounen',
      author: 'Oda, Eiichiro',
      price: 12.49
    },
    {
      id: 4,
      title: 'Tokyo Ghoul',
      description: 'Lurking within the shadows of Tokyo are frightening beings known as ghouls, who satisfy their hunger by feeding on humans once night falls.',
      imageUrl: 'https://cdn.myanimelist.net/images/manga/3/114037.webp',
      genre: 'Seinen',
      author: 'Ishida, Sui',
      price: 11.99
    },
    {
      id: 5,
      title: 'One Punch-Man',
      description: 'After rigorously training for three years, the ordinary Saitama has gained immense strength which allows him to take out anyone and anything with just one punch. ',
      imageUrl: 'https://cdn.myanimelist.net/images/manga/3/80661.webp',
      genre: 'Seinen',
      author: 'Tsugumi Ohba',
      price: 10.99
    },
    {
      id: 6,
      title: 'Jujutsu Kaisen',
      description: 'Hidden in plain sight, an age-old conflict rages on.',
      imageUrl: 'https://cdn.myanimelist.net/images/manga/3/210341.webp',
      genre: 'Shounen',
      author: 'Akutami, Gege',
      price: 9.99
    },    {
      id: 7,
      title: 'Death Note',
      description: 'Ryuk, a god of death, drops his Death Note into the human world for personal pleasure. ',
      imageUrl: 'https://cdn.myanimelist.net/images/manga/1/258245.webp',
      genre: 'Shounen',
      author: 'Obata, TakeshiOhba, Tsugumi',
      price: 12.99
    },    {
      id: 8,
      title: 'Kimetsu no Yaiba',
      description: 'Tanjirou Kamado lives with his impoverished family on a remote mountain. ',
      imageUrl: 'https://cdn.myanimelist.net/images/manga/3/179023.webp',
      genre: 'Gotouge, Koyoharu',
      author: 'Shounen',
      price: 13.99
    },    {
      id: 9,
      title: 'Chainsaw Man',
      description: 'Denji has a simple dream—to live a happy and peaceful life, spending time with a girl he likes.',
      imageUrl: 'https://cdn.myanimelist.net/images/manga/3/216464.webp',
      genre: 'Shounen',
      author: 'Fujimoto, Tatsuki',
      price: 14.99
    },    {
      id: 10,
      title: 'Shingeki no Kyojin',
      description: 'Hundreds of years ago, horrifying creatures which resembled humans appeared.',
      imageUrl: 'https://cdn.myanimelist.net/images/manga/2/37846.webp',
      genre: 'Shounen',
      author: 'Isayama, Hajime',
      price: 15.99
    },
  ];
  
  getMangaList(): Observable<Manga[]> {
    return of(this.mangas);
  }

  getMangaById(id: number): Observable<Manga | undefined> {
    return of(this.mangas.find(m => m.id === id));
  }
}
