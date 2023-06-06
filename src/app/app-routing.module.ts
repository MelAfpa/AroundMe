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
    path: 'developers-page/:id',
    loadChildren: () => import('./developers-page/developers-page.module').then( m => m.DevelopersPagePageModule)
  },
  {
    path: 'developers-page',
    loadChildren: () => import('./developers-page/developers-page.module').then( m => m.DevelopersPagePageModule)
  },
  {
    path: 'recom-form',
    loadChildren: () => import('./recom-form/recom-form.module').then( m => m.RecomFormPageModule)
  },
  {
    path: 'posts',
    loadChildren: () => import('./posts/posts.module').then( m => m.PostsPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
