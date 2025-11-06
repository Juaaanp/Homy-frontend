# Resizable Components

Componentes Angular standalone para crear paneles redimensionables. Adaptado desde `react-resizable-panels`.

## Componentes

- **ResizablePanelGroupComponent**: Contenedor principal para los paneles
- **ResizablePanelComponent**: Panel individual redimensionable
- **ResizableHandleComponent**: Manija de arrastre para redimensionar entre paneles

## Uso básico

### 1. Importar los componentes

```typescript
import {
  ResizablePanelGroupComponent,
  ResizablePanelComponent,
  ResizableHandleComponent
} from '../components/resizable';

@Component({
  selector: 'app-my-page',
  standalone: true,
  imports: [
    CommonModule,
    ResizablePanelGroupComponent,
    ResizablePanelComponent,
    ResizableHandleComponent
  ],
  templateUrl: './my-page.component.html'
})
export class MyPageComponent {}
```

### 2. Usar en el template

#### Ejemplo horizontal (por defecto)

```html
<app-resizable-panel-group direction="horizontal">
  <app-resizable-panel [defaultSize]="30" [minSize]="20">
    <div class="p-4">
      <h3>Panel Izquierdo</h3>
      <p>Este panel tiene un tamaño predeterminado del 30%</p>
    </div>
  </app-resizable-panel>

  <app-resizable-handle [withHandle]="true"></app-resizable-handle>

  <app-resizable-panel [defaultSize]="70">
    <div class="p-4">
      <h3>Panel Derecho</h3>
      <p>Este panel ocupa el 70% restante</p>
    </div>
  </app-resizable-panel>
</app-resizable-panel-group>
```

#### Ejemplo vertical

```html
<app-resizable-panel-group direction="vertical" className="h-screen">
  <app-resizable-panel [defaultSize]="50">
    <div class="p-4">
      <h3>Panel Superior</h3>
    </div>
  </app-resizable-panel>

  <app-resizable-handle [withHandle]="true"></app-resizable-handle>

  <app-resizable-panel [defaultSize]="50">
    <div class="p-4">
      <h3>Panel Inferior</h3>
    </div>
  </app-resizable-panel>
</app-resizable-panel-group>
```

#### Ejemplo con 3 paneles

```html
<app-resizable-panel-group>
  <app-resizable-panel [defaultSize]="25" [minSize]="15">
    <div class="p-4">Sidebar</div>
  </app-resizable-panel>

  <app-resizable-handle></app-resizable-handle>

  <app-resizable-panel [defaultSize]="50">
    <div class="p-4">Contenido Principal</div>
  </app-resizable-panel>

  <app-resizable-handle></app-resizable-handle>

  <app-resizable-panel [defaultSize]="25" [minSize]="15">
    <div class="p-4">Panel Derecho</div>
  </app-resizable-panel>
</app-resizable-panel-group>
```

## Props

### ResizablePanelGroupComponent

| Prop        | Tipo                            | Default        | Descripción                          |
| ----------- | ------------------------------- | -------------- | ------------------------------------ |
| `direction` | `'horizontal' \| 'vertical'`    | `'horizontal'` | Dirección de los paneles             |
| `className` | `string`                        | `''`           | Clases CSS adicionales               |

### ResizablePanelComponent

| Prop          | Tipo      | Default     | Descripción                               |
| ------------- | --------- | ----------- | ----------------------------------------- |
| `defaultSize` | `number`  | `undefined` | Tamaño predeterminado (porcentaje)        |
| `minSize`     | `number`  | `undefined` | Tamaño mínimo (porcentaje)                |
| `maxSize`     | `number`  | `undefined` | Tamaño máximo (porcentaje)                |
| `id`          | `string`  | `undefined` | ID único del panel                        |
| `className`   | `string`  | `''`        | Clases CSS adicionales                    |

### ResizableHandleComponent

| Prop         | Tipo      | Default | Descripción                              |
| ------------ | --------- | ------- | ---------------------------------------- |
| `withHandle` | `boolean` | `false` | Mostrar icono de agarre en la manija     |
| `className`  | `string`  | `''`    | Clases CSS adicionales                   |

## Estilos

Los componentes usan clases de Bootstrap 5 y Tailwind CSS. Asegúrate de tener los estilos disponibles en tu proyecto.

## Características

- ✅ Paneles redimensionables arrastrando la manija
- ✅ Soporte para dirección horizontal y vertical
- ✅ Tamaños mínimos y máximos configurables
- ✅ Manija visual opcional con icono
- ✅ Componentes standalone (no requieren NgModule)
- ✅ Accesibilidad con atributos ARIA y navegación por teclado

## Diferencias con React

- No requiere instalación de dependencias externas
- Implementación nativa en Angular usando señales y HostListeners
- API simplificada manteniendo la funcionalidad esencial
- Estilos adaptados a Bootstrap 5
