import { Component, OnInit, ViewChild,  } from '@angular/core';
import { Map, tileLayer, marker, icon } from 'leaflet';
import * as L from 'leaflet';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { HttpClient } from '@angular/common/http';

import { Geolocation } from '@capacitor/geolocation';
import { DbService, Ent } from '../services/db.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { WordpressService } from '../wordpress.service';

import { FormControl } from '@angular/forms';

@Component({
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getEnt().subscribe(ent => {
          this.entreprise = ent;

          for(let i=0; i<ent.length; i++){
              var nom = ent[i]['nom_entreprise'];
              var infos = ent[i]['infos_entreprise'];
              var site = ent[i]['site_internet_entreprise'];
              var lat =  ent[i]['latitude_entreprise'];
              var long =  ent[i]['longitude_entreprise'];
              var img = "assets/uploads/logos/"+[i]+".png";

              var popup = L.popup()
                .setContent("<div id='popupContent' style='display:flex;justify-content:space-between;width: 300px;height: 150px'><img id='imgPopup' src='"+img+"' alt='logo "+nom
                +"' style='max-width:30%;margin-right:10px;object-fit:contain'/><div style='width:65%;text-align:center;overflow:scroll;'> <h3 id='titlePopup' >"+nom +"</h3><p id='textPopup' >"+infos
                +"</p><a id='sitePopup' style='background-color: #004569; color: white;padding: 10px;border-radius: 10px;text-decoration:none;' href='"+site+"' >Site internet</a><div></div>");
                        
              L.marker([ lat, long], {icon: this.orIcon}).bindPopup(popup).addTo(this.map);
          }
          
        })
      }
    });
    // this.route.data.subscribe(routeData => {
    //   const data = routeData['data'];
    //   this.entreprise = data.entreprise;
    // })
  }

  constructor(
    private nativeGeocoder: NativeGeocoder,
    private db: DbService,
    private http: HttpClient,
    private wordpressservice: WordpressService,
    private router: Router,
    private route: ActivatedRoute,) {
    
// console.log('HomePage constructor');
  }

// ----------------------------------------------------------- DECLARATION DE VARIABLES -----------------------------------------------------------
map:Map;
coords: any;
latitude: number;
longitude: number;
adresse:any;
ville:string;

entrep: Ent[] = [];
entreprise:any = [];
ent: any;
selectedView = 'ent';

filterTerm: string;


searchEnt(word:string){
  this.db.searchEnt(word).then(async(res) => {
console.log('in function');
console.log(word);

    this.db.getEnt().subscribe(data => {
      this.entreprise = data;
      console.log(data);
  })
})
}

userPosition = L.icon({
  iconUrl: 'assets/uploads/markers/userMarker.png',
  shadowUrl: 'assets/uploads/markers/shadowMarker.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

searchMarker = L.icon({
  iconUrl: 'assets/uploads/markers/searchMarker.png',
  shadowUrl: 'assets/uploads/markers/shadowMarker.png',
  iconSize: [25, 39],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

orIcon = new L.Icon({
  iconUrl: '  assets/uploads/markers/orMarker.png',
  shadowUrl: 'assets/uploads/markers/shadowMarker.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// ----------------------------------------------------------- FUNCTIONS -----------------------------------------------------------


// Map

/**
 * Crée et affiche la carte Leaflet 
 * @returns {any}
 */
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
  console.log('ionViewWillEnter');

  
}
  

// Geocoding

/**
 * Localise l'utilisateur et crée un marker sur et autour sa position
 * @returns {any}
 */
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

  
/**
 * Transforme les coordonnées géographiques obtenus en adresse postale
 * @returns {any}
 */
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


}


// search(){
//   let marker = null;
//   let lat = parseFloat(document.getElementById("lat").textContent);
//   let long =  parseFloat(document.getElementById("long").textContent);
//   let id = document.getElementById("id").textContent;
//   let nom = document.getElementById("nom").textContent;
//   let infos = document.getElementById("infos").textContent;
//   let site = document.getElementById("site").textContent;

//   // let img = document.getElementById("lat").textContent;

  
//   var img = "assets/uploads/logos/recherche/"+id+".png";

//   var popup = L.popup()
//                 .setContent("<div id='popupContent' style='display:flex;justify-content:space-between;width: 300px;height: 150px'><img id='imgPopup' src='"+img+"' alt='logo "+nom
//                 +"' style='max-width:30%;margin-right:10px;object-fit:contain'/><div style='width:65%;text-align:center;overflow:scroll;'> <h3 id='titlePopup' >"+nom +"</h3><p id='textPopup' >"+infos
//                 +"</p><a id='sitePopup' style='background-color: #004569; color: white;padding: 10px;border-radius: 10px;text-decoration:none;' href='"+site+"' >Site internet</a><div></div>");
                  
//   if(marker !== null){
//     console.log('if loop');
//     this.map.removeLayer(marker);
//   } 
  
//   marker = L.marker([ lat, long], {icon: this.searchMarker}).bindPopup(popup).addTo(this.map);

  



  
// }

