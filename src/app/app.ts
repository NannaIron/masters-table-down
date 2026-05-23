import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('masters-table-down');

  backgr = 'white';

  changeBackground() {
    this.backgr = this.backgr === 'white' ? 'black' : 'white';
  }
}
