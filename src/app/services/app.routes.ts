import { Routes } from '@angular/router';
import { Home } from '../pages/home/home';
import { Login } from '../pages/login/login';
import { Register } from '../pages/register/register';
import { Explore } from '../pages/explore/explore';
import { BookingComponent } from '../pages/booking/booking';
import { PropertyDetailsComponent } from '../pages/property-details/property-details';
import { ListSpace } from '../pages/list-space/list-space';
import { MyListings } from '../pages/my-listings/my-listings';
import { MyBookings } from '../pages/my-bookings/my-bookings';
import { UserProfile } from '../pages/user-profile/user-profile';
import { ForgotPassword } from '../pages/forgot-password/forgot-password';
import { VerifyCode } from '../pages/verify-code/verify-code';
import { ResetPassword } from '../pages/reset-password/reset-password';
import { FavoritesComponent } from '../pages/favorites/favorites';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'forgot-password', component: ForgotPassword },
    { path: 'verify-code', component: VerifyCode },
    { path: 'reset-password', component: ResetPassword },
    { path: 'explore', component: Explore },
    { path: 'property/:id', component: PropertyDetailsComponent },
    { path: 'booking', component: BookingComponent }, // Temporarily removed authGuard for testing
    { path: 'bookings', component: MyBookings, canActivate: [authGuard] },
    { path: 'host/list', component: ListSpace, canActivate: [authGuard] },
    { path: 'host/listings', component: MyListings, canActivate: [authGuard] },
    { path: 'profile', component: UserProfile, canActivate: [authGuard] },
    { path: 'favorites', component: FavoritesComponent, canActivate: [authGuard] },
    { path: '**', pathMatch: "full", redirectTo: "" }
];

