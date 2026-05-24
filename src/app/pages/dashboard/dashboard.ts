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
  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

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
