import { ModuleWithProviders }  from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SecurityAuthorizatorService, LoginComponent, ForbiddenComponent } from 'ra-ng';

import { HomeComponent } from './home';

// See https://github.com/angular/angular/pull/10056
// const routes: RouterConfig = [
//   { path: 'src', redirectTo: '/home', pathMatch: 'full' },
//   { path: 'login', component: LoginComponent },
//   { path: 'home', component: HomeComponent, canActivate: [SecurityAuthorizatorService], data: { roles: ['user', 'admin'] } },
//   { path: 'other1', component: HomeComponent },
//   { path: 'other2', component: HomeComponent }
// ];

// No security (no guard)
// const routes: Routes = [
//   { path: 'src', redirectTo: '/home', pathMatch: 'full' },
//   {
//     path: '',
//     children: [
//       { path: 'home', component: HomeComponent },
//       { path: 'other1', component: HomeComponent },
//       { path: 'other2', component: HomeComponent }
//     ]
//   }
// ];

// No data element defined (no roles)
// const routes: Routes = [
//   { path: 'src', redirectTo: '/home', pathMatch: 'full' },
//   { path: 'login', component: LoginComponent },
//   { path: 'forbidden', component: ForbiddenComponent },
//   {
//     path: '',
//     canActivate: [SecurityAuthorizatorService],
//     canActivateChild: [SecurityAuthorizatorService],
//     children: [
//       { path: 'home', component: HomeComponent },
//       { path: 'other1', component: HomeComponent },
//       { path: 'other2', component: HomeComponent }
//     ]
//   }
// ];

// Data element with no roles
// const routes: Routes = [
//   { path: 'src', redirectTo: '/home', pathMatch: 'full' },
//   { path: 'login', component: LoginComponent },
//   { path: 'forbidden', component: ForbiddenComponent },
//   {
//     path: '',
//     data: { roles: [] },
//     canActivate: [SecurityAuthorizatorService],
//     canActivateChild: [SecurityAuthorizatorService],
//     children: [
//       { path: 'home', component: HomeComponent },
//       { path: 'other1', data: { roles: [] }, component: HomeComponent },
//       { path: 'other2', data: { roles: [] }, component: HomeComponent }
//     ]
//   }
// ];

// Data element with roles
const routes: Routes = [
  { path: 'src', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  {
    path: '',
    data: { roles: ['user', 'admin'] },
    canActivate: [SecurityAuthorizatorService],
    canActivateChild: [SecurityAuthorizatorService],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'other1', data: { roles: ['writer'] }, component: HomeComponent },
      { path: 'other2', data: { roles: ['admin'] }, component: HomeComponent }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
