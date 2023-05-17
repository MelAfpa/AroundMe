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
searchTerm:string;

 userPosition = L.icon({
  iconUrl: 'assets/uploads/userMarker.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
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


// Map
ionViewDidEnter() {
  this.map = L.map('map').setView([47.383333, 0.683333], 10);
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
this.locate();

}


ionViewWillEnter() {

  this.http.get('assets/dbJoin.json').subscribe((data) => {
    for(let i=0; i<data['entreprise'].length;i++){
      
      var nom = data['entreprise'][i].nom_entreprise;
      var adresse = data['entreprise'][i].adresse_entreprise;
      var infos = data['entreprise'][i].infos_entreprise;
      var site = data['entreprise'][i].site_internet_entreprise;
      var lat = data['entreprise'][i].latitude_entreprise;
      var long = data['entreprise'][i].longitude_entreprise;
      var secteur = data['entreprise'][i].code_type_activite;
      var img = "assets/uploads/logos/"+[i]+".png";


// TODO : image blanche si pas de logo


      var popup = L.popup()
        .setContent("<div id='popupContent' style='display:flex;justify-content:space-between;width: 300px;height: 150px'><img id='imgPopup' src='"+img+"' alt='logo "+nom
        +"' style='max-width:30%;margin-right:10px;object-fit:contain'/><div style='width:65%;text-align:center;overflow:scroll;'> <h3 id='titlePopup' >"+nom +"</h3><p id='textPopup' >"+infos
        +"</p><a id='sitePopup' style='background-color: #004569; color: white;padding: 10px;border-radius: 10px;text-decoration:none;' href='"+site+"' >Site internet</a><div></div>");
        //           const sitePopup = document.getElementById('sitePopup');

        // if(site === null){
        //   sitePopup.style.display = 'none';

        // }
        // if(secteur === '1'){ 
        //   L.marker([ lat, long], {icon: this.greenIcon}).bindPopup(popup).addTo(this.map);
        // } else if(secteur === '2') {
        //   L.marker([ lat, long], {icon: this.redIcon}).bindPopup(popup).addTo(this.map);
        // } else if(secteur === '3'){ 
        // L.marker([ lat, long], {icon: this.purpleIcon}).bindPopup(popup).addTo(this.map);
        // } else {
        //   L.marker([ lat, long], {icon: this.orIcon}).bindPopup(popup).addTo(this.map);
        // }
        L.marker([ lat, long], {icon: this.orIcon}).bindPopup(popup).addTo(this.map);
    }
  });
}
  

// Geocoding

 
async locate() {
  const coordinates = await Geolocation.getCurrentPosition();
  this.latitude = coordinates.coords.latitude;
  this.longitude = coordinates.coords.longitude;
  this.coords = coordinates.coords;
      
  // Position utilisateur 

  L.marker([this.latitude, this.longitude], {icon: this.userPosition}).bindPopup("Vous êtes ici").addTo(this.map);

  L.circle([this.latitude, this.longitude], 30000, {
    fill:false,
    color: "#004569",
    weight:1
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
  });
}

// resSearch:string;
// searchEntreprise(mot:string){
//   this.resSearch = mot;
//   this.http.get('assets/dbJoin.json').subscribe((dataSearch) => {
//     const entreprise = dataSearch['entreprise'];
//   var arr = Object.keys(entreprise).map(function (key) { return [Number(key), entreprise[key]];});
//   console.log(typeof arr);
//   console.log(arr);
//     for(let i=0; i<arr.length;i++){
//       if(arr[i].indexOf(mot)){
//         let nom = arr[i]['nom_entreprise'];
//         console.log(nom);
//       } else if (arr[i].includes(mot)){
        
//         console.log("include");
//       } else {
//                  console.log("Fuck you");

//       }


//     }
 

//   })

// console.log(mot);

// }






}
