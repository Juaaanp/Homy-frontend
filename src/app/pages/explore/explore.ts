import { Component, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { PropertyService, Property } from '../../services/property.service';
import { HousingService, HousingSummary } from '../../services/housing.service';
import { TokenService } from '../../services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './explore.html',
  styleUrl: './explore.css'
})
export class Explore implements OnInit {
  viewMode = signal<'grid' | 'list'>('grid');
  showFilters = signal(false);
  
  // All properties loaded from service
  allProperties = signal<Property[]>([]);
  
  // Filter signals (reactive)
  searchLocation = signal('');
  priceRange = signal([0, 1000000]); // [minPrice, maxPrice]
  propertyType = signal('');
  rating = signal(0);
  bedrooms = signal(0);
  bathrooms = signal(0);
  sortBy = signal('recommended');
  
  // Search bar inputs - ahora se usan para filtrar
  checkIn = signal('');
  checkOut = signal('');
  guests = signal(1);
  city = signal('Bogotá');
  
  // Pagination
  currentPage = signal(0);
  pageSize = signal(20);
  totalProperties = signal(0);
  
  // Fecha mínima para inputs de fecha
  today = new Date().toISOString().split('T')[0];
  
  propertyTypes = ['All', 'Apartment', 'House', 'Villa', 'Cabin', 'Loft'];
  ratingOptions = [5, 4, 3, 2];
  
  // Computed filtered and sorted properties
  filteredProperties = computed(() => {
    let results = [...this.allProperties()];
    
    // Filtrar propiedades sin ID válido (pero solo como último recurso)
    // Primero intentar mostrar todas las propiedades
    console.log('🔵 filteredProperties: Total properties before filtering:', results.length);
    
    // Filter by price range
    const [minPrice, maxPrice] = this.priceRange();
    results = results.filter(p => p.price >= minPrice && p.price <= maxPrice);
    
    // Filter by property type
    const type = this.propertyType();
    if (type && type !== 'All') {
      results = results.filter(p => p.type === type);
    }
    
    // Filter by minimum rating
    const minRating = this.rating();
    if (minRating > 0) {
      results = results.filter(p => p.rating >= minRating);
    }
    
    // Filter by minimum bedrooms
    const minBedrooms = this.bedrooms();
    if (minBedrooms > 0) {
      results = results.filter(p => (p.bedrooms ?? 0) >= minBedrooms);
    }
    
    // Filter by minimum bathrooms
    const minBathrooms = this.bathrooms();
    if (minBathrooms > 0) {
      results = results.filter(p => (p.bathrooms ?? 0) >= minBathrooms);
    }
    
    // Filter by guests capacity
    const numGuests = this.guests();
    if (numGuests > 0) {
      results = results.filter(p => (p.guests ?? 0) >= numGuests);
    }
    
    // Apply sorting
    const sort = this.sortBy();
    switch (sort) {
      case 'price-low':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'reviews':
        results.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
        break;
      case 'recommended':
      default:
        // Keep original order (or add custom recommendation logic)
        break;
    }
    
    return results;
  });
  
  // Computed property count for display
  propertyCount = computed(() => this.filteredProperties().length);
  
  loading = signal(true);
  backendProperties = signal<HousingSummary[]>([]);

  constructor(
    private router: Router,
    private propertyService: PropertyService,
    private housingService: HousingService,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    console.log('🔵 Explore component initialized');
    
    // Verificar si el usuario está autenticado
    const token = this.tokenService.getToken();
    const userId = this.tokenService.getUserId();
    const role = this.tokenService.getRole();
    
    console.log('User info:', {
      hasToken: !!token,
      userId,
      role,
      tokenPreview: token ? token.substring(0, 20) + '...' : 'none'
    });
    
    if (!token) {
      console.warn('⚠️ User not authenticated - properties may not load');
    }
    
    // Cargar propiedades desde el backend SIN filtros
    console.log('🔵 Calling loadProperties()...');
    this.loadProperties();
  }
  
  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
  
