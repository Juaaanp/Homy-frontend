# Table Components

A set of table components for displaying tabular data in Angular. This is a complete Angular adaptation of the React Shadcn/UI Table components.

## Features

- 📊 **Semantic HTML**: Uses proper table elements
- 🎨 **Styled Components**: Pre-styled table parts
- 📱 **Responsive**: Horizontal scroll on mobile
- 🎯 **Composable**: Build custom table layouts
- ♿ **Accessible**: Semantic HTML5 table structure
- 🎭 **Hover Effects**: Row hover states
- ✅ **Selectable Rows**: Support for row selection
- 📦 **Standalone**: All components are standalone

## Installation

The components are already included in your project under `src/app/components/table/`.

```typescript
import {
  TableComponent,
  TableHeaderComponent,
  TableBodyComponent,
  TableFooterComponent,
  TableRowComponent,
  TableHeadComponent,
  TableCellComponent,
  TableCaptionComponent
} from '@/app/components/table';
```

## Basic Usage

```html
<app-table>
  <app-table-caption>A list of your recent invoices.</app-table-caption>
  
  <app-table-header>
    <app-table-row>
      <app-table-head>Invoice</app-table-head>
      <app-table-head>Status</app-table-head>
      <app-table-head>Method</app-table-head>
      <app-table-head>Amount</app-table-head>
    </app-table-row>
  </app-table-header>
  
  <app-table-body>
    <app-table-row *ngFor="let invoice of invoices">
      <app-table-cell>{{ invoice.id }}</app-table-cell>
      <app-table-cell>{{ invoice.status }}</app-table-cell>
      <app-table-cell>{{ invoice.method }}</app-table-cell>
      <app-table-cell>{{ invoice.amount | currency }}</app-table-cell>
    </app-table-row>
  </app-table-body>
</app-table>
```

```typescript
export class InvoicesComponent {
  invoices = [
    { id: 'INV001', status: 'Paid', method: 'Credit Card', amount: 250.00 },
    { id: 'INV002', status: 'Pending', method: 'PayPal', amount: 150.00 },
    { id: 'INV003', status: 'Unpaid', method: 'Bank Transfer', amount: 350.00 }
  ];
}
```

## Components

### Table (Container)

Wraps the table in a scrollable container.

```html
<app-table [className]="'custom-class'">
  <!-- table content -->
</app-table>
```

### TableHeader

Table header section (`<thead>`).

```html
<app-table-header>
  <app-table-row>
    <app-table-head>Column 1</app-table-head>
    <app-table-head>Column 2</app-table-head>
  </app-table-row>
</app-table-header>
```

### TableBody

Table body section (`<tbody>`).

```html
<app-table-body>
  <app-table-row *ngFor="let item of items">
    <app-table-cell>{{ item.data }}</app-table-cell>
  </app-table-row>
</app-table-body>
```

### TableFooter

Table footer section (`<tfoot>`).

```html
<app-table-footer>
  <app-table-row>
    <app-table-cell>Total</app-table-cell>
    <app-table-cell>{{ total | currency }}</app-table-cell>
  </app-table-row>
</app-table-footer>
```

### TableRow

Table row with hover effect.

```html
<app-table-row [selected]="item.isSelected">
  <!-- cells -->
</app-table-row>
```

**Props:**
- `className?: string` - Additional CSS classes
- `selected?: boolean` - Selected state

### TableHead

Table header cell (`<th>`).

```html
<app-table-head [className]="'text-right'">
  Price
</app-table-head>
```

### TableCell

Table data cell (`<td>`).

```html
<app-table-cell>
  {{ data }}
</app-table-cell>
```

### TableCaption

Table caption for accessibility.

```html
<app-table-caption>
  List of products in inventory.
</app-table-caption>
```

## Complete Examples

### User List

```html
<app-table>
  <app-table-caption>A list of users in your organization.</app-table-caption>
  
  <app-table-header>
    <app-table-row>
      <app-table-head>Name</app-table-head>
      <app-table-head>Email</app-table-head>
      <app-table-head>Role</app-table-head>
      <app-table-head>Status</app-table-head>
    </app-table-row>
  </app-table-header>
  
  <app-table-body>
    <app-table-row *ngFor="let user of users">
      <app-table-cell>
        <div class="d-flex align-items-center gap-2">
          <img [src]="user.avatar" class="rounded-circle" width="32" height="32">
          <span class="fw-medium">{{ user.name }}</span>
        </div>
      </app-table-cell>
      <app-table-cell>{{ user.email }}</app-table-cell>
      <app-table-cell>
        <span class="badge bg-secondary">{{ user.role }}</span>
      </app-table-cell>
      <app-table-cell>
        <span [class]="'badge ' + getStatusBadge(user.status)">
          {{ user.status }}
        </span>
      </app-table-cell>
    </app-table-row>
  </app-table-body>
</app-table>
```

