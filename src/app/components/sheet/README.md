# Sheet Component (Drawer/Sliding Panel)

Componente Angular standalone para crear paneles laterales deslizables (drawers) que se abren desde cualquier lado de la pantalla. Adaptado desde `@radix-ui/react-dialog` (Sheet variant).

## Componentes

- **SheetComponent**: Componente contenedor raíz
- **SheetContentComponent**: Panel deslizable principal
- **SheetHeaderComponent**: Encabezado del sheet
- **SheetFooterComponent**: Pie del sheet
- **SheetTitleComponent**: Título del sheet
- **SheetDescriptionComponent**: Descripción del sheet
- **SheetTriggerDirective**: Directiva para botón que abre el sheet
- **SheetCloseDirective**: Directiva para botón que cierra el sheet
- **SheetService**: Servicio para controlar el estado del sheet

## Instalación y setup

### 1. Importar componentes y servicio

```typescript
import {
  SheetComponent,
  SheetContentComponent,
  SheetHeaderComponent,
  SheetFooterComponent,
  SheetTitleComponent,
  SheetDescriptionComponent,
  SheetTriggerDirective,
  SheetCloseDirective
} from '../components/sheet';

@Component({
  selector: 'app-my-page',
  standalone: true,
  imports: [
    CommonModule,
    SheetComponent,
    SheetContentComponent,
    SheetHeaderComponent,
    SheetFooterComponent,
    SheetTitleComponent,
    SheetDescriptionComponent,
    SheetTriggerDirective,
    SheetCloseDirective
  ],
  templateUrl: './my-page.component.html'
})
export class MyPageComponent {}
```

## Uso básico

### Sheet desde la derecha (por defecto)

```html
<app-sheet>
  <!-- Trigger button -->
  <button appSheetTrigger class="btn btn-primary">
    Abrir Sheet
  </button>

  <!-- Sheet content -->
  <app-sheet-content>
    <app-sheet-header>
      <app-sheet-title>Título del Sheet</app-sheet-title>
      <app-sheet-description>
        Descripción del contenido del sheet
      </app-sheet-description>
    </app-sheet-header>

    <div class="p-4">
      <p>Contenido principal del sheet...</p>
    </div>

    <app-sheet-footer>
      <button appSheetClose class="btn btn-primary">Guardar</button>
      <button appSheetClose class="btn btn-outline-secondary">Cancelar</button>
    </app-sheet-footer>
  </app-sheet-content>
</app-sheet>
```

### Sheet desde la izquierda

```html
<app-sheet>
  <button appSheetTrigger class="btn btn-primary">
    Abrir Menú
  </button>

  <app-sheet-content side="left">
    <app-sheet-header>
      <app-sheet-title>Menú de Navegación</app-sheet-title>
    </app-sheet-header>

    <nav class="p-4 space-y-2">
      <a href="#" class="block px-3 py-2 hover:bg-gray-100 rounded">Inicio</a>
      <a href="#" class="block px-3 py-2 hover:bg-gray-100 rounded">Productos</a>
      <a href="#" class="block px-3 py-2 hover:bg-gray-100 rounded">Servicios</a>
      <a href="#" class="block px-3 py-2 hover:bg-gray-100 rounded">Contacto</a>
    </nav>
  </app-sheet-content>
</app-sheet>
```

### Sheet desde arriba

```html
<app-sheet>
  <button appSheetTrigger class="btn btn-primary">
    Ver Notificaciones
  </button>

  <app-sheet-content side="top">
    <app-sheet-header>
      <app-sheet-title>Notificaciones</app-sheet-title>
    </app-sheet-header>

    <div class="p-4">
      <div class="space-y-2">
        <div class="p-3 bg-gray-50 rounded">Nueva notificación 1</div>
        <div class="p-3 bg-gray-50 rounded">Nueva notificación 2</div>
        <div class="p-3 bg-gray-50 rounded">Nueva notificación 3</div>
      </div>
    </div>
  </app-sheet-content>
</app-sheet>
```

### Sheet desde abajo

```html
<app-sheet>
  <button appSheetTrigger class="btn btn-primary">
    Ver Opciones
  </button>

  <app-sheet-content side="bottom">
    <app-sheet-header>
      <app-sheet-title>Opciones Rápidas</app-sheet-title>
    </app-sheet-header>

    <div class="p-4 space-y-2">
      <button class="btn btn-outline-primary w-full">Opción 1</button>
      <button class="btn btn-outline-primary w-full">Opción 2</button>
      <button class="btn btn-outline-primary w-full">Opción 3</button>
    </div>

    <app-sheet-footer>
      <button appSheetClose class="btn btn-secondary w-full">Cancelar</button>
    </app-sheet-footer>
  </app-sheet-content>
</app-sheet>
```