  loadProperties() {
    this.loading.set(true);
    
    console.log('🔵 Loading all active properties (simplified - no filters)...');
    
    // Llamar al endpoint simplificado que devuelve todas las propiedades activas
    this.housingService.getAllHousings(
      this.currentPage(),
      this.pageSize()
    ).subscribe({
      next: (response) => {
        console.log('✅ Properties loaded successfully:', response);
        console.log('Total elements:', response.totalElements);
        console.log('Content length:', response.content?.length || 0);
        console.log('Content:', response.content);
        
        this.backendProperties.set(response.content || []);
        this.totalProperties.set(response.totalElements || 0);
        
        // Mapear propiedades del backend al formato del frontend
        const mapped = (response.content || []).map(h => {
          const property = this.mapHousingToProperty(h);
          console.log('Mapped property:', { id: property.id, title: property.title, originalId: h.id });
          return property;
        });
        
        // NO filtrar propiedades - mostrar todas, incluso si el ID no es perfecto
        // El método viewProperty se encargará de validar el ID cuando se haga clic
        this.allProperties.set(mapped);
        this.loading.set(false);
        
        if (mapped.length === 0) {
          console.warn('⚠️ No properties found - database may be empty or all properties are deleted');
          console.warn('Response was:', JSON.stringify(response, null, 2));
        } else {
          console.log(`✅ Successfully loaded ${mapped.length} properties`);
        }
      },
      error: (error) => {
        console.error('Error loading properties:', error);
        console.error('Error details:', {
          status: error.status,
          message: error.message,
          error: error.error
        });
        this.loading.set(false);
        
        // Si es un error 401, el usuario necesita autenticarse
        if (error.status === 401) {
          console.warn('Authentication required - user needs to login');
          // No mostrar alerta, solo dejar la lista vacía
          // El usuario puede buscar después de autenticarse
          this.allProperties.set([]);
          this.totalProperties.set(0);
          return;
        }
        
        // Si es un error 400, puede ser que los parámetros sean inválidos
        if (error.status === 400) {
          console.warn('Bad request - invalid parameters');
          this.allProperties.set([]);
          this.totalProperties.set(0);
          return;
        }
        
        // Para otros errores, mostrar mensaje pero no bloquear
        if (error.status && error.status !== 200) {
          console.error('Unexpected error:', error);
          // No mostrar alerta para no molestar al usuario
          // Simplemente dejar la lista vacía
          this.allProperties.set([]);
          this.totalProperties.set(0);
        } else {
          // Si no hay resultados, simplemente dejar la lista vacía
          this.allProperties.set([]);
          this.totalProperties.set(0);
        }
      }
    });
  }

  mapHousingToProperty(housing: HousingSummary): Property {
    // Backend SummaryHousingResponse: id, title, city, nightPrice, principalImage, averageRating
    const imageUrl = housing.principalImage || housing.imageUrl || null;
    const price = housing.nightPrice || housing.pricePerNight || 0;
    
    // Asegurar que el ID sea válido - usar el ID del backend directamente
    const housingId = housing.id;
    if (!housingId || housingId <= 0) {
      console.warn('mapHousingToProperty: Invalid housing ID:', housingId, 'for housing:', housing);
    }
    
    return {
      id: String(housingId || 0),
      title: housing.title,
      description: 'Explore this amazing property',
      price: price,
      location: `${housing.city}${housing.address ? ', ' + housing.address : ''}`,
      city: housing.city,
      country: 'Colombia',
      rating: housing.averageRating || 4.5,
      reviews: 0,
      reviewCount: 0,
      bedrooms: 2,
      bathrooms: 1,
      guests: housing.maxCapacity || 2,
      area: 1200,
      type: 'Apartment',
      images: imageUrl ? [imageUrl] : ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'],
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      amenities: [],
      host: {
        name: 'Host',
        avatar: 'https://i.pravatar.cc/150?img=5',
        joinDate: '2024-01',
        verified: true
      },
      coordinates: { lat: 0, lng: 0 },
      isNew: true,
      featured: (housing.averageRating || 0) >= 4.5
    };
  }
  
  toggleViewMode(mode: 'grid' | 'list') {
    this.viewMode.set(mode);
  }
  
  toggleFilters() {
    this.showFilters.set(!this.showFilters());
  }
  
  clearFilters() {
    this.priceRange.set([0, 1000000]);
    this.propertyType.set('');
    this.rating.set(0);
    this.bedrooms.set(0);
    this.bathrooms.set(0);
    // Recargar propiedades con filtros limpios
    this.loadProperties();
  }
  
