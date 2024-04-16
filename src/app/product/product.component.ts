import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  optionsData: AnimationOptions = {
    path: '/assets/images/small/data2.json',
  };

  items = [
    {
      movieId: '0111161',
      title: 'The Shawshank Redemption',
      subtitle: 'Proin sed risus mattis',
      image: './assets/images/movies/shawshank_redemption.jpg',
      rating: 4,
      regular_price: '99.00',
      offer_price: '50.00',
      type: '',
    },
    {
      movieId: '0068646',
      title: 'The Godfather',
      subtitle: 'Proin sed risus mattis',
      image: './assets/images/movies/godfather.jpg',
      rating: 5,
      regular_price: '199.00',
      offer_price: '15.00',
      type: 'New',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
