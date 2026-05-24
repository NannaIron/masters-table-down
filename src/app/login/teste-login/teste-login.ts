import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-teste-login',
  imports: [],
  templateUrl: './teste-login.html',
  styleUrl: './teste-login.scss',
})
export class TesteLogin {
  @Output() closeEvent = new EventEmitter<void>();

  close(): void {
    this.closeEvent.emit();
  }
}
