import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from './component/login/login';
import { Register } from './component/register/register';
import { Details } from './component/details/details';
import { Header } from './component/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Details],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
