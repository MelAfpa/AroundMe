import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Map, tileLayer, marker, icon } from 'leaflet';
import * as L from 'leaflet';
// import { antPath } from 'leaflet-ant-path';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';

import { Geolocation } from '@capacitor/geolocation';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private nativeGeocoder: NativeGeocoder) {
    this.locate();}


map:Map;
coords: any;
latitude: number;
longitude: number;
adresse:any;
ville:string;

// ----------------------------------------- MAP -----------------------------------------

  // Création de la map
  ionViewDidEnter() {
     this.map = L.map('map').setView([47.383333, 0.683333], 8);
    // Ajout des mentions OpenStreetMap, obligatoire
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(this.map);}

// ----------------------------------------- MARKERS -----------------------------------------
showMarker(){
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




// L.marker([48.390394,  -4.486076], {icon: greenIcon}).addTo(this.map);
// L.marker([47.478419, -0.563166], {icon: redIcon}).addTo(this.map).bindPopup('Angers');
// L.marker([46.887619,  9.657000], {icon: redIcon}).addTo(this.map).bindPopup('Alpes').openPopup;
L.marker([this.latitude, this.longitude], {icon: purpleIcon}).addTo(this.map).bindPopup("There you are !!");
L.circle([this.latitude, this.longitude], 1000, {
  color: 'red',
  opacity: 0.5
}).addTo(this.map).bindPopup("1 km around you").openPopup;


  }
  
  // onLocationFound(e) {
  //   var radius = e.accuracy / 2;
  //   L.marker(e.latlng).addTo(map)
  //     .bindPopup("You are within " + radius + " meters from this point").openPopup();
  //   L.circle(e.latlng, radius).addTo(map);
  // }
  


  
  // ----------------------------------------- GEOCODING -----------------------------------------
 
  async locate() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.latitude = coordinates.coords.latitude;
    this.longitude = coordinates.coords.longitude;
    this.coords = coordinates.coords;
    this.map.setView([this.latitude, this.longitude], 12);

  }

getAddress() {
  let options: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 1
};


this.nativeGeocoder.reverseGeocode(this.latitude, this.longitude, options)
  .then((results: NativeGeocoderResult[]) =>{
    let result;
    if(Array.isArray(results)){
      if(results.length>0){
        result = results[0];
      }} 
    else {
      result = results;   
    }
    console.log(result.addressLines);
    console.log(result.locality);

    this.adresse = result.addressLines;
    this.ville = result.locality;
  });
}

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

latLng(){
  const latlng = document.getElementById("latlng") as HTMLHeadingElement;

  if(latlng.style.display === "block"){
    latlng.style.display = "none";
  } else {
    latlng.style.display = "block";
  }
}

}
