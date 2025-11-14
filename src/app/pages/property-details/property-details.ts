import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LucideAngularModule, Star, MapPin, Users, Bed, Bath, Wifi, Car, Tv, Wind, Calendar, Heart, Share2, ChevronLeft, ChevronRight, Home } from 'lucide-angular';
import { PropertyService } from '../../services/property.service';
import { HousingService, HousingDetails } from '../../services/housing.service';
import { FavoriteService } from '../../services/favorite.service';
import { CommentService, Comment } from '../../services/comment.service';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MapComponent } from '../../components/map/map.component';
import { TokenService } from '../../services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-property-details',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule, HeaderComponent, FooterComponent, MapComponent],
  templateUrl: './property-details.html',
  styleUrls: ['./property-details.css']
})
export class PropertyDetailsComponent implements OnInit {
  // Icons
  Star = Star;
  MapPin = MapPin;
  Users = Users;
  Bed = Bed;
  Bath = Bath;
  Wifi = Wifi;
  Car = Car;
  Tv = Tv;
  Wind = Wind;
  Calendar = Calendar;
  Heart = Heart;
  Share2 = Share2;
  ChevronLeft = ChevronLeft;
  ChevronRight = ChevronRight;
  Home = Home;

  // Signals
  loading = signal(true);
  property = signal<any>(null);
  selectedImageIndex = signal(0);
  checkInDate = signal('');
  checkOutDate = signal('');
  guests = signal(1);
  isFavorite = signal(false);
  favoriteCount = signal(0);
  
  // Comments
  comments = signal<Comment[]>([]);
  loadingComments = signal(false);
  showCommentForm = signal(false);
  newComment = signal({ rate: 5, content: '', bookingId: 0 });
  isHost = signal(false);

  // Computed
  currentImage = computed(() => {
    const images = this.property()?.images || [];
    return images[this.selectedImageIndex()] || '';
  });

  nights = computed(() => {
    if (!this.checkInDate() || !this.checkOutDate()) return 0;
    const start = new Date(this.checkInDate());
    const end = new Date(this.checkOutDate());
    const diff = end.getTime() - start.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  });

  subtotal = computed(() => {
    return (this.property()?.price || 0) * this.nights();
  });

  serviceFee = computed(() => {
    return Math.round(this.subtotal() * 0.1);
  });

  cleaningFee = computed(() => {
    return this.property()?.price ? Math.round(this.property().price * 0.15) : 0;
  });

