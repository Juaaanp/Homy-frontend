import { Routes } from '@angular/router';
import { Home } from '../pages/home/home';
import { Login } from '../pages/login/login';
import { Register } from '../pages/register/register';
import { Explore } from '../pages/explore/explore';
import { BookingComponent } from '../pages/booking/booking';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'explore', component: Explore },
    { path: 'booking', component: BookingComponent },
    { path: '**', pathMatch: "full", redirectTo: "" }
];

