import { Routes } from '@angular/router';
import {HomeComponent} from './home/home';
import {AboutComponent} from './about/about';
import {CollectionComponent} from './collection/collection';

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
    path: '**',
    redirectTo: '/'
  }
];
