import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'home/:id',
    pathMatch: 'full'
  },
  {
    path: 'db-test',
    loadChildren: () => import('./db-test/db-test.module').then( m => m.DbTestPageModule)
  },
  {
    path: 'developers-page/:id',
    loadChildren: () => import('./developers-page/developers-page.module').then( m => m.DevelopersPagePageModule)
  },
  {
    path: 'developers-page',
    loadChildren: () => import('./developers-page/developers-page.module').then( m => m.DevelopersPagePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
