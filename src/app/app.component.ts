import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isHomePage  = false;
  isAdminPage = false;
  isAuthPage  = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e: any) => {
      this.isHomePage  = e.urlAfterRedirects === '/';
      this.isAdminPage = e.urlAfterRedirects.startsWith('/admin');
      this.isAuthPage  = e.urlAfterRedirects.startsWith('/auth');
    });
  }
}
