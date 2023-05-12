import { Component, OnInit, ViewChild,  } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { Map, tileLayer, marker, icon } from 'leaflet';
import * as L from 'leaflet';
// import { antPath } from 'leaflet-ant-path';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { HttpClient } from '@angular/common/http';

import { Geolocation } from '@capacitor/geolocation';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private nativeGeocoder: NativeGeocoder,
    private dbService: DbService,
    private http: HttpClient) {
  }

  // entreprise = [];
  // export = null;

  // loadBuisiness() {
  //   this.dbService.ngetBuisinessList().subscribe(res => {
  //     this.entreprise = res.values;
  //   });
  // }

  // Mode is either "partial" or "full"
  // async createExport(partial) {
  //   const dataExport = await this.dbService.getDatabaseExport(partial);
  //   this.export = dataExport.export;
  // }

// ----------------------------------------------------------- DECLARATION DE VARIABLES -----------------------------------------------------------
map:Map;
coords: any;
latitude: number;
longitude: number;
adresse:any;
ville:string;

 userPosition = L.icon({
  iconUrl: 'assets/uploads/userMarker.png',

  iconSize:     [30, 41], // size of the icon
  iconAnchor:   [12, 41], // point of the icon which will correspond to marker's location
  popupAnchor:  [1, -34] // point from which the popup should open relative to the iconAnchor
});

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

ionViewWillEnter() {

  this.http.get('assets/database.json').subscribe((data) => {

for(let i=0; i<data['entreprise'].length;i++){
  var lat = data['entreprise'][i]['latitude_entreprise'];
  var long = data['entreprise'][i]['longitude_entreprise'];
  var img = "assets/uploads/logos/"+[i]+".png";

// A FAIRE : image blanche si pas de logo

// console.log('test de i : ',i);

  var popup = L.popup()
    .setContent("<img src='"+img+"' alt='logo "+data['entreprise'][i]['nom_entreprise']
    +"'/> <h2>"+data['entreprise'][i]['nom_entreprise'] +"</h2><p>"+data['entreprise'][i]['adresse_entreprise']
    +"</p><a href='"+data['entreprise'][i]['site_internet_entreprise']+"'>Site internet</a>");
  

  L.marker([ lat, long], {icon: this.orIcon}).bindPopup(popup).addTo(this.map);

}
  });

  this.locate();

}


// Map
ionViewDidEnter() {
  this.map = L.map('map').setView([47.383333, 0.683333], 8);
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
this.map.on('load', function(){
  console.log("map loaded");

})

}

showMarker(){






    // Position entreprises -------------------------------------------------
        // Producteurs/Fabricants or

    // Commerçants/restaurants violet
    // Services à la personne vert
    // Services aux entreprises rouge

// nom_ent, adresse_ent, logo, bouton pour le site



  }

// Geocoding
 
  async locate() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.latitude = coordinates.coords.latitude;
    this.longitude = coordinates.coords.longitude;
    this.coords = coordinates.coords;
        // Position utilisateur 
    L.marker([this.latitude, this.longitude], {icon: this.userPosition}).addTo(this.map).on('click', function(e){
      this.map.setView([this.latitude, this.longitude], 13);
    });

    L.circle([this.latitude, this.longitude], 30000, {
      fill:false,
      color: "black",
    }).addTo(this.map).bindPopup("30 km around you").openPopup;

    this.map.setView([this.latitude, this.longitude], 9);

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

Affichage
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





}
