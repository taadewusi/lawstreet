# ⚖ LexSearch — Angular Law Search Application

A full-featured Angular 17 frontend for searching and managing Nigerian laws and legislation.  
Modelled after Google Search's homepage UX with a clean, professional admin panel.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── core/
│   │   ├── guards/
│   │   │   └── auth.guard.ts            # Route protection by role
│   │   ├── interceptors/
│   │   │   └── auth.interceptor.ts      # Attaches JWT to every HTTP request
│   │   ├── models/
│   │   │   ├── api-response.model.ts    # Generic API + Paginated response types
│   │   │   ├── law.model.ts             # Law, LawCreateRequest interfaces
│   │   │   └── user.model.ts            # User, Role, LoginRequest/Response interfaces
│   │   └── services/
│   │       ├── auth.service.ts          # Login, register, logout, JWT state
│   │       ├── law.service.ts           # Search, CRUD for laws
│   │       ├── role.service.ts          # CRUD for roles & permissions
│   │       └── user.service.ts          # User listing, activate/deactivate, role assign
│   │
│   ├── shared/
│   │   └── components/
│   │       ├── navbar/                  # Top navigation bar with login button
│   │       └── footer/                  # Site-wide footer
│   │
│   ├── features/
│   │   ├── home/                        # Google-style search homepage
│   │   ├── search-results/              # Results list with sidebar filters
│   │   ├── law-detail/                  # Full law detail view
│   │   ├── auth/
│   │   │   ├── login/                   # Sign-in form
│   │   │   └── register/                # Registration form
│   │   └── admin/
│   │       ├── dashboard/               # Admin shell layout + home overview
│   │       ├── laws/                    # Create / edit / delete laws
│   │       ├── roles/                   # Create / edit / delete roles & permissions
│   │       └── users/                   # View users, activate/deactivate
│   │
│   ├── app-routing.module.ts            # All application routes
│   └── app.module.ts                    # Root NgModule
│
├── environments/
│   ├── environment.ts                   # Dev: points to localhost:8080
│   └── environment.prod.ts              # Prod: update with your real API URL
│
└── styles.scss                          # Global design system (tokens, utilities)
```

---

## 🚀 How to Run the Application

### Prerequisites

| Tool | Minimum Version | Install |
|------|----------------|---------|
| Node.js | 18.x or 20.x | https://nodejs.org |
| npm | 9.x+ | Comes with Node |
| Angular CLI | 17.x | `npm install -g @angular/cli` |

Check your versions:
```bash
node --version
npm --version
ng version
```

---

### Step 1 — Clone / Download the project

If you downloaded the ZIP, extract it. Then open a terminal in the project folder:
```bash
cd law-search-app
```

---

### Step 2 — Install dependencies

```bash
npm install
```

This installs all Angular packages listed in `package.json`. Takes 1–3 minutes on first run.

---

### Step 3 — Configure your API URL

Open `src/environments/environment.ts` and set your backend URL:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api/v1'   // ← change this to match your backend
};
```

> **Expected API endpoints the frontend calls:**
> - `POST   /api/v1/auth/login`
> - `POST   /api/v1/auth/register`
> - `GET    /api/v1/laws/search?query=&category=&page=`
> - `GET    /api/v1/laws/:id`
> - `POST   /api/v1/laws`
> - `PUT    /api/v1/laws/:id`
> - `DELETE /api/v1/laws/:id`
> - `GET    /api/v1/roles`
> - `POST   /api/v1/roles`
> - `PUT    /api/v1/roles/:id`
> - `DELETE /api/v1/roles/:id`
> - `GET    /api/v1/users`
> - `PATCH  /api/v1/users/:id/activate`
> - `PATCH  /api/v1/users/:id/deactivate`

---

### Step 4 — Run the development server

```bash
ng serve
```

The app will start at: **http://localhost:4200**

The browser auto-reloads when you save any file.

---

### Step 5 — (Optional) Run with a different port

```bash
ng serve --port 4201
```

---

### Step 6 — Build for production

```bash
ng build --configuration production
```

Output goes to `dist/law-search-app/`. Deploy those files to any static host (Nginx, Apache, Netlify, Vercel, Firebase Hosting).

---

## 🗺 Application Pages & Routes

