# EventHive — Event Discovery & Ticket Booking Platform

## 1. Project Name

**EventHive**

---

## 2. Project Description

EventHive is a full-stack platform where event organizers can publish and manage events (concerts, workshops, meetups, conferences), and attendees can discover events, book tickets, and manage their bookings in one place.

**Problem it solves:** Small and mid-size organizers currently juggle spreadsheets, social media posts, and third-party booking links to sell tickets, while attendees have to check multiple sources to find events worth attending. EventHive centralizes discovery, ticketing, and attendee management in a single application.

**Target users:**
- **Event organizers** — individuals or businesses who run events and need a simple way to publish listings, sell tickets, and see who's coming.
- **Attendees** — people looking to discover and book events near them.
- **Platform administrators** — staff who keep the marketplace trustworthy (approving organizers, moderating listings).

**Main purpose:** Give organizers a self-service tool to publish and sell out events, and give attendees a fast, trustworthy way to find and book them.

---

## 3. Users and Roles

| Role | Permissions | Available Actions |
|---|---|---|
| **Admin** | Full platform oversight | Approve/reject organizer applications · manage all user accounts and roles · remove events or reviews that violate policy · manage event categories · view platform-wide analytics |
| **Organizer** | Manage own events only | Create/edit/delete own events · define ticket types & pricing · upload event banner images · view attendee list & ticket sales for own events · respond to reviews on own events |
| **Attendee** | Manage own bookings & profile | Browse/search/filter events · book tickets · manage own profile & profile picture · view booking history and download tickets · leave a review after attending an event |

**Role acquisition:** Everyone registers as an Attendee by default. An Attendee can submit an "Become an Organizer" application (with a verification document); an Admin reviews it and upgrades the account's role on approval.

---

## 4. Main Features

### 4.1 Authentication Features
- Register (defaults to Attendee role)
- Login / Logout
- Forgot password / reset password via emailed link
- Email verification on signup
- Session handling via JWT (access + refresh token)
- "Become an Organizer" application flow (submits a document for admin review)

### 4.2 Authorization Features
- Role-based access control (Admin / Organizer / Attendee)
- Protected routes: `/admin/*` restricted to Admin, `/organizer/*` restricted to Organizer
- Resource-level authorization: an Organizer can only edit/delete **their own** events and ticket types, not another organizer's
- Unauthenticated users are redirected to Login when hitting a protected page
- API middleware validates both authentication (valid token) and authorization (correct role/ownership) on every protected endpoint

### 4.3 CRUD Features

**Events** *(Organizer manages own; Admin can moderate any; Public reads published ones)*
- Create: publish a new event (title, description, date/time, location, category, banner image)
- Read: browse all published events; view single event details
- Update: edit event details (only the owning organizer)
- Delete: remove an event (owning organizer, or Admin for policy violations)

**Ticket Types** *(scoped to a single event, e.g. "General", "VIP")*
- Create: add a ticket type with name, price, and quantity available
- Read: list ticket types on an event's page
- Update: edit price/quantity before sales close
- Delete: remove a ticket type that hasn't sold yet

**Bookings**
- Create: attendee books one or more tickets for an event
- Read: attendee views their own booking history; organizer views bookings for their own events; admin views all bookings
- Update: cancel a booking (attendee, subject to the event's cancellation window)
- Delete: N/A — cancelled bookings are kept as records with a "cancelled" status rather than hard-deleted

**Users** *(Admin only, plus self-service profile editing)*
- Read: Admin views the full user list; any user views/edits their own profile
- Update: Admin changes a user's role or suspends an account; users update their own profile (name, bio, profile picture)
- Delete: Admin removes an account

**Reviews**
- Create: attendee leaves a rating + comment after attending an event
- Read: public, shown on the event details page
- Update/Delete: the attendee who wrote it can edit or remove it; Admin can remove reviews that violate policy

**Categories** *(Admin only; used for filtering)*
- Create/Update/Delete categories (e.g. Music, Tech, Sports, Workshops)
- Read: public, used to populate filters

### 4.4 Other Notable Features
- Search and filter events by category, date range, price, and location
- Admin dashboard with platform-wide stats (total events, bookings, active organizers)
- Organizer dashboard with per-event sales overview

---

## 5. Image / File Upload Features

| Upload | Allowed Types | Max Size | Uploaded By |
|---|---|---|---|
| Event banner image | JPG, PNG, WEBP | 5 MB | Organizer |
| Profile picture | JPG, PNG | 2 MB | Any authenticated user |
| Organizer verification document (ID or business registration) | PDF, JPG, PNG | 10 MB | Attendee (during "Become an Organizer" application) — reviewed by Admin |

---

## 6–7. UI Design

Low-fidelity wireframes for the core screens are provided as an interactive HTML file (`eventhive-wireframes.html`) alongside this document, covering:

1. **Home / Event Listing page** — hero + search bar, category filter chips, event card grid, pagination
2. **Event Details page** — banner image, description, date/location, ticket type selector, "Book Now", reviews section
3. **Login / Register page** — auth form, role note, link to switch between the two
4. **Organizer Dashboard** — sidebar nav, "My Events" table (status + sales), Add Event button, per-event ticket sales summary
5. **Admin Dashboard** — sidebar nav, organizer application queue (approve/reject), user management table, event moderation table

Each wireframe calls out its layout regions, components, and primary actions so it can be traced directly into Figma/Adobe XD for a high-fidelity pass if your submission requires an actual design-tool link.

---

## 8. Features Checklist (Submission Summary)

```
Authentication:
✓ Register
✓ Login / Logout
✓ Forgot / reset password
✓ Email verification
✓ JWT-based sessions

Authorization:
✓ Role-based access control (Admin / Organizer / Attendee)
✓ Protected routes per role
✓ Resource-level ownership checks (organizer can only edit own events)
✓ Admin dashboard

CRUD:
✓ Events (Organizer, Admin moderation)
✓ Ticket types (Organizer)
✓ Bookings (Attendee, Organizer/Admin read)
✓ Users (Admin)
✓ Reviews (Attendee)
✓ Categories (Admin)

Upload:
✓ Event banner images
✓ Profile pictures
✓ Organizer verification documents
```
