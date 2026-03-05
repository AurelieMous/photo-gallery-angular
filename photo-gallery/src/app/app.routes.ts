import { Routes } from '@angular/router';
import {HomeComponent} from './home/home';
import {AboutComponent} from './about/about';
import {CollectionComponent} from './collection/collection';
import {VideosComponent} from './videos/videos';
import {ImgDetailComponent} from './home/img-detail/img-detail';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'collection',
    component: CollectionComponent
  },
  {
    path: 'videos',
    component: VideosComponent
  },
  {
    path: 'photo/:id',
    component: ImgDetailComponent
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
