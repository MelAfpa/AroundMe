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
    path: 'recom-form',
    loadChildren: () => import('./recom-form/recom-form.module').then( m => m.RecomFormPageModule)
  },
  {
    path: 'view-details/:id',
    loadChildren: () => import('./view-details/view-details.module').then( m => m.ViewDetailsPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
