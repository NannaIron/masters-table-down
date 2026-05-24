import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService, UserType } from '../../../services/auth.service';
import { TypeLogin } from '../type-login/type-login';

@Component({
  selector: 'app-teste-login',
  imports: [FormsModule, NgIf, TypeLogin],
  templateUrl: './teste-login.html',
  styleUrl: './teste-login.scss',
})
export class TesteLogin {
  @Output() closeEvent = new EventEmitter<void>();

  code = '';
  error = false;
  loading = false;
  step: 'login' | 'type-select' = 'login';
  pendingToken = '';
  availableTypes: UserType[] = [];

  constructor(private auth: AuthService) {}

  submit(): void {
    this.error = false;
    this.loading = true;
    this.auth.loginUser(this.code).subscribe({
      next: (res) => {
        this.loading = false;
        this.pendingToken = res.token;
        this.availableTypes = res.type;
        this.step = 'type-select';
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
