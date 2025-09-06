import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from './component/login/login';
import { Register } from './component/register/register';
import { Details } from './component/details/details';
import { Header } from './component/header/header';
import { AccountDetails } from './component/account-details/account-details';
import { EditProfile } from './component/edit-profile/edit-profile';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Details, AccountDetails, EditProfile],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