## Control programático con SheetService

```typescript
import { Component } from '@angular/core';
import { SheetService } from '../components/sheet';

@Component({
  selector: 'app-my-component',
  template: `
    <button (click)="openSheet()">Abrir Sheet Programáticamente</button>
    <button (click)="closeSheet()">Cerrar Sheet</button>
    <button (click)="toggleSheet()">Toggle Sheet</button>

    <app-sheet-content>
      <!-- Contenido del sheet -->
    </app-sheet-content>
  `
})
export class MyComponent {
  constructor(private sheetService: SheetService) {}

  openSheet() {
    this.sheetService.open();
  }

  closeSheet() {
    this.sheetService.close();
  }

  toggleSheet() {
    this.sheetService.toggle();
  }
}
```

## Ejemplos de casos de uso

### Menú lateral de navegación (Mobile Menu)

```html
<app-sheet>
  <button appSheetTrigger class="btn btn-outline-secondary">
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
    </svg>
  </button>

  <app-sheet-content side="left">
    <app-sheet-header>
      <app-sheet-title>Menú</app-sheet-title>
    </app-sheet-header>

    <nav class="flex flex-col p-4 space-y-2">
      <a href="/dashboard" class="px-4 py-2 hover:bg-gray-100 rounded">Dashboard</a>
      <a href="/products" class="px-4 py-2 hover:bg-gray-100 rounded">Productos</a>
      <a href="/orders" class="px-4 py-2 hover:bg-gray-100 rounded">Órdenes</a>
      <a href="/customers" class="px-4 py-2 hover:bg-gray-100 rounded">Clientes</a>
      <a href="/settings" class="px-4 py-2 hover:bg-gray-100 rounded">Configuración</a>
    </nav>

    <app-sheet-footer>
      <button class="btn btn-danger w-full">Cerrar Sesión</button>
    </app-sheet-footer>
  </app-sheet-content>
</app-sheet>
```

### Carrito de compras

```html
<app-sheet>
  <button appSheetTrigger class="btn btn-primary position-relative">
    🛒 Carrito
    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
      3
    </span>
  </button>

  <app-sheet-content side="right">
    <app-sheet-header>
      <app-sheet-title>Carrito de Compras</app-sheet-title>
      <app-sheet-description>3 artículos en tu carrito</app-sheet-description>
    </app-sheet-header>

    <div class="flex-1 overflow-auto p-4 space-y-4">
      <!-- Item 1 -->
      <div class="flex gap-3 pb-3 border-bottom">
        <img src="product1.jpg" class="w-16 h-16 rounded" />
        <div class="flex-1">
          <h6 class="mb-1">Producto 1</h6>
          <p class="text-sm text-muted">$99.99</p>
        </div>
        <button class="btn btn-sm btn-outline-danger">×</button>
      </div>
      
      <!-- Item 2 -->
      <div class="flex gap-3 pb-3 border-bottom">
        <img src="product2.jpg" class="w-16 h-16 rounded" />
        <div class="flex-1">
          <h6 class="mb-1">Producto 2</h6>
          <p class="text-sm text-muted">$149.99</p>
        </div>
        <button class="btn btn-sm btn-outline-danger">×</button>
      </div>
    </div>

    <app-sheet-footer>
      <div class="d-flex justify-content-between mb-3">
        <span>Subtotal:</span>
        <span class="fw-bold">$249.98</span>
      </div>
      <button class="btn btn-primary w-full">Proceder al Pago</button>
      <button appSheetClose class="btn btn-outline-secondary w-full">Seguir Comprando</button>
    </app-sheet-footer>
  </app-sheet-content>
</app-sheet>
```

### Formulario de filtros

```html
<app-sheet>
  <button appSheetTrigger class="btn btn-outline-primary">
    🔍 Filtros
  </button>

  <app-sheet-content side="right">
    <app-sheet-header>
      <app-sheet-title>Filtrar Productos</app-sheet-title>
      <app-sheet-description>
        Personaliza tu búsqueda
      </app-sheet-description>
    </app-sheet-header>

    <form class="p-4 space-y-4">
      <div>
        <label class="form-label">Categoría</label>
        <select class="form-select">
          <option>Todas</option>
          <option>Electrónica</option>
          <option>Ropa</option>
          <option>Hogar</option>
        </select>
      </div>

      <div>
        <label class="form-label">Rango de Precio</label>
        <input type="range" class="form-range" min="0" max="1000" />
        <div class="d-flex justify-content-between">
          <span>$0</span>
          <span>$1000</span>
        </div>
      </div>

      <div>
        <label class="form-label">Marca</label>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="brand1" />
          <label class="form-check-label" for="brand1">Marca 1</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="brand2" />
          <label class="form-check-label" for="brand2">Marca 2</label>
        </div>
      </div>
    </form>

    <app-sheet-footer>
      <button class="btn btn-primary w-full">Aplicar Filtros</button>
      <button class="btn btn-outline-secondary w-full">Limpiar</button>
    </app-sheet-footer>
  </app-sheet-content>
</app-sheet>
```