### Products with Actions

```html
<app-table>
  <app-table-header>
    <app-table-row>
      <app-table-head>Product</app-table-head>
      <app-table-head>SKU</app-table-head>
      <app-table-head>Price</app-table-head>
      <app-table-head>Stock</app-table-head>
      <app-table-head>Actions</app-table-head>
    </app-table-row>
  </app-table-header>
  
  <app-table-body>
    <app-table-row *ngFor="let product of products">
      <app-table-cell>{{ product.name }}</app-table-cell>
      <app-table-cell>{{ product.sku }}</app-table-cell>
      <app-table-cell>{{ product.price | currency }}</app-table-cell>
      <app-table-cell>
        <span [class]="product.stock > 10 ? 'text-success' : 'text-danger'">
          {{ product.stock }}
        </span>
      </app-table-cell>
      <app-table-cell>
        <button class="btn btn-sm btn-outline-primary me-1" (click)="edit(product)">
          Edit
        </button>
        <button class="btn btn-sm btn-outline-danger" (click)="delete(product)">
          Delete
        </button>
      </app-table-cell>
    </app-table-row>
  </app-table-body>
  
  <app-table-footer>
    <app-table-row>
      <app-table-cell [className]="'fw-bold'">Total</app-table-cell>
      <app-table-cell></app-table-cell>
      <app-table-cell [className]="'fw-bold'">
        {{ getTotalPrice() | currency }}
      </app-table-cell>
      <app-table-cell [className]="'fw-bold'">
        {{ getTotalStock() }}
      </app-table-cell>
      <app-table-cell></app-table-cell>
    </app-table-row>
  </app-table-footer>
</app-table>
```

### Sortable Table

```html
<app-table>
  <app-table-header>
    <app-table-row>
      <app-table-head>
        <button class="btn btn-link p-0 text-decoration-none" (click)="sort('name')">
          Name
          <span *ngIf="sortColumn === 'name'">
            {{ sortDirection === 'asc' ? '↑' : '↓' }}
          </span>
        </button>
      </app-table-head>
      <app-table-head>
        <button class="btn btn-link p-0 text-decoration-none" (click)="sort('email')">
          Email
          <span *ngIf="sortColumn === 'email'">
            {{ sortDirection === 'asc' ? '↑' : '↓' }}
          </span>
        </button>
      </app-table-head>
      <app-table-head>
        <button class="btn btn-link p-0 text-decoration-none" (click)="sort('date')">
          Date
          <span *ngIf="sortColumn === 'date'">
            {{ sortDirection === 'asc' ? '↑' : '↓' }}
          </span>
        </button>
      </app-table-head>
    </app-table-row>
  </app-table-header>
  
  <app-table-body>
    <app-table-row *ngFor="let item of sortedData">
      <app-table-cell>{{ item.name }}</app-table-cell>
      <app-table-cell>{{ item.email }}</app-table-cell>
      <app-table-cell>{{ item.date | date }}</app-table-cell>
    </app-table-row>
  </app-table-body>
</app-table>
```

```typescript
export class SortableTableComponent {
  data = [...];
  sortColumn = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';

  get sortedData() {
    return [...this.data].sort((a, b) => {
      const aVal = a[this.sortColumn];
      const bVal = b[this.sortColumn];
      const modifier = this.sortDirection === 'asc' ? 1 : -1;
      return aVal > bVal ? modifier : -modifier;
    });
  }

  sort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }
}
```

### Selectable Rows

```html
<app-table>
  <app-table-header>
    <app-table-row>
      <app-table-head>
        <input 
          type="checkbox" 
          role="checkbox"
          [checked]="allSelected"
          (change)="toggleAll($event)">
      </app-table-head>
      <app-table-head>Name</app-table-head>
      <app-table-head>Email</app-table-head>
      <app-table-head>Role</app-table-head>
    </app-table-row>
  </app-table-header>
  
  <app-table-body>
    <app-table-row 
      *ngFor="let user of users"
      [selected]="user.selected">
      <app-table-cell>
        <input 
          type="checkbox" 
          role="checkbox"
          [(ngModel)]="user.selected"
          (change)="onSelectionChange()">
      </app-table-cell>
      <app-table-cell>{{ user.name }}</app-table-cell>
      <app-table-cell>{{ user.email }}</app-table-cell>
      <app-table-cell>{{ user.role }}</app-table-cell>
    </app-table-row>
  </app-table-body>
</app-table>

<div class="mt-2" *ngIf="selectedCount > 0">
  {{ selectedCount }} row(s) selected
</div>
```

