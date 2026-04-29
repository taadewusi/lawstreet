import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  user$: Observable<User | null>;
  userMenuOpen = false;

  constructor(public auth: AuthService, private router: Router) {
    this.user$ = this.auth.user$;
  }

  logout() { this.auth.logout(); this.userMenuOpen = false; }
}
