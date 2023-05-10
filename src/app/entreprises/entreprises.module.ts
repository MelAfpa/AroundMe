import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntreprisesPageRoutingModule } from './entreprises-routing.module';

import { EntreprisesPage } from './entreprises.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntreprisesPageRoutingModule
  ],
  declarations: [EntreprisesPage]
})
export class EntreprisesPageModule {}
