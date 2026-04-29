import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Core
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

// Shared
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';

// Features - Public
import { HomeComponent } from './features/home/home.component';
import { SearchResultsComponent } from './features/search-results/search-results.component';
import { LawDetailComponent } from './features/law-detail/law-detail.component';

// Features - Auth
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';

// Features - Admin
import { AdminDashboardComponent } from './features/admin/dashboard/dashboard.component';
import { AdminHomeComponent } from './features/admin/dashboard/admin-home.component';
import { AdminLawsComponent } from './features/admin/laws/laws.component';
import { AdminRolesComponent } from './features/admin/roles/roles.component';
import { AdminUsersComponent } from './features/admin/users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    SearchResultsComponent,
    LawDetailComponent,
    LoginComponent,
    RegisterComponent,
    AdminDashboardComponent,
    AdminHomeComponent,
    AdminLawsComponent,
    AdminRolesComponent,
    AdminUsersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
