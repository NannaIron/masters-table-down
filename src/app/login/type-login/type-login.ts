import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, UserType } from '../../../services/auth.service';

@Component({
  selector: 'app-type-login',
  imports: [NgFor, NgIf],
  templateUrl: './type-login.html',
  styleUrl: './type-login.scss',
})
export class TypeLogin {
  @Input() token = '';
  @Input() types: UserType[] = [];
  @Output() closeEvent = new EventEmitter<void>();

  error = false;
  loading = false;

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  select(type: UserType): void {
    this.error = false;
    this.loading = true;
    this.auth.typeLogin(this.token, type).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.loading = false;
        this.error = true;
      },
    });
  }

  close(): void {
    this.closeEvent.emit();
  }
}
