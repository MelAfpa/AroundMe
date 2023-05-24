import { Component, OnInit, ViewChild,  } from '@angular/core';
import { Map, tileLayer, marker, icon } from 'leaflet';
import * as L from 'leaflet';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { HttpClient } from '@angular/common/http';

import { Geolocation } from '@capacitor/geolocation';
import { DbService, Ent } from '../services/db.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  
  entrep: Ent[] = [];
  entreprise:any = [];
  ent: any;

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getEnt().subscribe(ent => {
          this.entreprise = ent;
          console.log('nbOnInit', rdy);
          console.log('nbOnInit', ent);
        })
      }
      // this.entreprise=this.db.getEnt();


    });

    this.db.getEnt().subscribe(ent => {
      this.ent = ent.values;

      console.log(this.entreprise);
      console.log(ent.values);

    })

  }

  constructor(
    private nativeGeocoder: NativeGeocoder,
    private db: DbService,
    private http: HttpClient) {
    
      console.log('HomePage constructor');
  }


  selectedView = 'ent';
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

searchMarker = L.icon({
  iconUrl: 'assets/uploads/searchMarker.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 39],
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
  console.log('ionViewWillEnter');

//   this.db.createMarker()
//     .then(_ => {
//       this.entreprise = {};
//     });
    
// console.log(this.entreprise);
// console.log(this.entreprise['nom_entreprise']);


//     for(let i=0; i<this.entreprise.length;i++){
      
//       var nom = this.entreprise['nom_entreprise'];
//       var infos = this.entreprise['infos_entreprise'];
//       var site = this.entreprise['site_internet_entreprise'];
//       var lat = this.entreprise['latitude_entreprise'];
//       var long = this.entreprise['longitude_entreprise'];
//       var img = "assets/uploads/logos/"+[i]+".png";

// console.log(infos);
// // TODO : image blanche si pas de logo


//       var popup = L.popup()
//         .setContent("<div id='popupContent' style='display:flex;justify-content:space-between;width: 300px;height: 150px'><img id='imgPopup' src='"+img+"' alt='logo "+nom
//         +"' style='max-width:30%;margin-right:10px;object-fit:contain'/><div style='width:65%;text-align:center;overflow:scroll;'> <h3 id='titlePopup' >"+nom +"</h3><p id='textPopup' >"+infos
//         +"</p><a id='sitePopup' style='background-color: #004569; color: white;padding: 10px;border-radius: 10px;text-decoration:none;' href='"+site+"' >Site internet</a><div></div>");
        
//         L.marker([ lat, long], {icon: this.orIcon}).bindPopup(popup).addTo(this.map);
//     }
    
  
}
  

// Geocoding

async locate() {
  const coordinates = await Geolocation.getCurrentPosition();
  this.latitude = coordinates.coords.latitude;
  this.longitude = coordinates.coords.longitude;
  this.coords = coordinates.coords;
      
  // Position utilisateur 

  L.marker([this.latitude, this.longitude], {icon: this.userPosition}).bindPopup("Vous êtes ici").addTo(this.map);
  L.marker([47.466671, -0.563166], {icon: this.searchMarker}).bindPopup("Vous êtes ici").addTo(this.map);


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

resSearch:string;
searchEntreprise(mot:string){

  this.resSearch = mot;

  this.http.get('assets/dbJoin.json').subscribe((dataSearch) => {
    const entreprise = [dataSearch];

    if(entreprise.indexOf(mot)){
      console.log("ok");
    } else {
      console.log("NOK");
    }
   
console.log(entreprise);

   
    
    
  })

console.log(mot);
}






}
