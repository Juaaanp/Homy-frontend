# Separator Component

Componente Angular standalone para crear separadores visuales horizontales o verticales. Adaptado desde `@radix-ui/react-separator`.

## Componente

- **SeparatorComponent**: Línea separadora horizontal o vertical

## Uso básico

### 1. Importar el componente

```typescript
import { SeparatorComponent } from '../components/separator';

@Component({
  selector: 'app-my-page',
  standalone: true,
  imports: [
    CommonModule,
    SeparatorComponent
  ],
  templateUrl: './my-page.component.html'
})
export class MyPageComponent {}
```

### 2. Usar en el template

#### Separador horizontal (por defecto)

```html
<div>
  <div class="space-y-1">
    <h4 class="text-sm font-medium leading-none">Radix Primitives</h4>
    <p class="text-sm text-muted-foreground">
      An open-source UI component library.
    </p>
  </div>
  
  <app-separator className="my-4"></app-separator>
  
  <div class="flex h-5 items-center space-x-4 text-sm">
    <div>Blog</div>
    <app-separator orientation="vertical"></app-separator>
    <div>Docs</div>
    <app-separator orientation="vertical"></app-separator>
    <div>Source</div>
  </div>
</div>
```

#### Separador vertical

```html
<div class="flex h-20 items-center">
  <span>Item 1</span>
  <app-separator orientation="vertical" className="mx-4"></app-separator>
  <span>Item 2</span>
  <app-separator orientation="vertical" className="mx-4"></app-separator>
  <span>Item 3</span>
</div>
```

#### En una lista o menú

```html
<div class="w-full max-w-xs">
  <div class="space-y-1">
    <h4 class="text-sm font-medium leading-none">Cuenta</h4>
    <p class="text-sm text-muted-foreground">
      Gestiona la configuración de tu cuenta.
    </p>
  </div>
  
  <app-separator className="my-4"></app-separator>
  
  <div class="space-y-2">
    <button class="w-full text-left px-2 py-1.5 hover:bg-gray-100 rounded">
      Perfil
    </button>
    <button class="w-full text-left px-2 py-1.5 hover:bg-gray-100 rounded">
      Configuración
    </button>
    <button class="w-full text-left px-2 py-1.5 hover:bg-gray-100 rounded">
      Suscripción
    </button>
  </div>
  
  <app-separator className="my-4"></app-separator>
  
  <button class="w-full text-left px-2 py-1.5 text-red-600 hover:bg-red-50 rounded">
    Cerrar sesión
  </button>
</div>
```

#### En un formulario

```html
<form>
  <div class="space-y-4">
    <div>
      <label for="name" class="form-label">Nombre</label>
      <input id="name" type="text" class="form-control" />
    </div>
    
    <div>
      <label for="email" class="form-label">Email</label>
      <input id="email" type="email" class="form-control" />
    </div>
  </div>
  
  <app-separator className="my-6"></app-separator>
  
  <div class="space-y-4">
    <div>
      <label for="company" class="form-label">Empresa</label>
      <input id="company" type="text" class="form-control" />
    </div>
    
    <div>
      <label for="role" class="form-label">Cargo</label>
      <input id="role" type="text" class="form-control" />
    </div>
  </div>
  
  <app-separator className="my-6"></app-separator>
  
  <button type="submit" class="btn btn-primary">Guardar</button>
</form>
```

#### En una tarjeta (Card)

```html
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Producto</h3>
    <p class="card-description">Detalles del producto</p>
  </div>
  
  <app-separator></app-separator>
  
  <div class="card-body">
    <p>Contenido del producto...</p>
  </div>
  
  <app-separator></app-separator>
  
  <div class="card-footer">
    <button class="btn btn-primary">Comprar</button>
  </div>
</div>
```

#### Separador en navegación

```html
<nav class="flex items-center space-x-4">
  <a href="#" class="text-sm">Inicio</a>
  <app-separator orientation="vertical" className="h-4"></app-separator>
  <a href="#" class="text-sm">Productos</a>
  <app-separator orientation="vertical" className="h-4"></app-separator>
  <a href="#" class="text-sm">Servicios</a>
  <app-separator orientation="vertical" className="h-4"></app-separator>
  <a href="#" class="text-sm">Contacto</a>
</nav>
```

#### Separador decorativo vs semántico

```html
<!-- Decorativo (por defecto) - no visible para lectores de pantalla -->
<app-separator [decorative]="true" className="my-4"></app-separator>

<!-- Semántico - visible para lectores de pantalla con role="separator" -->
<app-separator [decorative]="false" className="my-4"></app-separator>
```

## Props

### SeparatorComponent

| Prop          | Tipo                            | Default        | Descripción                                           |
| ------------- | ------------------------------- | -------------- | ----------------------------------------------------- |
| `orientation` | `'horizontal' \| 'vertical'`    | `'horizontal'` | Orientación del separador                             |
| `decorative`  | `boolean`                       | `true`         | Si es decorativo (role="none") o semántico (role="separator") |
| `className`   | `string`                        | `''`           | Clases CSS adicionales                                |

