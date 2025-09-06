import { Routes } from '@angular/router';
import { Mainpage } from './component/mainpage/mainpage';
import { Searchpage } from './component/searchpage/searchpage';
import { Details } from './component/details/details';
import { Login } from './component/login/login';
import { Register } from './component/register/register';

export const routes: Routes = [
    { path: '', component: Mainpage, title: 'Movie App' },
  { path: 'search', component: Searchpage, title: 'Search' },
  { path: 'login', component: Login, title: 'login' },
  { path: 'register', component: Register, title: 'register' },
  {path : 'details' , component:Details,title:'Details'},

  
  { path: '**', redirectTo: '' }
];
