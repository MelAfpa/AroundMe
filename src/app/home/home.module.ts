import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
// import { NativeGeocoder } from '@awesome-cordova-plugins/native-geocoder';

import { HomePageRoutingModule } from './home-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeafletModule,
    HomePageRoutingModule,
    
  ],
  declarations: [HomePage],
  providers: [
  ]
})
export class HomePageModule {}
