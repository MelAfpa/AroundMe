/*import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntrepriseDetailPageRoutingModule } from './entreprise-detail-routing.module';
import { EntrepriseDetailPage } from './entreprise-detail.page';

import { Platform } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntrepriseDetailPageRoutingModule
  ],
  declarations: [EntrepriseDetailPage],
  providers:[
    Platform,
  ]
})
export class EntrepriseDetailPageModule {}
*/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntrepriseDetailPageRoutingModule } from './entreprise-detail-routing.module';

import { EntrepriseDetailPage } from './entreprise-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EntrepriseDetailPageRoutingModule
  ],
  declarations: [EntrepriseDetailPage]
})
export class EntrepriseDetailPageModule {}
