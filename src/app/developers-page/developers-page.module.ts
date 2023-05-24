import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DevelopersPagePageRoutingModule } from './developers-page-routing.module';

import { DevelopersPagePage } from './developers-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DevelopersPagePageRoutingModule
  ],
  declarations: [DevelopersPagePage]
})
export class DevelopersPagePageModule {}
