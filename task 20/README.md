# Team Manager (Angular)

A small team-management dashboard built with Angular standalone components and the new `@for` / `@if` / `@switch` control-flow syntax.

## How to run it

```bash
npm install
npm start
```

Then open the URL Angular prints (typically `http://localhost:4200`).

> **Note:** this project was built without network/registry access, so I could not run `npm install` or `ng serve` myself to verify it live. I did compile and execute the component's state-management logic (validation, filtering, add/toggle, form reset) standalone with `tsc`/`node` to confirm it behaves correctly, and type-checked `app.component.ts` itself — but you should still do a normal `ng serve` smoke test once you have Angular installed, in case anything in the CLI/build config needs adjusting for the exact Angular version you have.

## What's implemented

- **Display team members** — name, age, department, availability, in both Card and List view.
- **Add member form** — name/age/department/availability, with validation (required name, age between 1–100, department required) and inline error messages; form clears after a successful add.
- **Department filter** — All / Development / Marketing / Design, driven by `@for` over the `departments` array plus an `@if` block for the "no matches" empty state.
- **View switcher** — Card vs. List, implemented with `@switch` / `@case`.
- **Toggle availability** — a button per member (in both views) flips `available` on that member only.
- **Bonus requirements covered:**
  - Empty state when there are zero members at all, and a separate empty state when the filter matches none.
  - Card styling differs for available (green accent) vs. unavailable (red accent) members; same color coding applied to list rows.
  - Inline validation messages under each invalid field.

## Structure

```
team-manager/
├── src/
│   ├── app/
│   │   ├── app.component.ts     — state, validation, filtering, toggle logic
│   │   ├── app.component.html   — template using @for / @if / @switch
│   │   ├── app.component.css
│   │   └── models/
│   │       └── team-member.model.ts
│   ├── index.html
│   ├── main.ts                  — bootstraps the standalone AppComponent
│   └── styles.css
├── angular.json
├── package.json
├── tsconfig.json
└── tsconfig.app.json
```