  searchProperties() {
    // Actualizar ciudad si se ingresó en el search
    const searchCity = this.searchLocation().trim();
    if (searchCity) {
      this.city.set(searchCity);
    }
    
    // Validar fechas (pero permitir búsqueda sin fechas también)
    if (this.checkIn() && this.checkOut()) {
      const checkInDate = new Date(this.checkIn());
      const checkOutDate = new Date(this.checkOut());
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (checkInDate < today) {
        Swal.fire({
          icon: 'warning',
          title: 'Invalid Date',
          text: 'Check-in date cannot be in the past.',
          confirmButtonColor: '#f97316'
        });
        return;
      }
      
      if (checkOutDate <= checkInDate) {
        Swal.fire({
          icon: 'warning',
          title: 'Invalid Dates',
          text: 'Check-out date must be after check-in date.',
          confirmButtonColor: '#f97316'
        });
        return;
      }
    }
    
    // Recargar propiedades con los nuevos filtros
    this.currentPage.set(0);
    this.loadProperties();
  }
  
  viewProperty(id: string | number) {
    console.log('viewProperty called with id:', id, 'type:', typeof id);
    
    if (!id) {
      console.error('viewProperty: No ID provided');
      return;
    }
    
    const propertyId = String(id).trim();
    console.log('viewProperty: propertyId after conversion:', propertyId);
    
    // Validar que el ID sea válido
    if (!propertyId || propertyId === 'undefined' || propertyId === 'null' || propertyId === '0' || propertyId === '') {
      console.error('viewProperty: Invalid property ID:', propertyId);
      Swal.fire({
        icon: 'error',
        title: 'Invalid Property',
        text: 'Unable to view property details. Please try again.',
        confirmButtonColor: '#f97316'
      });
      return;
    }
    
    console.log('viewProperty: Navigating to /property/' + propertyId);
    this.router.navigate(['/property', propertyId]).then(
      (success) => {
        console.log('viewProperty: Navigation successful:', success);
      },
      (error) => {
        console.error('viewProperty: Navigation failed:', error);
        Swal.fire({
          icon: 'error',
          title: 'Navigation Error',
          text: 'Unable to navigate to property details. Please try again.',
          confirmButtonColor: '#f97316'
        });
      }
    );
  }

  bookProperty(propertyId: string | number) {
    console.log('bookProperty called with propertyId:', propertyId);
    
    if (!propertyId) {
      console.error('bookProperty: No property ID provided');
      Swal.fire({
        icon: 'error',
        title: 'Invalid Property',
        text: 'Unable to book property. Please try again.',
        confirmButtonColor: '#f97316'
      });
      return;
    }
    
    const id = String(propertyId).trim();
    if (id === 'undefined' || id === 'null' || id === '0' || id === '') {
      console.error('bookProperty: Invalid property ID:', id);
      Swal.fire({
        icon: 'error',
        title: 'Invalid Property',
        text: 'Unable to book property. Please try again.',
        confirmButtonColor: '#f97316'
      });
      return;
    }
    
    // Verificar que el usuario esté autenticado
    const token = this.tokenService.getToken();
    if (!token) {
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'You must be logged in as a guest to make a booking.',
        confirmButtonColor: '#f97316',
        confirmButtonText: 'Go to Login'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/login'], { 
            queryParams: { returnUrl: `/booking?propertyId=${id}` }
          });
        }
      });
      return;
    }
    
    // Verificar rol
    const userRole = this.tokenService.getRole();
    if (userRole !== 'GUEST') {
      Swal.fire({
        icon: 'error',
        title: 'Access Denied',
        text: 'Only guests can make bookings. Please login with a guest account.',
        confirmButtonColor: '#f97316'
      });
      return;
    }
    
    console.log('bookProperty: Navigating to /booking with params:', {
      propertyId: id,
      checkIn: this.checkIn(),
      checkOut: this.checkOut(),
      guests: this.guests()
    });
    
    // Navegar a booking con todos los parámetros necesarios
    this.router.navigate(['/booking'], {
      queryParams: {
        propertyId: id,
        checkIn: this.checkIn() || undefined,
        checkOut: this.checkOut() || undefined,
        guests: this.guests() || undefined
      }
    }).then(
      (success) => {
        console.log('bookProperty: Navigation successful:', success);
      },
      (error) => {
        console.error('bookProperty: Navigation failed:', error);
        Swal.fire({
          icon: 'error',
          title: 'Navigation Error',
          text: 'Unable to navigate to booking page. Please try again.',
          confirmButtonColor: '#f97316'
        });
      }
    );
  }
  
  getStarArray(count: number): number[] {
    return Array(5).fill(0).map((_, i) => i);
  }
}
