import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { LucideAngularModule, Building, Home, Castle, TreePine, Waves, Mountain, ChevronLeft, ChevronRight, Heart, Menu, MapPin, Calendar, Users, Search, Facebook, Twitter, Instagram, Mail, Phone, Star, TrendingUp, Shield, ArrowRight, ChevronDown, Lock, Eye, EyeOff, ShieldCheck, LogIn, UserCog, User } from 'lucide-angular';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(
      LucideAngularModule.pick({ 
        Building, 
        Home, 
        Castle, 
        TreePine, 
        Waves, 
        Mountain, 
        ChevronLeft, 
        ChevronRight, 
        Heart, 
        Menu, 
        MapPin, 
        Calendar, 
        Users, 
        Search, 
        Facebook, 
        Twitter, 
        Instagram, 
        Mail, 
        Phone, 
        Star,
        TrendingUp,
        Shield,
        ArrowRight,
        ChevronDown,
        Lock,
        Eye,
        EyeOff,
        ShieldCheck,
  LogIn,
  UserCog,
  User
      })
    )
  ]
};
