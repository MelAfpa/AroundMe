import { Component, OnInit, ViewChild  } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Map, tileLayer, marker, icon } from 'leaflet';
import * as L from 'leaflet';
// import { antPath } from 'leaflet-ant-path';
import { Geolocation } from '@capacitor/geolocation';
// import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@awesome-cordova-plugins/native-geocoder/ngx';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{

  // const apiKey = "YOUR_API_KEY";
  // Création de la map
  ionViewDidEnter() {
    const map = L.map('map').setView([47.383333, 0.683333], 8);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

// ----------------------------------------- MARKERS -----------------------------------------

var greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

var purpleIcon = new L.Icon({
  iconUrl: '  https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

var redIcon = new L.Icon({
  iconUrl: '  https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});



L.marker([48.390394,  -4.486076], {icon: greenIcon}).addTo(map);
L.marker([47.26667, -0.08333], {icon: purpleIcon}).addTo(map).bindPopup('Saumur');
L.marker([46.887619,  9.657000], {icon: redIcon}).addTo(map).bindPopup('Alpes').openPopup;


  }


  // ----------------------------------------- GEOCODING -----------------------------------------
coords: any;
  async locate() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.coords = coordinates.coords;
    console.log('position : ', this.coords);


  }

  // latitude:string="48.390394";
  // longitude:string=" -4.486076";
  // results:NativeGeocoderResult;
  // keys:string[]=[];

  constructor() {}


   

//     options: NativeGeocoderOptions = {
//     useLocale: true,
//     maxResults: 5
// };

// this.nativeGeocoder.reverseGeocode(this.latitude, this.longitude, this.options)
//   .then((result: NativeGeocoderResult[]) => {
//     console.log(JSON.stringify(result[0]));
//     return result[0];
//   })

  



  // ----------------------------------------- FONCTIONS -----------------------------------------
click(){
  const affMap = document.getElementById("map") as HTMLHeadingElement;
  const btnMap = document.getElementById("btnMap") as HTMLHeadingElement;

  if(affMap.style.display === "block"){
    affMap.style.display = "none";
    btnMap.innerHTML = "Afficher la carte";
  } else {
    affMap.style.display = "block";
    btnMap.innerHTML = "Masquer la carte";


  }

}



}
