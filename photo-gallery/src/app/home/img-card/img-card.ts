import {Component, input, Input} from '@angular/core';

import {Photo} from '../../models/photo.interface';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-img-card',
  imports: [
    RouterLink
  ],
  templateUrl: './img-card.html',
  styleUrl: './img-card.css',
})
export class ImgCardComponent {
  photo = input.required<Photo>()// recoit les donnée du parent
}
