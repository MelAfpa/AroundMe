import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecomFormPageRoutingModule } from './recom-form-routing.module';

import { RecomFormPage } from './recom-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RecomFormPageRoutingModule
  ],
  declarations: [RecomFormPage]
})
export class RecomFormPageModule {}
