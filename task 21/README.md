# Shopping Cart — Angular Signals

A reactive shopping cart built entirely with Angular Signals (`signal`, `computed`, `effect`) — no RxJS, no NgRx, no manual change detection calls.

## How to run it

```bash
npm install
npm start
```

Then open the URL Angular prints (typically `http://localhost:4200`). Open the browser console to see the `Cart items count: N` log from the `effect()`.

> **Note:** built without network/registry access, so I couldn't `npm install`/`ng serve` this myself to see it run in a browser. What I did instead: type-checked `app.component.ts` in isolation (clean aside from the expected "Angular types aren't installed here" noise), and — more importantly — re-implemented a minimal `signal`/`computed`/`effect` and ran the *actual* `addToCart`/`removeFromCart`/`clearCart`/`totalPrice` logic from the component against it. That confirmed: totals recompute correctly after every add/remove, duplicate adds are ignored, removing a nonexistent id doesn't crash, `clearCart()` resets everything via `set()`, and the effect fires with the right cart-size sequence throughout. Still worth a real `ng serve` smoke test once Angular is installed.

## Where each required concept shows up (`app.component.ts`)

| Concept | Where |
|---|---|
| `signal()` | `cart = signal<Product[]>([])` |
| `update()` | `addToCart()` and `removeFromCart()` — both build a new array immutably (spread / `filter`) |
| `set()` | `clearCart()` — `this.cart.set([])` |
| `computed()` | `totalPrice = computed(() => this.cart().reduce(...))` |
| `effect()` | in the constructor — logs `Cart items count: N` every time `cart()` changes, including once on init |

## UI

- **Products panel** — static catalog, each with an "Add To Cart" button that disables itself (and reads "Added") once that product is in the cart, so `@for`'s `track product.id` always has unique keys.
- **Cart panel** — `@for` over `cart()`, each row with a "Remove" button; shows "Your cart is empty" via `@if` when the cart is empty.
- **Total** — live `totalPrice()`, formatted with Angular's `currency` pipe.
- **Clear Cart** — empties the cart via `set([])`.

## Structure

```
shopping-cart-signals/
├── src/
│   ├── app/
│   │   ├── app.component.ts     — signals, computed, effect, cart logic
│   │   ├── app.component.html   — @for / @if template
│   │   ├── app.component.css
│   │   └── models/
│   │       └── product.model.ts
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── angular.json
├── package.json
├── tsconfig.json
└── tsconfig.app.json
```
