import { Routes } from '@angular/router';
import { Mainpage } from './component/mainpage/mainpage';
import { Searchpage } from './component/searchpage/searchpage';
import { Details } from './component/details/details';

export const routes: Routes = [
    { path: '', component: Mainpage, title: 'Movie App' },
  { path: 'search', component: Searchpage, title: 'Search' },
  {path : 'details' , component:Details,title:'Details'},

  
  { path: '**', redirectTo: '' }
];
