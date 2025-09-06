import { Component } from '@angular/core';
import { Header } from '../header/header';
import { Search } from '../search/search';
import { CardComponents } from '../card-components/card-components';

@Component({
  selector: 'app-searchpage',
  imports: [Header,Search,CardComponents],
  templateUrl: './searchpage.html',
  styleUrl: './searchpage.css'
})
export class Searchpage {

}
