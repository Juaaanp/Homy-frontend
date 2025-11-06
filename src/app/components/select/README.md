# Select Component

Componente Angular standalone para crear selects personalizados con soporte para formularios reactivos. Adaptado desde `@radix-ui/react-select`.

## Componentes

- **SelectComponent**: Componente principal de select con integración ControlValueAccessor
- **SelectOptionComponent**: Componente para opciones individuales (opcional, se puede usar `<option>` nativo)
- **SelectGroupDirective**: Directiva para agrupar opciones con `<optgroup>`
- **SelectSeparatorComponent**: Separador visual entre opciones

## Uso básico

### 1. Importar el componente

```typescript
import { SelectComponent } from '../components/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SelectComponent
  ],
  templateUrl: './my-page.component.html'
})
export class MyPageComponent {
  selectedValue = '';
  
  // O con FormControl
  myForm = new FormGroup({
    country: new FormControl('')
  });
}
```

### 2. Usar en el template

#### Ejemplo básico con ngModel

```html
<app-select 
  [(ngModel)]="selectedValue"
  placeholder="Selecciona una opción">
  <option value="option1">Opción 1</option>
  <option value="option2">Opción 2</option>
  <option value="option3">Opción 3</option>
</app-select>
```

#### Con Reactive Forms

```html
<form [formGroup]="myForm">
  <app-select 
    formControlName="country"
    placeholder="Selecciona un país">
    <option value="mx">México</option>
    <option value="us">Estados Unidos</option>
    <option value="ca">Canadá</option>
    <option value="es">España</option>
  </app-select>
</form>
```

#### Select pequeño (size="sm")

```html
<app-select 
  size="sm"
  [(ngModel)]="selectedValue"
  placeholder="Tamaño pequeño">
  <option value="1">Opción 1</option>
  <option value="2">Opción 2</option>
</app-select>
```

#### Con grupos de opciones

```html
<app-select 
  [(ngModel)]="selectedFruit"
  placeholder="Selecciona una fruta">
  <optgroup label="Frutas Tropicales" appSelectGroup>
    <option value="mango">Mango</option>
    <option value="papaya">Papaya</option>
    <option value="pineapple">Piña</option>
  </optgroup>
  
  <optgroup label="Frutas Cítricas" appSelectGroup>
    <option value="orange">Naranja</option>
    <option value="lemon">Limón</option>
    <option value="grapefruit">Toronja</option>
  </optgroup>
</app-select>
```

#### Select deshabilitado

```html
<app-select 
  [disabled]="true"
  placeholder="Select deshabilitado">
  <option value="1">No seleccionable</option>
</app-select>
```

#### Con validación

```html
<form [formGroup]="myForm">
  <div class="form-group">
    <label for="country">País *</label>
    <app-select 
      id="country"
      formControlName="country"
      placeholder="Selecciona tu país"
      [ariaInvalid]="myForm.get('country')?.invalid && myForm.get('country')?.touched">
      <option value="mx">México</option>
      <option value="us">Estados Unidos</option>
      <option value="ca">Canadá</option>
    </app-select>
    
    <div *ngIf="myForm.get('country')?.invalid && myForm.get('country')?.touched" 
         class="text-danger text-sm mt-1">
      Por favor selecciona un país
    </div>
  </div>
</form>

<!-- En el componente TypeScript -->
<!--
myForm = new FormGroup({
  country: new FormControl('', Validators.required)
});
-->
```

#### Opciones con valores complejos

```typescript
// En el componente
interface User {
  id: number;
  name: string;
}

users: User[] = [
  { id: 1, name: 'Juan' },
  { id: 2, name: 'María' },
  { id: 3, name: 'Pedro' }
];

selectedUserId = '';
```

```html
<app-select 
  [(ngModel)]="selectedUserId"
  placeholder="Selecciona un usuario">
  <option *ngFor="let user of users" [value]="user.id">
    {{ user.name }}
  </option>
</app-select>
```

#### Con clases personalizadas

```html
<app-select 
  className="border-primary shadow-sm"
  [(ngModel)]="selectedValue"
  placeholder="Select personalizado">
  <option value="1">Opción 1</option>
  <option value="2">Opción 2</option>
</app-select>
```

## Props

### SelectComponent