```typescript
export class SelectableTableComponent {
  users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', selected: false },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', selected: false }
  ];

  get allSelected(): boolean {
    return this.users.length > 0 && this.users.every(u => u.selected);
  }

  get selectedCount(): number {
    return this.users.filter(u => u.selected).length;
  }

  toggleAll(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.users.forEach(u => u.selected = checked);
  }

  onSelectionChange(): void {
    console.log('Selected:', this.users.filter(u => u.selected));
  }
}
```

### Loading State

```html
<app-table>
  <app-table-header>
    <app-table-row>
      <app-table-head>Name</app-table-head>
      <app-table-head>Email</app-table-head>
      <app-table-head>Status</app-table-head>
    </app-table-row>
  </app-table-header>
  
  <app-table-body>
    @if (loading) {
      <app-table-row *ngFor="let i of [1,2,3,4,5]">
        <app-table-cell><app-skeleton [className]="'w-100'"></app-skeleton></app-table-cell>
        <app-table-cell><app-skeleton [className]="'w-100'"></app-skeleton></app-table-cell>
        <app-table-cell><app-skeleton [className]="'w-50'"></app-skeleton></app-table-cell>
      </app-table-row>
    } @else if (data.length === 0) {
      <app-table-row>
        <app-table-cell [attr.colspan]="3" [className]="'text-center text-muted'">
          No data available
        </app-table-cell>
      </app-table-row>
    } @else {
      <app-table-row *ngFor="let item of data">
        <app-table-cell>{{ item.name }}</app-table-cell>
        <app-table-cell>{{ item.email }}</app-table-cell>
        <app-table-cell>{{ item.status }}</app-table-cell>
      </app-table-row>
    }
  </app-table-body>
</app-table>
```

### Pagination

```html
<app-table>
  <app-table-header>
    <app-table-row>
      <app-table-head>ID</app-table-head>
      <app-table-head>Name</app-table-head>
      <app-table-head>Email</app-table-head>
    </app-table-row>
  </app-table-header>
  
  <app-table-body>
    <app-table-row *ngFor="let item of paginatedData">
      <app-table-cell>{{ item.id }}</app-table-cell>
      <app-table-cell>{{ item.name }}</app-table-cell>
      <app-table-cell>{{ item.email }}</app-table-cell>
    </app-table-row>
  </app-table-body>
</app-table>

<div class="d-flex justify-content-between align-items-center mt-3">
  <div class="text-muted small">
    Showing {{ startIndex + 1 }} to {{ endIndex }} of {{ totalItems }} entries
  </div>
  <nav>
    <ul class="pagination mb-0">
      <li class="page-item" [class.disabled]="currentPage === 1">
        <button class="page-link" (click)="goToPage(currentPage - 1)">Previous</button>
      </li>
      <li 
        class="page-item" 
        *ngFor="let page of pages"
        [class.active]="page === currentPage">
        <button class="page-link" (click)="goToPage(page)">{{ page }}</button>
      </li>
      <li class="page-item" [class.disabled]="currentPage === totalPages">
        <button class="page-link" (click)="goToPage(currentPage + 1)">Next</button>
      </li>
    </ul>
  </nav>
</div>
```

```typescript
export class PaginatedTableComponent {
  data = [...]; // All data
  currentPage = 1;
  itemsPerPage = 10;

  get totalItems(): number {
    return this.data.length;
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get endIndex(): number {
    return Math.min(this.startIndex + this.itemsPerPage, this.totalItems);
  }

  get paginatedData() {
    return this.data.slice(this.startIndex, this.endIndex);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}
```

## Styling

### Custom Classes

```html
<!-- Striped rows -->
<app-table [className]="'table-striped'">
  <!-- content -->
</app-table>

<!-- Bordered -->
<app-table [className]="'table-bordered'">
  <!-- content -->
</app-table>

<!-- Hover -->
<app-table [className]="'table-hover'">
  <!-- content -->
</app-table>
```

### Right-aligned Columns

```html
<app-table-head [className]="'text-end'">Price</app-table-head>
<app-table-cell [className]="'text-end'">{{ price | currency }}</app-table-cell>
```

## Accessibility

- Uses semantic HTML table elements
- Proper `<thead>`, `<tbody>`, `<tfoot>` structure
- Caption for screen readers
- Checkbox `role="checkbox"` for selection

## Responsive Design

The table automatically scrolls horizontally on small screens:

```css
/* Automatically applied by TableComponent */
.table-container {
  overflow-x: auto;
}
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android 90+)

## Notes

- The table container provides horizontal scroll on mobile
- Row hover effects are built-in
- Selected state styling is automatic
- Works great with Bootstrap utility classes
- All components are standalone

## License

MIT
