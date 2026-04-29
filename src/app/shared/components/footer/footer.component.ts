import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="footer">
      <div class="footer__inner">
        <div class="footer__brand">
          <span>⚖</span>
          <strong>LawStreet</strong>
          <p>Your trusted legal reference platform</p>
        </div>
        <div class="footer__links">
          <a routerLink="/privacy">Privacy Policy</a>
          <a routerLink="/terms">Terms of Use</a>
          <a routerLink="/about">About</a>
          <a routerLink="/contact">Contact</a>
        </div>
        <div class="footer__copy">© {{ year }} LawStreet. All rights reserved.</div>
      </div>
    </footer>
  `,
  styles: [`
    .footer { background: #1a3a5c; color: #cbd5e1; margin-top: auto; }
    .footer__inner { max-width: 1200px; margin: 0 auto; padding: 40px 24px 24px; }
    .footer__brand { display: flex; align-items: center; gap: 10px; margin-bottom: 20px;
      span { font-size: 1.4rem; }
      strong { color: #fff; font-size: 1.1rem; }
      p { font-size: 0.82rem; color: #94a3b8; margin-left: 8px; }
    }
    .footer__links { display: flex; gap: 24px; flex-wrap: wrap; margin-bottom: 24px;
      a { color: #94a3b8; text-decoration: none; font-size: 0.88rem; transition: color 0.18s; &:hover { color: #fff; } }
    }
    .footer__copy { font-size: 0.8rem; color: #64748b; border-top: 1px solid #2d4f6e; padding-top: 20px; }
  `]
})
export class FooterComponent {
  year = new Date().getFullYear();
}
