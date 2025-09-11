import { Component, inject } from '@angular/core';
import { Header } from '../header/header';
import { CommonServices } from '../../services/common-services';

@Component({
  selector: 'app-wishlist',
  imports: [Header],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css',
})
export class Wishlist {
  
  constructor(public services:CommonServices) {}
 
  
 

 
}
