import { Routes } from '@angular/router';
import { MangaListComponent } from './manga/manga-list/manga-list.component';
import { MangaDetailsComponent } from './manga/manga-details/manga-details.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './pages/home/home.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { AboutComponent } from './pages/about/about.component';
import { ReturnPolicyComponent } from './pages/return-policy/return-policy.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ShippingPolicyComponent } from './pages/shipping-policy/shipping-policy.component';
import { TermsComponent } from './pages/terms/terms.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'manga', component: MangaListComponent },
    { path: 'manga/:id', component: MangaDetailsComponent },
    { path: '', redirectTo: 'manga', pathMatch: 'full' },
    { path: 'categories', component: CategoriesComponent },
    { path: 'about', component: AboutComponent },
    { path: 'return-policy', component: ReturnPolicyComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'shipping', component: ShippingPolicyComponent },
    { path: 'terms', component: TermsComponent },
    { path: 'cart', component: CartComponent },
    { path: '**', redirectTo: '' }

];