### Detalles de producto

```html
<app-sheet>
  <button appSheetTrigger class="btn btn-link">
    Ver Detalles
  </button>

  <app-sheet-content side="right">
    <app-sheet-header>
      <app-sheet-title>Detalles del Producto</app-sheet-title>
    </app-sheet-header>

    <div class="p-4 space-y-4">
      <img src="product.jpg" class="w-full rounded" />
      
      <h3 class="text-xl fw-bold">Nombre del Producto</h3>
      <p class="text-muted">Descripción detallada del producto...</p>
      
      <div class="d-flex align-items-center gap-2">
        <span class="text-2xl fw-bold">$299.99</span>
        <span class="badge bg-success">En Stock</span>
      </div>

      <div>
        <h6>Características:</h6>
        <ul>
          <li>Característica 1</li>
          <li>Característica 2</li>
          <li>Característica 3</li>
        </ul>
      </div>
    </div>

    <app-sheet-footer>
      <button class="btn btn-primary w-full">Agregar al Carrito</button>
      <button appSheetClose class="btn btn-outline-secondary w-full">Cerrar</button>
    </app-sheet-footer>
  </app-sheet-content>
</app-sheet>
```

## Props

### SheetContentComponent

| Prop        | Tipo                                    | Default   | Descripción                                |
| ----------- | --------------------------------------- | --------- | ------------------------------------------ |
| `side`      | `'top' \| 'right' \| 'bottom' \| 'left'` | `'right'` | Lado desde el que se desliza el sheet      |
| `className` | `string`                                | `''`      | Clases CSS adicionales                     |

### Otros componentes

Todos los componentes auxiliares (Header, Footer, Title, Description) aceptan:
- `className`: `string` - Clases CSS adicionales

## Características

- ✅ Se desliza desde 4 lados: top, right, bottom, left
- ✅ Overlay oscuro con click para cerrar
- ✅ Botón de cerrar (X) incluido
- ✅ Animaciones suaves de entrada/salida
- ✅ Bloqueo de scroll del body cuando está abierto
- ✅ Control programático con SheetService
- ✅ Directivas para trigger y close
- ✅ Componentes standalone (no requieren NgModule)
- ✅ Responsive (ancho del 75% en móvil, max 24rem en desktop)
- ✅ Accesibilidad con botón close y overlay clickeable

## SheetService API

```typescript
sheetService.open()    // Abre el sheet
sheetService.close()   // Cierra el sheet
sheetService.toggle()  // Alterna el estado
sheetService.state$    // Observable del estado
```

## Estilos

El componente incluye:
- Transiciones suaves (300ms)
- Overlay con fade in/out
- Panel deslizable con transform
- Z-index: 40 (overlay), 50 (content)
- Shadow para profundidad
- Responsive: 75% ancho en móvil, max 24rem en desktop

## Diferencias con React/Radix UI

- **Sin Portal complejo**: Usa posicionamiento fixed simple
- **Servicio centralizado**: SheetService para control de estado
- **Directivas Angular**: appSheetTrigger y appSheetClose
- **Más simple**: No requiere primitives de Radix
- **Sin dependencias**: Implementación 100% nativa

## Tips

1. **Usa side apropiadamente**:
   - `right`: Carritos, filtros, detalles (desktop)
   - `left`: Menús de navegación
   - `bottom`: Opciones rápidas (mobile)
   - `top`: Notificaciones, búsquedas

2. **Contenido scrolleable**: El contenido interno es scrolleable automáticamente

3. **Footer pegado**: El footer se pega automáticamente al fondo con `mt-auto`

4. **Click fuera para cerrar**: El overlay cierra el sheet al hacer click

5. **ESC para cerrar**: Considera agregar un HostListener para cerrar con ESC

## Accesibilidad

- Botón de cerrar con aria-label="Close"
- Text "Close" oculto visualmente pero accesible para lectores de pantalla
- Overlay clickeable para cerrar
- Focus trap (considera agregar con CDK)

¡El componente Sheet está listo para usar en tu aplicación Angular! 🎉
