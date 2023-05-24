import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DbTestPageRoutingModule } from './db-test-routing.module';

import { DbTestPage } from './db-test.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DbTestPageRoutingModule
  ],
  declarations: [DbTestPage]
})
export class DbTestPageModule {}