## Estilos

El componente usa:
- `background-color: var(--bs-border-color)` para el color del separador
- `height: 1px` para separadores horizontales
- `width: 1px` para separadores verticales
- `width: 100%` para separadores horizontales
- `height: 100%` para separadores verticales

### Clases CSS útiles

```html
<!-- Espaciado -->
<app-separator className="my-4"></app-separator>  <!-- Margen vertical -->
<app-separator className="mx-4"></app-separator>  <!-- Margen horizontal (vertical sep) -->

<!-- Altura personalizada (para separadores verticales) -->
<app-separator orientation="vertical" className="h-4"></app-separator>
<app-separator orientation="vertical" className="h-8"></app-separator>
<app-separator orientation="vertical" className="h-full"></app-separator>

<!-- Color personalizado -->
<app-separator className="bg-primary"></app-separator>
<app-separator className="bg-secondary"></app-separator>
<app-separator className="bg-danger"></app-separator>

<!-- Grosor personalizado -->
<app-separator className="h-0.5"></app-separator>  <!-- Más delgado -->
<app-separator className="h-2"></app-separator>    <!-- Más grueso -->
```

## Características

- ✅ Separador horizontal y vertical
- ✅ Decorativo (no accesible) o semántico (accesible)
- ✅ Atributos ARIA correctos
- ✅ Estilos consistentes con Bootstrap 5
- ✅ Componente standalone (no requiere NgModule)
- ✅ Sin dependencias externas
- ✅ Muy ligero y simple

## Accesibilidad

El componente maneja automáticamente los atributos ARIA:

- **Decorativo** (`decorative="true"`, por defecto):
  - `role="none"` - No es anunciado por lectores de pantalla
  - Sin `aria-orientation`
  - Ideal para separadores puramente visuales

- **Semántico** (`decorative="false"`):
  - `role="separator"` - Anunciado por lectores de pantalla
  - `aria-orientation="horizontal|vertical"` - Indica la orientación
  - Ideal cuando el separador tiene significado estructural

```html
<!-- Separador puramente decorativo -->
<app-separator></app-separator>

<!-- Separador con significado semántico -->
<app-separator [decorative]="false"></app-separator>
```

## Diferencias con React/Radix UI

- **Sin dependencias**: No requiere `@radix-ui/react-separator`
- **Implementación nativa**: Usa elementos HTML nativos con estilos CSS
- **Más simple**: No necesita primitives complejos
- **Mismo comportamiento**: Mantiene toda la funcionalidad y accesibilidad

## Cuándo usar Separator

✅ **Úsalo cuando necesites:**
- Separar secciones de contenido visualmente
- Dividir elementos en una lista o menú
- Crear divisiones en formularios
- Separar elementos en navegación horizontal
- Dividir header/body/footer en tarjetas

❌ **No lo uses cuando:**
- Necesites bordes en contenedores (usa `border` CSS)
- Quieras crear layouts (usa Grid o Flexbox)
- Necesites líneas decorativas complejas (usa `<hr>` personalizado)

## Ejemplo completo

```typescript
// my-profile.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeparatorComponent } from '../components/separator';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [CommonModule, SeparatorComponent],
  template: `
    <div class="max-w-2xl mx-auto p-6">
      <!-- Header -->
      <div class="space-y-1">
        <h2 class="text-2xl font-bold">Mi Perfil</h2>
        <p class="text-muted-foreground">
          Gestiona tu información personal
        </p>
      </div>
      
      <app-separator className="my-6"></app-separator>
      
      <!-- Información personal -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Información Personal</h3>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-sm font-medium">Nombre</label>
            <p>Juan Pérez</p>
          </div>
          <div>
            <label class="text-sm font-medium">Email</label>
            <p>juan@example.com</p>
          </div>
        </div>
      </div>
      
      <app-separator className="my-6"></app-separator>
      
      <!-- Preferencias -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Preferencias</h3>
        <div class="space-y-2">
          <label class="flex items-center">
            <input type="checkbox" checked /> Notificaciones por email
          </label>
          <label class="flex items-center">
            <input type="checkbox" /> Newsletter semanal
          </label>
        </div>
      </div>
      
      <app-separator className="my-6"></app-separator>
      
      <!-- Acciones -->
      <div class="flex gap-2">
        <button class="btn btn-primary">Guardar cambios</button>
        <button class="btn btn-outline-secondary">Cancelar</button>
      </div>
    </div>
  `
})
export class MyProfileComponent {}
```

## Tips

1. **Usa `className` para espaciado**: Agrega márgenes con clases de Bootstrap o Tailwind
2. **Vertical en flex containers**: Los separadores verticales funcionan mejor en contenedores flex
3. **Altura en verticales**: Define la altura del separador vertical o del contenedor padre
4. **Decorativo por defecto**: Mantén `decorative="true"` a menos que el separador tenga significado semántico
