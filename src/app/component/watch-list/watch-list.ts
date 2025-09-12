import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonServices } from '../../services/common-services';

@Component({
  selector: 'app-watch-list',
  imports: [CommonModule],
  templateUrl: './watch-list.html',
  styleUrl: './watch-list.css',
})
export class WatchList {
  constructor(public services: CommonServices) {}


}
