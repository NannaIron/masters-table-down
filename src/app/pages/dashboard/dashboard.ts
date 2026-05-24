import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  bg = '#1a1612';

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  changeBg(): void {
    this.bg = this.bg === '#1a1612' ? 'black' : '#1a1612';
  }

  logout(): void {
    const token = localStorage.getItem('token') ?? '';
    this.auth.logout(token).subscribe({
      next: () => {
        localStorage.removeItem('token');
        this.router.navigate(['/']);
      },
      error: () => {
        localStorage.removeItem('token');
        this.router.navigate(['/']);
      },
    });
  }
}
