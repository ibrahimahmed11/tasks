import { Component, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  // Static product catalog — not a signal, since it never changes at runtime.
  availableProducts: Product[] = [
    { id: 1, name: 'Wireless Mouse', price: 19.99 },
    { id: 2, name: 'Mechanical Keyboard', price: 59.99 },
    { id: 3, name: 'USB-C Hub', price: 24.5 },
    { id: 4, name: 'Laptop Stand', price: 34.0 },
    { id: 5, name: 'Webcam 1080p', price: 45.75 },
  ];

  // --- Reactive state ---

  /** Products currently in the cart. Starts empty. */
  cart = signal<Product[]>([]);

  /** Derived value — recalculates automatically whenever cart() changes. */
  totalPrice = computed(() => this.cart().reduce((sum, product) => sum + product.price, 0));

  constructor() {
    // Side effect — logs the cart size every time cart() changes,
    // including once immediately on init.
    effect(() => {
      console.log(`Cart items count: ${this.cart().length}`);
    });
  }

  /**
   * Adds a product to the cart using update(), so the new array is built
   * immutably from the previous one. Guards against adding the same
   * product twice (keeps @for's `track product.id` meaningful, and keeps
   * "Remove" acting on a single, unambiguous item).
   */
  addToCart(product: Product): void {
    if (this.isInCart(product.id)) {
      return;
    }
    this.cart.update((items) => [...items, product]);
  }

  /** Removes a single product from the cart by id, using update(). */
  removeFromCart(id: number): void {
    this.cart.update((items) => items.filter((product) => product.id !== id));
  }

  /** Empties the cart entirely using set(). */
  clearCart(): void {
    this.cart.set([]);
  }

  /** Whether a given product is already in the cart. */
  isInCart(id: number): boolean {
    return this.cart().some((product) => product.id === id);
  }
}
