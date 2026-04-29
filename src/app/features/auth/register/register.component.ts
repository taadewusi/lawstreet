import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form = { username: '', email: '', password: '', firstName: '', lastName: '' };
  loading = false;
  error = '';
  success = false;

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    if (Object.values(this.form).some(v => !v)) { this.error = 'Please fill in all fields.'; return; }
    this.loading = true; this.error = '';
    this.auth.register(this.form).subscribe({
      next: () => { this.loading = false; this.success = true; setTimeout(() => this.router.navigate(['/auth/login']), 2000); },
      error: (err) => { this.loading = false; this.error = err.error?.message || 'Registration failed.'; }
    });
  }
}
