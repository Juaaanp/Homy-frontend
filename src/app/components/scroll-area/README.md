# ScrollArea Component

Componente Angular standalone para crear áreas de scroll personalizadas con scrollbars nativas estilizadas. Adaptado desde `@radix-ui/react-scroll-area`.

## Componente

- **ScrollAreaComponent**: Contenedor principal con viewport de scroll y scrollbars nativas personalizadas

## Uso básico

### 1. Importar el componente

```typescript
import { ScrollAreaComponent } from '../components/scroll-area';

@Component({
  selector: 'app-my-page',
  standalone: true,
  imports: [
    CommonModule,
    ScrollAreaComponent
  ],
  templateUrl: './my-page.component.html'
})
export class MyPageComponent {}
```

### 2. Usar en el template

#### Ejemplo básico

```html
<app-scroll-area className="h-72 w-96 rounded-md border p-4">
  <div>
    <h4 class="mb-4 text-sm font-medium leading-none">Etiquetas</h4>
    <div class="space-y-2">
      <div class="text-sm">Angular</div>
      <div class="text-sm">TypeScript</div>
      <div class="text-sm">Bootstrap</div>
      <div class="text-sm">Signals</div>
      <div class="text-sm">Standalone Components</div>
      <!-- Más contenido... -->
    </div>
  </div>
</app-scroll-area>
```

#### Con altura máxima personalizada

```html
<app-scroll-area maxHeight="400px" className="rounded-md border p-4">
  <div>
    <p>Contenido muy largo que necesita scroll...</p>
    <p>Más contenido...</p>
    <!-- El scroll aparecerá automáticamente cuando el contenido supere 400px -->
  </div>
</app-scroll-area>
```

#### Lista scrolleable

```html
<app-scroll-area className="h-[600px] w-full">
  <div class="p-4">
    <h3 class="mb-4 text-lg font-semibold">Lista de elementos</h3>
    <div class="space-y-2">
      <div *ngFor="let item of items" class="p-3 border rounded-md">
        {{ item.name }}
      </div>
    </div>
  </div>
</app-scroll-area>
```

#### Scroll horizontal

```html
<app-scroll-area className="w-96 whitespace-nowrap rounded-md border">
  <div class="flex w-max space-x-4 p-4">
    <div *ngFor="let card of cards" class="shrink-0">
      <div class="w-[250px] h-[200px] rounded-md border p-4">
        <h4>{{ card.title }}</h4>
        <p>{{ card.description }}</p>
      </div>
    </div>
  </div>
</app-scroll-area>
```

#### Chat o mensajes

```html
<app-scroll-area className="h-[500px] w-full rounded-lg border bg-white">
  <div class="p-4 space-y-4">
    <div *ngFor="let message of messages" class="flex gap-3">
      <div class="flex-shrink-0">
        <img [src]="message.avatar" class="w-8 h-8 rounded-full" />
      </div>
      <div class="flex-1">
        <div class="font-semibold">{{ message.author }}</div>
        <div class="text-sm text-gray-600">{{ message.content }}</div>
        <div class="text-xs text-gray-400">{{ message.timestamp }}</div>
      </div>
    </div>
  </div>
</app-scroll-area>
```

#### Sidebar o navegación

```html
<app-scroll-area className="h-screen border-r">
  <div class="p-4">
    <nav>
      <div class="space-y-1">
        <a *ngFor="let item of navItems" 
           [routerLink]="item.path"
           class="block px-3 py-2 rounded-md hover:bg-gray-100">
          {{ item.label }}
        </a>
      </div>
    </nav>
  </div>
</app-scroll-area>
```

## Props

### ScrollAreaComponent

| Prop        | Tipo     | Default     | Descripción                                      |
| ----------- | -------- | ----------- | ------------------------------------------------ |
| `className` | `string` | `''`        | Clases CSS adicionales para el contenedor        |
| `maxHeight` | `string` | `undefined` | Altura máxima del área de scroll (ej: "400px")  |

## Estilos

El componente incluye estilos personalizados para:
- Scrollbar estilizada (thin scrollbar en Firefox, custom en Chrome/Safari)
- Transiciones suaves
- Focus visible con ring
- Soporte para ambas orientaciones (vertical y horizontal)

### Variables CSS utilizadas

```css
--bs-border-color      /* Color del scrollbar thumb */
--bs-secondary         /* Color del scrollbar thumb en hover */
--bs-primary-rgb       /* Color del focus ring */
```

## Características

- ✅ Scrollbars personalizadas y estilizadas
- ✅ Soporte para scroll vertical y horizontal
- ✅ Transiciones suaves
- ✅ Focus visible accesible
- ✅ Compatible con Bootstrap 5
- ✅ Componentes standalone (no requieren NgModule)
- ✅ Sin dependencias externas de Radix UI

## Diferencias con React/Radix UI

- No requiere instalación de `@radix-ui/react-scroll-area`
- Usa scrollbars nativas del navegador con estilos CSS personalizados
- API simplificada manteniendo la funcionalidad esencial
- Totalmente integrado con el sistema de diseño de Bootstrap 5
- Menos complejidad en la implementación

## Notas

- El componente usa las scrollbars nativas del navegador con estilos CSS personalizados
- Para Firefox se usa `scrollbar-width: thin`
- Para Chrome/Safari se usan los pseudo-elementos `::-webkit-scrollbar-*`
- El comportamiento de scroll es completamente nativo y accesible
