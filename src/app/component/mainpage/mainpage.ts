import { Component } from '@angular/core';
import { Header } from '../header/header';
import { Search } from '../search/search';
import { CardComponents } from '../card-components/card-components';

@Component({
  selector: 'app-mainpage',
  imports: [Header,Search,CardComponents],
  templateUrl: './mainpage.html',
  styleUrl: './mainpage.css'
})
export class Mainpage {

}
