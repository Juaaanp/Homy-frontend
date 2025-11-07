import { Routes } from '@angular/router';
import { Home } from '../pages/home/home';
import { Login } from '../pages/login/login';
import { Register } from '../pages/register/register';
import { Explore } from '../pages/explore/explore';
import { BookingComponent } from '../pages/booking/booking';
import { PropertyDetailsComponent } from '../pages/property-details/property-details';
import { ListSpace } from '../pages/list-space/list-space';
import { MyBookings } from '../pages/my-bookings/my-bookings';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'explore', component: Explore },
    { path: 'property/:id', component: PropertyDetailsComponent },
    { path: 'booking', component: BookingComponent },
    { path: 'bookings', component: MyBookings },
    { path: 'host/list', component: ListSpace },
    { path: '**', pathMatch: "full", redirectTo: "" }
];