  total = computed(() => {
    return this.subtotal() + this.serviceFee() + this.cleaningFee();
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private propertyService: PropertyService,
    private housingService: HousingService,
    private favoriteService: FavoriteService,
    private commentService: CommentService,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    // Obtener ID de la ruta
    const id = this.route.snapshot.paramMap.get('id');
    
    if (!id) {
      this.router.navigate(['/explore']);
      return;
    }
    
    // Cargar la propiedad
    this.loadProperty(id);
    
    // Cargar fechas y huéspedes desde query params si vienen de explore
    this.route.queryParams.subscribe(params => {
      if (params['checkIn']) {
        this.checkInDate.set(params['checkIn']);
      }
      if (params['checkOut']) {
        this.checkOutDate.set(params['checkOut']);
      }
      if (params['guests']) {
        this.guests.set(parseInt(params['guests']) || 1);
      }
    });
  }

  loadProperty(id: string) {
    this.loading.set(true);
    const numericId = parseInt(id);
    
    console.log('Loading property with ID:', id, 'parsed as:', numericId);
    
    if (isNaN(numericId) || numericId <= 0) {
      console.warn('Invalid property ID:', id);
      this.loading.set(false);
      this.router.navigate(['/explore']);
      return;
    }
    
    this.housingService.getHousingById(numericId).subscribe({
      next: (housing) => {
        console.log('Property loaded successfully:', housing);
        const mappedProperty = this.mapHousingToProperty(housing);
        console.log('Mapped property:', mappedProperty);
        this.property.set(mappedProperty);
        this.loading.set(false);
        this.loadFavoriteStatus(numericId);
        this.loadComments(numericId);
        this.checkIfHost();
      },
      error: (error) => {
        console.error('Error loading property:', error);
        console.error('Error status:', error.status);
        console.error('Error message:', error.message);
        this.loading.set(false);
        this.router.navigate(['/explore']);
      }
    });
  }


  mapHousingToProperty(housing: HousingDetails): any {
    // Backend HousingResponse: images is List<String>, not List<HousingImage>
    const images = Array.isArray(housing.images) 
      ? housing.images 
      : (housing.images as any)?.map?.((img: any) => img.url || img) || [];
    
    return {
      id: (housing.id || 0).toString(),
      title: housing.title,
      description: housing.description,
      price: housing.nightPrice || housing.pricePerNight || 0,
      location: `${housing.city}, ${housing.address || ''}`,
      city: housing.city,
      country: 'Colombia',
      rating: housing.averageRating || 4.5,
      reviews: 0,
      reviewCount: 0,
      bedrooms: 2,
      bathrooms: 1,
      guests: housing.maxCapacity,
      area: 1200,
      type: 'Apartment',
      images: images.length > 0 
        ? images 
        : ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'],
      imageUrl: images[0] || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      amenities: housing.services || [],
      host: {
        name: housing.hostName || 'Host',
        avatar: 'https://i.pravatar.cc/150?img=5',
        joinDate: '2024-01',
        verified: true
      },
      coordinates: { 
        lat: housing.latitude, 
        lng: housing.length 
      },
      isNew: true,
      featured: false
    };
  }

  selectImage(index: number) {
    this.selectedImageIndex.set(index);
  }

  previousImage() {
    const images = this.property()?.images || [];
    if (images.length > 0) {
      const newIndex = this.selectedImageIndex() === 0 
        ? images.length - 1 
        : this.selectedImageIndex() - 1;
      this.selectedImageIndex.set(newIndex);
    }
  }

  nextImage() {
    const images = this.property()?.images || [];
    if (images.length > 0) {
      const newIndex = (this.selectedImageIndex() + 1) % images.length;
      this.selectedImageIndex.set(newIndex);
    }
  }

  getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  bookNow() {
    // Validar que el usuario esté autenticado
    const userId = this.tokenService.getUserId();
    if (!userId) {
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'You must be logged in to make a booking',
        confirmButtonColor: '#f97316'
      }).then(() => {
        this.router.navigate(['/login'], {
          queryParams: { returnUrl: this.router.url }
        });
      });
      return;
    }
    
    // Validar rol
    const role = this.tokenService.getRole();
    if (role !== 'GUEST') {
      Swal.fire({
        icon: 'error',
        title: 'Access Denied',
        text: 'Only guests can make bookings. Please login with a guest account.',
        confirmButtonColor: '#f97316'
      });
      return;
    }
    
