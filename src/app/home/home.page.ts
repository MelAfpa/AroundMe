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

// ----------------------------------------------------------- DECLARATION DE VARIABLES -----------------------------------------------------------
map:Map;
coords: any;
latitude: number;
longitude: number;
adresse:any;
ville:string;

 greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

 purpleIcon = new L.Icon({
  iconUrl: '  https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

 redIcon = new L.Icon({
  iconUrl: '  https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

 orIcon = new L.Icon({
  iconUrl: '  https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// ----------------------------------------------------------- FUNCTIONS -----------------------------------------------------------
// Map
ionViewDidEnter() {
  this.map = L.map('map').setView([47.383333, 0.683333], 8);
  // Ajout des mentions OpenStreetMap, obligatoire
  var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    // attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(this.map);


var sat = L.tileLayer('https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
  maxZoom: 20,
  subdomains:['mt0','mt1','mt2','mt3']
});



var baseMaps = {
  'Open Street Map': osm,
  'Satellite': sat
}

L.control.layers(baseMaps).addTo(this.map);

}

showMarker(){

    // Position utilisateur 
L.marker([this.latitude, this.longitude], {icon: this.purpleIcon}).addTo(this.map).bindPopup("There you are !!");
L.circle([this.latitude, this.longitude], 30000, {
  color: 'red',
  opacity: 0.5
}).addTo(this.map).bindPopup("30 km around you").openPopup;


    // Position entreprises -------------------------------------------------
        // Producteurs/Fabricants or
L.marker([ 48.818077,  2.205862], {icon: this.orIcon}).addTo(this.map).bindPopup("HOLONAGE");

    // Commerçants/restaurants violet
    // Services à la personne vert
    // Services aux entreprises rouge

// nom_ent, adresse_ent, logo, bouton pour le site

L.marker([47.19315298236589,-0.27533303027755096], {icon:this.redIcon}).addTo(this.map).bindPopup("TERRE DE PIXELS");


  }
  

// Geocoding
 
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

// Affichage
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

/*Fonctions :
- création markers selon coordonnées
- création cartes affichage au clic du marker
*/

createCard(){
  let carte = document.createElement('div');
  carte.setAttribute('id', "carte");
  carte.innerHTML = "Salut";
  carte.textContent = "Bonjour";
}
}