| Route | Page | Auth Required |
|-------|------|--------------|
| `/` | Home — Google-style search page | No |
| `/search?q=...` | Search results with filter sidebar | No |
| `/law/:id` | Full law detail view | No |
| `/auth/login` | Sign-in form | No |
| `/auth/register` | Registration form | No |
| `/admin` | Admin dashboard overview | ADMIN role |
| `/admin/laws` | Create / edit / delete laws | ADMIN role |
| `/admin/roles` | Manage roles & permissions | ADMIN role |
| `/admin/users` | View & manage users | ADMIN role |

---

## 🔐 Authentication Flow

1. User clicks **Sign In** (top-right corner on all non-home pages).
2. Credentials are posted to `/api/v1/auth/login`.
3. The backend returns `{ accessToken, refreshToken, user }`.
4. Token is stored in `localStorage` and automatically attached to every subsequent request via `AuthInterceptor`.
5. If the user has `ADMIN` or `SUPER_ADMIN` role, they see the **Admin** nav link and can access `/admin/*` routes.
6. 401 responses automatically log the user out and redirect to login.

---

## 🔧 Key Services

### `AuthService`
```typescript
auth.login({ username, password })   // returns Observable<LoginResponse>
auth.logout()                         // clears storage, redirects to /
auth.isAuthenticated                  // boolean
auth.currentUser                      // User | null
auth.isAdmin()                        // true if ADMIN or SUPER_ADMIN role
auth.hasRole('EDITOR')                // check specific role
```

### `LawService`
```typescript
lawService.searchLaws({ query, category, jurisdiction, status, page, pageSize })
lawService.getLawById(id)
lawService.createLaw(lawCreateRequest)
lawService.updateLaw(id, partial)
lawService.deleteLaw(id)
```

### `RoleService`
```typescript
roleService.getAllRoles()
roleService.createRole({ name, description, permissions })
roleService.updateRole(id, partial)
roleService.deleteRole(id)
```

### `UserService`
```typescript
userService.getAllUsers(page, pageSize)
userService.activateUser(id)
userService.deactivateUser(id)
userService.assignRole(userId, roleId)
```

---

## 🎨 Design System

All design tokens are in `src/styles.scss`:

| Token | Value | Use |
|-------|-------|-----|
| `--primary` | `#1a3a5c` | Navy blue — main brand colour |
| `--primary-light` | `#2563a8` | Hover / accent |
| `--accent` | `#c8972a` | Gold accent |
| `--bg` | `#f8f7f4` | Off-white page background |
| `--border` | `#e5e7eb` | All borders |

Global utility classes: `.btn`, `.btn--primary`, `.btn--outline`, `.btn--danger`, `.btn--sm`, `.card`, `.badge`, `.badge--active`, `.badge--repealed`, `.badge--amended`, `.alert`, `.alert--error`, `.alert--success`, `.data-table`, `.pagination`, `.loading-spinner`, `.empty-state`, `.page-header`, `.form-group`

---

## 🔄 Connecting to a Spring Boot backend

If your backend is Spring Boot, ensure you enable CORS:

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
            .allowedOrigins("http://localhost:4200")
            .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
            .allowedHeaders("*")
            .allowCredentials(true);
    }
}
```

---

## 📦 Extending the Application

### Add a new admin page (e.g. Reports)

1. Create folder: `src/app/features/admin/reports/`
2. Create `reports.component.ts`, `.html`, `.scss`
3. Add component to `AppModule` declarations
4. Add route in `app-routing.module.ts` under the admin children
5. Add nav link in `dashboard.component.html`

### Add a new service

Create `src/app/core/services/my-entity.service.ts`, inject `HttpClient`, call `environment.apiUrl`.  
All services are `providedIn: 'root'` — no need to add to any module.

---

## 🐛 Troubleshooting

| Problem | Fix |
|---------|-----|
| `ng: command not found` | Run `npm install -g @angular/cli` then retry |
| `CORS error` in browser | Add CORS config to your backend (see above) |
| `401 Unauthorized` on all requests | Check your token / login endpoint response shape matches `LoginResponse` interface |
| Blank page at `/admin` | Make sure your login API returns `roles: ['ADMIN']` in the user object |
| `Cannot find module` errors | Run `npm install` again |
| Port 4200 already in use | Run `ng serve --port 4201` |

---

*Built with Angular 17 · TypeScript · SCSS · No external UI library dependencies*
