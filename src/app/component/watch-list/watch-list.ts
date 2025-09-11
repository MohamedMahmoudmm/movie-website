import { Component } from '@angular/core';
import { Header } from '../header/header';
import { CommonModule } from '@angular/common';
import { CommonServices } from '../../services/common-services';

@Component({
  selector: 'app-watch-list',
  imports: [Header, CommonModule],
  templateUrl: './watch-list.html',
  styleUrl: './watch-list.css',
})
export class WatchList {
  constructor(public services: CommonServices) {}

 
}
