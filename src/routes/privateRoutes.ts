import IRoute from 'interfaces/route';
import { AcessPage } from 'pages/private/AcessPage';
import { AthletePage } from 'pages/private/AthletePage';
import { CategoryPage } from 'pages/private/CategoryPage';
import { HomePage } from 'pages/private/HomePage';
import { RegisterAcess } from 'pages/private/RegisterAccess';
import { RegisterAthlete } from 'pages/private/RegisterAthlete';

const routes: IRoute[] = [
  {
    icon: null,
    path: '/home',
    name: 'homepage',
    isPrivate: true,
    component: HomePage,
  },
  {
    icon: null,
    path: '/athletes',
    name: 'athletes',
    isPrivate: true,
    component: AthletePage,
  },
  {
    icon: null,
    path: '/register-athlete',
    name: 'registerAthlete',
    isPrivate: true,
    component: RegisterAthlete,
  },
  {
    icon: null,
    path: '/categories',
    name: 'categories',
    isPrivate: true,
    component: CategoryPage,
  },
  {
    icon: null,
    path: '/access',
    name: 'access',
    isPrivate: true,
    component: AcessPage,
  },
  {
    icon: null,
    path: '/register-access',
    name: 'registerAccess',
    isPrivate: true,
    component: RegisterAcess,
  },
];

export default routes;
