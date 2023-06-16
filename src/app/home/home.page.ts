import { Component, OnInit, ViewChild,  } from '@angular/core';
import { Map, tileLayer, marker, icon } from 'leaflet';
import * as L from 'leaflet';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { HttpClient } from '@angular/common/http';

import { Geolocation } from '@capacitor/geolocation';
import { DbService, Ent } from '../services/db.service';
import { Observable, TimeoutError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { WordpressService } from '../services/wordpress.service';
import { FormControl } from '@angular/forms';
import { LoadingController } from '@ionic/angular';

@Component({
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  ngOnInit() {
    this.loadEntreprises();

    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        // this.db.getEnt().subscribe(ent => {
        //   this.entreprise = ent;
          
          
        // })
      }
    });
      console.log("HomePage ngOnInit function");

  }

  constructor(
    private nativeGeocoder: NativeGeocoder,
    private db: DbService,
    private http: HttpClient,
    private wordpressService: WordpressService,
    private router: Router,
    private route: ActivatedRoute,
    public loadingController: LoadingController,) {
    
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

entreprisesWP: Array<any> = new Array<any>();
  id: number;
  results;
  entDb: any;
  page:number;
  arrayIdEntreprise:any = [];

  id_entreprise: number;
  nom_entreprise: string;
  telephone_entreprise: string;
  adresse_entreprise: string;
  infos_entreprise: string;
  description_entreprise: string;
  site_internet_entreprise: string;
  reseaux_sociaux_entreprise: string;
  monnaie_locale_entreprise: boolean;
  livraison_entreprise: boolean;
  latitude_entreprise: number;
  longitude_entreprise: number;
  id_departement: number


// async searchEnt(word:string){
//   await this.db.searchEnt(word).then(async(res) => {
// console.log('in function');
// console.log(word);

//     this.db.getEnt().subscribe(data => {
//       this.entreprise = data;
//       console.log(data);
//   })
// })
// }

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


// ionViewWillEnter() {
//   console.log('ionViewWillEnter');

  
// }
  

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



private async  loadEntreprises()
{

  await this.wordpressService.getEntreprisesByPages().then(async resultsO => { // Récupère les données wordpress
    // console.log("results getEntreprises");
    // console.log("resultsO : ",resultsO);
    var resultsS = JSON.stringify(resultsO);
    // console.log("resultsS : ",resultsS);
    var results = JSON.parse(resultsS).reverse();
    console.log("results : ",results);
    
    if(results)
    {
      var content = [];
      console.log(results.length);

        for(var i=0; i < results.length ;i++){
          this.entreprisesWP.push(results[i]); // Ajout des entreprisesWP de la bdd wordpress dans un tableau Entreprises
        

          await this.db.getEntreprise(results[i]['id']).then(async data =>{
            if(data === undefined){ // id Sqlite undefined => ajout
              console.log("WP : ",results[i]['id']);

              console.log("addEnt");
              this.db.addEntreprise(this.nom_entreprise, this.id_entreprise, this.telephone_entreprise, this.adresse_entreprise, this.infos_entreprise, this.description_entreprise, 
              this.site_internet_entreprise, this.reseaux_sociaux_entreprise, this.monnaie_locale_entreprise, this.livraison_entreprise, this.latitude_entreprise, 
              this.longitude_entreprise, this.id_departement).then(addEnt => {
                this.entreprisesWP.push(addEnt);

              })
            }

            else if (data['id_entreprise'] === results[i]['id']){ // id sqlite = id wp => afficher
              this.arrayIdEntreprise.push(data['id_entreprise']);

              console.log("results === entDb : "); 
              console.log("SQLite : ",data['id_entreprise']);
              console.log("WP : ",results[i]['id']);

              return results[i];
            } 
            console.log("WP.length : ",this.entreprisesWP.length);
          }) 

          var nom = (results[i].title.rendered).toLowerCase();
          nom = nom.charAt(0).toUpperCase()+nom.slice(1);

          var infos=results[i].meta['sous-titre'];
          var site = results[i].meta.site_internet;
          var coords =  results[i].meta.sur_la_carte;
          var lat = coords[0]['lat'];
          var long = coords[0]['lng']
          var img = results[i].meta.link_media;
          console.log(img);
          if(site[0] ===''){
            if(img === ''){
              img = "assets/uploads/logo_mini2.png"

              var popup = L.popup()
              .setContent("<div id='popupContent' style='display:flex;justify-content:space-between;width: 300px;height: 120px'><img id='imgPopup' src='"+img+"' alt='logo "+nom
              +"' style='max-width:30%;margin-right:10px;object-fit:contain'/><div style='width:65%;text-align:center;overflow:scroll;'>  <p id='titlePopup' style='font-size:1.4em;font-weight:bold;margin:0px 0px -5px 0px;'>"+nom +"</p><p id='textPopup' style='padding 7px;' >"+infos
              +"</p><div></div>");
  
              L.marker([ lat, long], {icon: this.orIcon}).bindPopup(popup).addTo(this.map);

            } else {

              img = "assets/uploads/logo_mini2.png"
              var popup = L.popup()
              .setContent("<div id='popupContent' style='display:flex;justify-content:space-between;width: 300px;height: 120px'><img id='imgPopup' src='"+img+"' alt='logo "+nom
              +"' style='max-width:30%;margin-right:10px;object-fit:contain'/><div style='width:65%;text-align:center;overflow:scroll;'>  <p id='titlePopup' style='font-size:1.4em;font-weight:bold;margin:0px 0px -5px 0px;'>"+nom +"</p><p id='textPopup' style='padding 7px;' >"+infos
              +"</p><div></div>");

              L.marker([ lat, long], {icon: this.orIcon}).bindPopup(popup).addTo(this.map);
            }
          } else {
            if(img === ''){
              img = "assets/uploads/logo_mini2.png"

              var popup = L.popup()
              .setContent("<div id='popupContent' style='display:flex;justify-content:space-between;width: 300px;height: 120px'><img id='imgPopup' src='"+img+"' alt='logo "+nom
              +"' style='max-width:30%;margin-right:10px;object-fit:contain'/><div style='width:65%;text-align:center;overflow:scroll;'>  <p id='titlePopup' style='font-size:1.4em;font-weight:bold;margin:-4px 0px -5px 0px;'>"+nom +"</p><p id='textPopup' style='padding 7px;' >"+infos
              +"</p><a id='sitePopup' style='background-color: #004569; color: white;padding: 10px;border-radius: 10px;text-decoration:none;' href='"+site+"' >Site internet</a><div></div>");
  
              L.marker([ lat, long], {icon: this.orIcon}).bindPopup(popup).addTo(this.map);

            } else {
              
              var popup = L.popup()
              .setContent("<div id='popupContent' style='display:flex;justify-content:space-between;width: 300px;height: 120px'><img id='imgPopup' src='"+img+"' alt='logo "+nom
              +"' style='max-width:30%;margin-right:10px;object-fit:contain'/><div style='width:65%;text-align:center;overflow:scroll;'>  <p id='titlePopup' style='font-size:1.4em;font-weight:bold;margin:-4px 0px -5px 0px;'>"+nom +"</p><p id='textPopup' style='padding 7px;' >"+infos
              +"</p><a id='sitePopup' style='background-color: #004569; color: white;padding: 10px;border-radius: 10px;text-decoration:none;' href='"+site+"' >Site internet</a><div></div>");

              L.marker([ lat, long], {icon: this.orIcon}).bindPopup(popup).addTo(this.map);
            }
          }
          
        } 
        await this.db.deleteEntNotIn(this.arrayIdEntreprise);
        console.log("delete");
    } 

  }) 

  } 



}
