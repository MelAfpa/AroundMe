import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostsPageRoutingModule } from './posts-routing.module';

import { PostsPage } from './posts.page';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: PostsPage,
    resolve: {
      data: PostsPageRoutingModule
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange' // because we use the same route for all posts and for category posts, we need to add this to refetch data 
  }
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostsPageRoutingModule
  ],
  declarations: [PostsPage]
})
export class PostsPageModule {}
