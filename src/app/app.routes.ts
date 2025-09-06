import { Routes } from '@angular/router';
import { Mainpage } from './component/mainpage/mainpage';
import { Searchpage } from './component/searchpage/searchpage';
import { Details } from './component/details/details';
import { AccountDetails } from './component/account-details/account-details';
import { EditProfile } from './component/edit-profile/edit-profile';

export const routes: Routes = [
  { path: '', component: Mainpage, title: 'Movie App' },
  { path: 'search', component: Searchpage, title: 'Search' },
  { path: 'details', component: Details, title: 'Details' },
  { path: 'account-details', component: AccountDetails, title: 'AccountDetails' },
  { path: 'edit-profile', component: EditProfile, title: 'EditProfile' },

  { path: '**', redirectTo: '' },
];