| Prop           | Tipo                  | Default               | Descripción                                      |
| -------------- | --------------------- | --------------------- | ------------------------------------------------ |
| `size`         | `'sm' \| 'default'`   | `'default'`           | Tamaño del select                                |
| `className`    | `string`              | `''`                  | Clases CSS adicionales                           |
| `placeholder`  | `string`              | `'Select an option'`  | Texto placeholder cuando no hay selección        |
| `disabled`     | `boolean`             | `false`               | Deshabilita el select                            |
| `ariaInvalid`  | `boolean \| null`     | `null`                | Marca el select como inválido para accesibilidad |

### Integración con formularios

El componente implementa `ControlValueAccessor`, por lo que funciona perfectamente con:
- `ngModel` (FormsModule)
- `formControl` y `formControlName` (ReactiveFormsModule)

```typescript
// Template-driven
<app-select [(ngModel)]="value"></app-select>

// Reactive
<app-select [formControl]="myControl"></app-select>
<app-select formControlName="fieldName"></app-select>
```

## Estilos

El componente incluye:
- Estilos consistentes con el sistema de diseño Bootstrap 5
- Icono de chevron personalizado (SVG inline)
- Estados de focus, hover, disabled e invalid
- Transiciones suaves
- Soporte para modo oscuro

### Variables CSS utilizadas

```css
--bs-border-color     /* Color del borde */
--bs-body-bg          /* Color de fondo */
--bs-primary          /* Color de focus */
--bs-primary-rgb      /* RGB del color primario para el ring */
--bs-danger           /* Color de estado inválido */
--bs-danger-rgb       /* RGB del color danger para el ring */
--bs-secondary-color  /* Color del texto placeholder */
```

## Características

- ✅ Integración completa con Angular Forms (ngModel, FormControl)
- ✅ Soporte para validación de formularios
- ✅ Estados: normal, focus, disabled, invalid
- ✅ Dos tamaños: default y small
- ✅ Grupos de opciones con `<optgroup>`
- ✅ Accesibilidad completa (ARIA attributes)
- ✅ Componentes standalone (no requieren NgModule)
- ✅ Select nativo del navegador (mejor rendimiento y accesibilidad)

## Diferencias con React/Radix UI

- **Select nativo**: Usa `<select>` nativo del navegador en lugar de un dropdown personalizado
- **Sin JavaScript complejo**: No requiere manejo de estado de apertura/cierre ni posicionamiento
- **Mejor accesibilidad**: El select nativo tiene toda la accesibilidad del navegador incluida
- **Más ligero**: No necesita Portal, Floating UI ni otras dependencias
- **Mobile-friendly**: En móviles usa el picker nativo del sistema operativo
- **Mejor rendimiento**: Menos JavaScript, más rápido

## Ventajas del enfoque nativo

1. **Accesibilidad garantizada**: Lectores de pantalla, navegación por teclado, etc.
2. **UX móvil nativa**: En iOS/Android usa los pickers nativos
3. **Sin dependencias**: No requiere Radix UI ni otras librerías
4. **Formularios nativos**: Funciona con validación HTML5
5. **Más rápido**: Menos JavaScript para parsear y ejecutar

## Cuándo usar este componente

- ✅ Listas de opciones simples a medianas (< 100 opciones)
- ✅ Formularios que requieren integración con Angular Forms
- ✅ Cuando la accesibilidad es crítica
- ✅ Aplicaciones móviles (mejor UX con select nativo)
- ✅ Cuando prefieres consistencia con el OS

## Cuándo NO usar (considera alternativas)

- ❌ Listas muy largas con búsqueda (usa un autocomplete)
- ❌ Necesitas multi-select complejo (usa checkbox list)
- ❌ Opciones con iconos, imágenes o HTML complejo
- ❌ Necesitas un dropdown completamente personalizado

## Ejemplo completo con validación

```typescript
// my-form.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SelectComponent } from '../components/select';

@Component({
  selector: 'app-my-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SelectComponent],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div class="mb-3">
        <label for="category" class="form-label">Categoría *</label>
        <app-select
          id="category"
          formControlName="category"
          placeholder="Selecciona una categoría"
          [ariaInvalid]="form.get('category')?.invalid && form.get('category')?.touched">
          <option value="tech">Tecnología</option>
          <option value="design">Diseño</option>
          <option value="marketing">Marketing</option>
        </app-select>
        
        <div *ngIf="form.get('category')?.invalid && form.get('category')?.touched"
             class="text-danger text-sm mt-1">
          La categoría es requerida
        </div>
      </div>
      
      <button type="submit" class="btn btn-primary" [disabled]="form.invalid">
        Enviar
      </button>
    </form>
  `
})
export class MyFormComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      category: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
    }
  }
}
```
