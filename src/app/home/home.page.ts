import { Component, OnInit, ViewChild,  } from '@angular/core';
import { Map, tileLayer, marker, icon } from 'leaflet';
import * as L from 'leaflet';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { HttpClient } from '@angular/common/http';

import { Geolocation } from '@capacitor/geolocation';
import { DbService } from '../services/db.service';
import { Observable, TimeoutError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { WordpressService } from '../services/wordpress.service';
import { FormControl } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { Network } from '@capacitor/network';

import { Entreprise } from '../models/entreprise';
@Component({
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  ngOnInit() {
    

    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
      	this.loadEntreprises();
      
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
    public loadingController: LoadingController) {
    
// console.log('HomePage constructor');
  }

// ----------------------------------------------------------- DECLARATION DE VARIABLES -----------------------------------------------------------
map:Map;
coords: any;
latitude: number;
longitude: number;
adresse:any;
ville:string;

entrep: Entreprise[] = [];
entreprise:any = [];
ent: any;
selectedView = 'ent';

filterTerm: string = "";

entreprisesWP: Array<any> = new Array<any>();
  id: number;
  results;
  entDb: any;
  page:number;
  arrayIdEntreprise:any = [];


async searchEnt(filterTerm){
  console.log("searchEnt start ts");
  console.log(filterTerm);
  await this.db.searchEntreprise(filterTerm).then(res => {
    console.log('in function');
    console.log(res);

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

// entrepriseById:[] = [];
// async loadId(id_entreprise){
//   await this.wordpressService.getEntreprisesById(id_entreprise).then(async data => {
//     console.log("getEntrepriseById");
//     console.log("data:", data);
//     var res = JSON.stringify(data);
//     console.log("res:",res);
//     var resultats = JSON.parse(res);

//     if(resultats){
//       console.log(resultats.length);
//       for(var i=0; i<resultats.length;i++){
//         this.entrepriseById.push(resultats[i]);
//         console.log("ID:", resultats[i]);
//       }
//   }
//   })
// }


private addMarkerEntreprise(entreprise: Entreprise)
{
          if(entreprise.lien_image === ''){
          	entreprise.lien_image = "assets/uploads/logo_mini2.png"
	  }
      	  var displaySite = '';
          if(entreprise.site_internet_entreprise ===''){
	          displaySite = 'display:none;';
          }
              var popup = L.popup()
              .setContent("<div id='popupContent' style='display:flex;justify-content:space-between;width: 300px;height: 120px'><img id='imgPopup' src='"+entreprise.lien_image+"' alt='logo "+entreprise.nom_entreprise
              +"' style='max-width:30%;margin-right:10px;object-fit:contain'/><div style='width:65%;text-align:center;overflow:scroll;display:flex;flex-direction: column;'>  <p id='titlePopup' style='font-size:1.4em;font-weight:bold;margin:-4px 0px -7px 0px;'>"+entreprise.nom_entreprise +"</p><p id='textPopup' style='padding 7px;' >"+entreprise.sous_titre_entreprise
              +"</p><a id='sitePopup' style='background-color: #004569; color: white;padding: 10px;border-radius: 10px;text-decoration:none;" + displaySite + ";' href='"+entreprise.site_internet_entreprise+"' >Site internet</a><div></div>");
  
              L.marker([ entreprise.latitude_entreprise, entreprise.longitude_entreprise], {icon: this.orIcon}).bindPopup(popup).addTo(this.map);

          
}

private async  loadEntreprises()
{
  const status = await Network.getStatus();

  console.log(status);
  if(status && status.connected == true)// && status.connectionType != ConnectionType.unknow && status.connectionType != ConnectionType.none)
  {
  	console.log("load from web");
  
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
      var currentEntreprise;
      console.log(results.length);

        for(var i=0; i < results.length ;i++){
          this.entreprisesWP.push(results[i]); // Ajout des entreprisesWP de la bdd wordpress dans un tableau Entreprises
        
          currentEntreprise = new Entreprise();
          currentEntreprise.fillFromWeb(results[i]);

          await this.db.getEntreprise(results[i]['id']).then(async data =>{
            if(data === undefined){ // id Sqlite undefined => ajout
              console.log("WP : ",results[i]['id']);

              console.log("addEnt");
              this.db.addEntreprise(
              	currentEntreprise
              ).then(addEnt => {
                this.entreprisesWP.push(addEnt);
		//télécharger l'image en local
              })
            }

            else if (data['id_entreprise'] === results[i]['id']){ // id sqlite = id wp => afficher
              this.arrayIdEntreprise.push(data['id_entreprise']);

              console.log("results === entDb : "); 
              console.log("SQLite : ",data['id_entreprise']);
              console.log("WP : ",results[i]['id']);
              this.db.updateEntreprise(
              	currentEntreprise
              ).then(updateEnt => {
                this.entreprisesWP.push(updateEnt);

              })
              return results[i];
            } 
            console.log("WP.length : ",this.entreprisesWP.length);
          }) 
	
	  this.addMarkerEntreprise(currentEntreprise);
        }
        await this.db.deleteEntNotIn(this.arrayIdEntreprise);
        console.log("delete");
    }

  })
  }
  else
  {
    	console.log("load from bdd");
    // pas de connexion donc chargement depuis BDD
  	await this.db.loadEntreprise().then(async entreprises =>{
  		console.log(entreprises);
  		
  		for(var i=0; i < entreprises.length ;i++){
  			this.addMarkerEntreprise(entreprises[i]);
  		}
  	});
   }

  } 



}
