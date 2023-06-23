import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
/*  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'home/:id',
    pathMatch: 'full'
  },
*/
  {
    path: 'recom-form',
    loadChildren: () => import('./recom-form/recom-form.module').then( m => m.RecomFormPageModule)
  },
  /*{
    path: 'carte',
    loadChildren: () => import('./pages/carte/carte.module').then( m => m.CartePageModule),
  },*/
  {
    path: 'entreprise-detail',
    loadChildren: () => import('./pages/entreprise-detail/entreprise-detail.module').then(m => m.EntrepriseDetailPageModule),
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
