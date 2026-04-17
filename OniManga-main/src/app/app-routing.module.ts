import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { MangaListComponent } from './manga/manga-list/manga-list.component';
import { MangaDetailsComponent } from './manga/manga-details/manga-details.component';
import { authGuard } from './auth/auth.guard';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'manga', component: MangaListComponent, canActivate: [authGuard] },
    { path: 'manga/:id', component: MangaDetailsComponent, canActivate: [authGuard] },
    { path: '', redirectTo: '/manga', pathMatch: 'full' },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
