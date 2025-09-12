import { Routes } from '@angular/router';
import { Mainpage } from './component/mainpage/mainpage';
import { Searchpage } from './component/searchpage/searchpage';
import { Details } from './component/details/details';
import { Login } from './component/login/login';
import { Register } from './component/register/register';
import { AccountDetails } from './component/account-details/account-details';
import { EditProfile } from './component/edit-profile/edit-profile';
import { Wishlist } from './component/wishlist/wishlist';
import { NotFoundPage } from './component/not-found-page/not-found-page';
import { WatchList } from './component/watch-list/watch-list';

export const routes: Routes = [
  { path: '', component: Login, title: 'login' },
  { path: 'home', component: Mainpage, title: 'Movie App' },
  { path: 'search', component: Searchpage, title: 'Search' },
  { path: 'login', component: Login, title: 'login' },
  { path: 'register', component: Register, title: 'register' },
  { path: 'favorites', component: Wishlist, title: 'favorites' },
  {path : 'details' , component:Details,title:'Details'},
  { path: 'details/:id', component: Details,title:'Details' },
  { path: 'account-details', component: AccountDetails, title: 'AccountDetails' },
  { path: 'edit-profile', component: EditProfile, title: 'EditProfile' },
  { path: 'watchList', component: WatchList, title: 'watchList' },

  { path: '**', component: NotFoundPage, title: '404' },
];