    // Validar fechas
    if (!this.checkInDate() || !this.checkOutDate()) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Dates',
        text: 'Please select both check-in and check-out dates',
        confirmButtonColor: '#f97316'
      });
      return;
    }
    
    // Validar que las fechas sean válidas
    const checkIn = new Date(this.checkInDate());
    const checkOut = new Date(this.checkOutDate());
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (checkIn < today) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Date',
        text: 'Check-in date cannot be in the past',
        confirmButtonColor: '#f97316'
      });
      return;
    }
    
    if (checkOut <= checkIn) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Dates',
        text: 'Check-out date must be after check-in date',
        confirmButtonColor: '#f97316'
      });
      return;
    }
    
    // Validar huéspedes
    const property = this.property();
    if (this.guests() < 1) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Guests',
        text: 'At least 1 guest is required',
        confirmButtonColor: '#f97316'
      });
      return;
    }
    
    if (property && property.guests && this.guests() > property.guests) {
      Swal.fire({
        icon: 'warning',
        title: 'Capacity Exceeded',
        text: `This property can accommodate up to ${property.guests} guests`,
        confirmButtonColor: '#f97316'
      });
      return;
    }
    
    // Navegar a booking
    this.router.navigate(['/booking'], {
      queryParams: {
        propertyId: this.property()?.id,
        checkIn: this.checkInDate(),
        checkOut: this.checkOutDate(),
        guests: this.guests()
      }
    });
  }

  goBack() {
    this.router.navigate(['/explore']);
  }

  toggleFavorite() {
    const propertyId = this.property()?.id;
    if (!propertyId) return;

    const numericId = parseInt(propertyId);
    if (this.isFavorite()) {
      this.favoriteService.removeFavorite(numericId).subscribe({
        next: () => {
          this.isFavorite.set(false);
          this.favoriteCount.set(this.favoriteCount() - 1);
        },
        error: (error) => console.error('Error removing favorite:', error)
      });
    } else {
      this.favoriteService.addFavorite(numericId).subscribe({
        next: () => {
          this.isFavorite.set(true);
          this.favoriteCount.set(this.favoriteCount() + 1);
        },
        error: (error) => console.error('Error adding favorite:', error)
      });
    }
  }

  private loadFavoriteStatus(housingId: number) {
    // Cargar contador de favoritos (público)
    this.favoriteService.getFavoriteCount(housingId).subscribe({
      next: (count) => this.favoriteCount.set(count),
      error: () => this.favoriteCount.set(0)
    });

    // Cargar si es favorito del usuario (requiere autenticación)
    this.favoriteService.isFavorite(housingId).subscribe({
      next: (isFav) => this.isFavorite.set(isFav),
      error: () => this.isFavorite.set(false)
    });
  }

  loadComments(housingId: number) {
    this.loadingComments.set(true);
    this.commentService.getComments(housingId).subscribe({
      next: (comments) => {
        this.comments.set(comments);
        this.loadingComments.set(false);
      },
      error: (error) => {
        console.error('Error loading comments:', error);
        this.loadingComments.set(false);
        this.comments.set([]);
      }
    });
  }

  checkIfHost() {
    const role = this.tokenService.getRole();
    this.isHost.set(role === 'HOST');
  }

  submitComment() {
    const propertyId = this.property()?.id;
    if (!propertyId) return;

    const comment = this.newComment();
    if (!comment.content.trim() || comment.rate < 1 || comment.rate > 5) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please provide a rating (1-5) and comment text',
        confirmButtonColor: '#f97316'
      });
      return;
    }

    const commentData = {
      bookingId: comment.bookingId,
      housingId: parseInt(propertyId),
      rate: comment.rate,
      content: comment.content.trim()
    };

    this.commentService.createComment(parseInt(propertyId), commentData).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Your comment has been posted',
          confirmButtonColor: '#f97316'
        });
        this.newComment.set({ rate: 5, content: '', bookingId: 0 });
        this.showCommentForm.set(false);
        this.loadComments(parseInt(propertyId));
      },
      error: (error) => {
        console.error('Error creating comment:', error);
        const message = error.error?.message || error.message || 'Failed to post comment';
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: message,
          confirmButtonColor: '#f97316'
        });
      }
    });
  }

  replyingToComment = signal<number | null>(null);

  showReplyForm(comment: Comment) {
    Swal.fire({
      title: 'Reply to Review',
      input: 'textarea',
      inputLabel: 'Your reply',
      inputPlaceholder: 'Type your reply here...',
      inputAttributes: {
        'aria-label': 'Type your reply here'
      },
      showCancelButton: true,
      confirmButtonText: 'Post Reply',
      confirmButtonColor: '#f97316',
      cancelButtonColor: '#6b7280',
      inputValidator: (value) => {
        if (!value || value.trim().length === 0) {
          return 'You need to write something!';
        }
        if (value.length > 500) {
          return 'Reply must be 500 characters or less';
        }
        return null;
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        this.replyToComment(comment.housingId, comment.id, result.value);
      }
    });
  }

  replyToComment(housingId: number, commentId: number, message: string) {
    if (!message.trim()) return;

    this.commentService.replyToComment(housingId, commentId, message).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Your reply has been posted',
          confirmButtonColor: '#f97316'
        });
        this.loadComments(housingId);
      },
      error: (error) => {
        console.error('Error replying to comment:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to post reply',
          confirmButtonColor: '#f97316'
        });
      }
    });
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }
}
