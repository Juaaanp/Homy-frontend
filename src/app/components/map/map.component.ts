import { Component, Input, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

declare var mapboxgl: any;

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  @Input() latitude: number = 0;
  @Input() longitude: number = 0;
  @Input() title: string = '';
  
  private map: any;
  private marker: any;

  ngOnInit() {
    // Cargar el script de Mapbox si no está cargado
    if (typeof mapboxgl === 'undefined') {
      this.loadMapboxScript();
    }
  }

  ngAfterViewInit() {
    if (this.mapContainer) {
      this.initMap();
    }
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
    }
  }

  private loadMapboxScript() {
    const script = document.createElement('script');
    script.src = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js';
    script.onload = () => {
      this.initMap();
    };
    document.head.appendChild(script);

    const link = document.createElement('link');
    link.href = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }

  private initMap() {
    if (!this.mapContainer || !this.latitude || !this.longitude) {
      return;
    }

    // Token de Mapbox (deberías usar una variable de entorno)
    // Por ahora usaremos un token público de ejemplo - DEBES REEMPLAZARLO
    mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXV4NTFiamM2YzJ3M2Y0M2Y0M2YifQ.rJcFIG214AriISLbB6B5aw';

    this.map = new mapboxgl.Map({
      container: this.mapContainer.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [this.longitude, this.latitude],
      zoom: 13
    });

    // Agregar marcador
    this.marker = new mapboxgl.Marker()
      .setLngLat([this.longitude, this.latitude])
      .setPopup(new mapboxgl.Popup().setHTML(`<h3>${this.title}</h3>`))
      .addTo(this.map);
  }
}

