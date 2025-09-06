import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from './component/login/login';
import { Register } from './component/register/register';
import { Details } from './component/details/details';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Login,Register,Details],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('movie-website');
}
