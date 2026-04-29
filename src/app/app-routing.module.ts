import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { SearchResultsComponent } from './features/search-results/search-results.component';
import { LawDetailComponent } from './features/law-detail/law-detail.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { AdminDashboardComponent } from './features/admin/dashboard/dashboard.component';
import { AdminHomeComponent } from './features/admin/dashboard/admin-home.component';
import { AdminLawsComponent } from './features/admin/laws/laws.component';
import { AdminRolesComponent } from './features/admin/roles/roles.component';
import { AdminUsersComponent } from './features/admin/users/users.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search', component: SearchResultsComponent },
  { path: 'law/:uid', component: LawDetailComponent },
  {
    path: 'auth',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN', 'SUPER_ADMIN'] },
    children: [
      { path: '', component: AdminHomeComponent },
      { path: 'laws', component: AdminLawsComponent },
      { path: 'roles', component: AdminRolesComponent },
      { path: 'users', component: AdminUsersComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
