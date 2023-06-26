import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { Map, tileLayer, marker, icon } from 'leaflet';
import * as L from 'leaflet';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { HttpClient } from '@angular/common/http';

import { Geolocation } from '@capacitor/geolocation';
import { DbService } from '../services/db.service';
import { Observable, TimeoutError } from 'rxjs';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { WordpressService } from '../services/wordpress.service';
import { FormControl } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { Network } from '@capacitor/network';
import { FileDownload } from "capacitor-plugin-filedownload";
import { Entreprise } from '../models/entreprise';
import { Departement } from '../models/departement';
import { Secteur } from '../models/secteur';
import { Enums } from '../models/enums';
import { DownloaderService } from '../services/downloader.service';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'


@Component({
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

// ----------------------------------------------------------- DECLARATION DE VARIABLES -----------------------------------------------------------

map:Map;
coords: any;
latitude: number;
longitude: number;
adresse:any;
ville:string;

entrep: Entreprise[] = [];

departements: Array<Departement> = new Array<Departement>();
arrayIdDepartement:any = [];

secteurs: Array<Secteur> = new Array<Secteur>();
arrayIdSecteur:any = [];

entreprise:any = [];
ent: any;
selectedView = 'ent';

filterTerm: string;

titi: string= 'titi';

entreprisesWP: Array<any> = new Array<any>();
id: number;
results;
entDb: any;
page:number;
arrayIdEntreprise:any = [];
isToastOpen = false;

startMarkers:L.LayerGroup = L.layerGroup();
m:L.Marker;


  ngOnInit() {
    

    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.loadDatas();   
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
    public loadingController: LoadingController, 
    private elementRef: ElementRef,
    private downloaderService: DownloaderService,
    font: FontAwesomeModule
    
    ) {
    
 console.log('HomePage constructor');
  }


// ----------------------------------------------------------- FUNCTIONS -----------------------------------------------------------


// Map

/**
 * Crée et affiche la carte Leaflet 
 * @returns {any}
 */
ionViewDidEnter() {
  console.log('ionViewDidEnter');
  if(!this.map) {

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


  this.map.addLayer(this.startMarkers);

  this.startMarkers.addTo(this.map);


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

  L.marker([this.latitude, this.longitude], {icon: Enums.userPosition()}).bindPopup("Vous êtes ici").addTo(this.map);

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


private async addMarkerEntreprise(entreprise: Entreprise)
{

  var imagePath = "assets/uploads/logo_mini2.png";
  var displaySite = '';
  if(entreprise.site_internet_entreprise ===''){
          displaySite = 'display:none;';
  }

  if(entreprise.name_media != '' && await this.downloaderService.checkImageExist(entreprise.name_media, 1))
  {

    imagePath = await this.downloaderService.getImageUri(entreprise.name_media, 1);
    //imagePath = convertFileSrc(this.downloaderService.getPathDir(1) + entreprise.name_media;
    
    //var imageContent = await this.downloaderService.readImage(entreprise.name_media, 1);
   /* if(entreprise.name_media.endsWith("jpg") || entreprise.name_media.endsWith("jpeg"))
      imageWebView = 'data:image/jpeg;base64,' + imageContent;
    else
      imageWebView = 'data:image/png;base64,' + imageContent;*/
  }
  else{
   // this.arrayImageEntrepriseById[entreprise.id_entreprise] = await this.downloaderService.getDefaultImageUri("assets/uploads/logo_mini2.png");
  }

  entreprise.path_media = imagePath;
  
  console.log(imagePath);


      var popup = L.popup()
      .setContent(""
     //   + "<img src='"+imagePath+"'> "
     //   + "<img src='"+imageWebView+"'> "
       + "<div id='popupContent' style='display:flex;justify-content:space-between;width: 300px;height: 140px'>"
//[src]='sanitizer.bypassSecurityTrustUrl(arrayImageEntrepriseById["+entreprise.id_entreprise+"])' 
      +"<img class='detailClickImg' id='imgPopup' src='" + imagePath + "' alt='logo "+entreprise.nom_entreprise
      +"' style='max-width:30%;margin-right:10px;object-fit:contain'/>"
      +"<div style='width:65%;text-align:center;overflow:scroll;display:flex;flex-direction: column;'>"
      +"<p id='titlePopup' style='font-size:1.4em;font-weight:bold;margin:-4px 0px -7px 0px;' class='detailClick1'>"+entreprise.nom_entreprise +"</p>"
      +"<p id='textPopup' style='padding 7px;' class='detailClick2' >"+entreprise.sous_titre_entreprise
      +"</p><a id='sitePopup' class='popupButton' style='background-color: #004569; color: white;padding: 10px;border-radius: 10px;text-decoration:none;" + displaySite + ";' href='"+entreprise.site_internet_entreprise+"' ><ion-icon name='cloud-outline'></ion-icon></a><br/>"
      +"<ion-button class='detailClick3' style='background-color: #004569; color: white;padding: 10px;border-radius: 10px;text-decoration:none;'><ion-icon name='eye-outline'></ion-icon></ion-button><br/>"
      +"<div></div>");

      //https://stackoverflow.com/questions/54352169/why-my-button-in-leaflet-popup-not-working
      //https://codesandbox.io/s/l3l468y5w7?file=/src/app/app.component.ts

      this.m = L.marker([ entreprise.latitude_entreprise, entreprise.longitude_entreprise], {icon: Enums.orIcon()}).bindPopup(popup).addTo(this.map)
      .on("popupopen", () => {
        console.log("popupopen on");
        this.elementRef.nativeElement
        .querySelector(".detailClickImg")
        .addEventListener("click", e => {
          this.openDetail(entreprise);
        });
      }).on("popupopen", () => {
        console.log("popupopen on");
        this.elementRef.nativeElement
        .querySelector(".detailClick1")
        .addEventListener("click", e => {
          this.openDetail(entreprise);
        });
      }).on("popupopen", () => {
        console.log("popupopen on");
        this.elementRef.nativeElement
        .querySelector(".detailClick2")
        .addEventListener("click", e => {
          this.openDetail(entreprise);
        });
      }).on("popupopen", () => {
        console.log("popupopen on");
        this.elementRef.nativeElement
        .querySelector(".detailClick3")
        .addEventListener("click", e => {
          this.openDetail(entreprise);
        });
      })
      ;  
}


openDetail(entreprise: Entreprise)
{
  console.log("openDetail");
  console.log(entreprise);
  let navigationExtras: NavigationExtras = {
    state: {
        entreprise: entreprise//JSON.stringify(entreprise)
    }
};

//this.router.navigate(['/home/entreprise-detail'], navigationExtras);
this.router.navigate(['entreprise-detail'], navigationExtras);

}


async searchEnt(word: string){
  console.log("--  searchEnt start ts -- ");
  await this.db.searchEnt(word).then(async resultsO => { 

    if(resultsO) // Le mot cherché correspond à 1 ou plusieurs entreprises
    {
      console.log("results getEntreprises");
      console.log("resultsO : ",resultsO);
      var resultsS = JSON.stringify(resultsO);
      // console.log("resultsS :" ,resultsS);
      var results = JSON.parse(resultsS);
      console.log("results : ",results);

      if(results.length > 0)
      {
        console.log("-- results > 0 -- ");
        this.entreprisesWP = new Array<any>();

         //TODO : supprimer les markers présents sur la carte
    
        if(this.map.hasLayer(this.m)){
          this.startMarkers.remove(); // Supprime toute la couche 
          this.map.removeLayer(this.m);// Supprime le marker posé précedemment
          this.map.removeLayer(this.startMarkers);

            // do {
            //   console.log("do loop");
            //   this.map.removeLayer(this.m);

            // } while(results.length >= 1);
          }

        for(var i=0; i < results.length ;i++){
          console.log("-- for loop --");
          this.entreprisesWP.push(results[i]);
          this.addMarkerEntreprise(results[i]);
        }  
      
      } 
    // else if(word === " "){
    //     console.log("-- 1 word === '' -- ");
    //     this.startMarkers.remove();

    //     this.loadEntreprises();
    //   }
    // } else if(word === " "){
    // console.log("-- 2 word === '' -- ");
    // // this.startMarkers.remove();
    // this.map.removeLayer(this.startMarkers);
    // this.map.removeLayer(this.m);

    // this.loadEntreprises();

    } else {
      console.log("-- No results ts -- ");

      //TODO : afficher un message si la recherche ne renvoie aucun resultat
      this.map.removeLayer(this.startMarkers);
      this.map.removeLayer(this.m);

      this.startMarkers.remove(); 

      this.setOpen(true);

    // this.loadEntreprises();

    }

  })

}

setOpen(isOpen: boolean) {
  this.isToastOpen = isOpen;
}





private async  loadEntreprises(loadFromWeb: boolean)
{
  if(loadFromWeb)
  {
    console.log("loadEntreprises from web");
  
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
            currentEntreprise.secteur = await this.db.getSecteur(currentEntreprise.code_secteur);
            currentEntreprise.departement = await this.db.getDepartement(currentEntreprise.id_departement);
            //console.log(currentEntreprise.id_departement);
            //console.log(currentEntreprise.departement);
            /*console.log(currentEntreprise.getTypeSecteur(results[i]));
            console.log(currentEntreprise.code_secteur);
            console.log(currentEntreprise.secteur);*/
            await this.db.getEntreprise(results[i]['id']).then(async data =>{
              if(data === undefined){ // id Sqlite undefined => ajout
                //console.log("WP : ",results[i]['id']);

                //console.log("addEnt");
                this.db.addEntreprise(
                  currentEntreprise
                ).then(addEnt => {
                //console.log('home page addEnt');
                //console.log(addEnt);
                  //gérer les secteurs

                  this.entreprisesWP.push(addEnt);
                  //télécharger l'image en local
                  this.downloaderService.downloadImage(currentEntreprise.lien_image, currentEntreprise.name_media, 1);
                })
              }

              else if (data['id_entreprise'] === results[i]['id']){ // id sqlite = id wp => afficher
                this.arrayIdEntreprise.push(data['id_entreprise']);

                /*console.log("results === entDb : "); 
                console.log("SQLite : ",data['id_entreprise']);
                console.log("WP : ",results[i]['id']);*/
                //Mise à jour uniquement si un des champs est différent
                
                var isImageExist = await this.downloaderService.checkImageExist(currentEntreprise.name_media, 1);
                if(currentEntreprise.checkNeedUpdate(results[i]))
                {
                  this.db.updateEntreprise(
                    currentEntreprise
                  ).then(async updateEnt => {
                    if(currentEntreprise.checkImageNeedUpdate(results[i]) || !isImageExist)
                    {
                      this.downloaderService.downloadImage(currentEntreprise.lien_image, currentEntreprise.name_media, 1);
                    }

                    //gérer les secteurs

                    
                  })
                }
                else
                {
                  //console.log(isExists +  " " + currentEntreprise.name_media);
                  if(!isImageExist)
                    {
                      this.downloaderService.downloadImage(currentEntreprise.lien_image, currentEntreprise.name_media, 1);
                    }
                }

                //currentEntreprise.secteur = await this.db.getSecteur(currentEntreprise.code_secteur);

                this.entreprisesWP.push(currentEntreprise);
                return results[i];
              } 
              
            }) 
    
            this.addMarkerEntreprise(currentEntreprise);
          }
          if(this.arrayIdEntreprise.length > 0)
          {
            this.db.deleteEntNotIn(this.arrayIdEntreprise);
            console.log("delete");
          }
      }
      console.log("WP.length : ",this.entreprisesWP.length);

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

async loadDepartements(loadFromWeb: boolean)
{
  if(loadFromWeb)
  {
    console.log("loadDepartements from web");
  
    await this.wordpressService.getDepartementsByPages().then(async resultsO => { // Récupère les données wordpress
      // console.log("results getEntreprises");
      // console.log("resultsO : ",resultsO);
      var resultsS = JSON.stringify(resultsO);
      // console.log("resultsS : ",resultsS);
      var results = JSON.parse(resultsS).reverse();
      console.log("results departement: ",results);
      
      if(results)
      {
        var content = [];
        var currentDepartement;
        console.log(results.length);

          for(var i=0; i < results.length ;i++){
            //this.entreprisesWP.push(results[i]); // Ajout des entreprisesWP de la bdd wordpress dans un tableau Entreprises
          
            currentDepartement = new Departement();
            currentDepartement.fillFromWeb(results[i]);

            await this.db.getDepartement(results[i]['id']).then(async data =>{
              if(data === undefined){ // id Sqlite undefined => ajout
                //console.log("WP departement: ",results[i]['id']);

                //console.log("addDep");
                this.db.addDepartement(
                  currentDepartement
                ).then(addDep => {
                  //console.log('home page addDep');
                  //console.log(addDep);
                  this.departements.push(addDep);
                  //télécharger l'image en local
                  this.downloaderService.downloadImage(currentDepartement.lien_media, currentDepartement.name_media, 3);
                })
              }

              else if (data['id_departement'] === results[i]['id']){ // id sqlite = id wp => afficher
                this.arrayIdDepartement.push(data['id_departement']);

                /*console.log("results === entrepriseDb : "); 
                console.log("SQLite : ",data['id_departement']);
                console.log("WP : ",results[i]['id']);*/
                //Update uniquement si un des champs est différents

                var isImageExist = await this.downloaderService.checkImageExist(currentDepartement.name_media, 3);
                if(currentDepartement.checkNeedUpdate(results[i]))
                {
                  this.db.updateEntreprise(
                    currentDepartement
                  ).then(async updateEnt => {
                    //TODO : maj image si différente
                    if(currentDepartement.checkImageNeedUpdate(results[i]) || !isImageExist)
                    {
                      this.downloaderService.downloadImage(currentDepartement.lien_media, currentDepartement.name_media, 3);
                    }

                    this.departements.push(currentDepartement);
                  })
                }
                else
                {
                  if(!isImageExist)
                  {
                    this.downloaderService.downloadImage(currentDepartement.lien_media, currentDepartement.name_media, 3);
                  }
                  this.departements.push(currentDepartement);
                }
                return results[i];
              } 
              
            }) 
          }
          if(this.arrayIdDepartement.length > 0)
          {
            this.db.deleteDepartementNotIn(this.arrayIdDepartement);
            console.log("delete");
          }
      }
      console.log("WP.length : ",this.departements.length);

    })
  }
  else
  {
      console.log("load from bdd");
      // pas de connexion donc chargement depuis BDD
      await this.db.loadDepartements().then(async departements =>{
        console.log(departements);
        this.departements = departements;
        /*for(var i=0; i < departements.length ;i++){
          this.departements.push(departements[i]);
        }*/
      });
  }
}


async loadSecteurs(loadFromWeb: boolean)
{
  if(loadFromWeb)
  {
    console.log("loadSecteurs from web");

    /*this.wordpressService.getAllSecteurs(1,10, 'commercants_restaurants_france', [])).subscribe(response => {
      console.log(response);
    });*/

    /*this.wordpressService.getByPageNext().subscribe(data => {
      console.log(data);
      console.log("The results type is", typeof data);
    });
      */

    /*this.wordpressService.getSss().subscribe(
      response => {
          console.log(response);
      }
    );*/
  
    await this.loadSecteurByActivite('commercants_restaurants_france');
    await this.loadSecteurByActivite('producteurs_fabricants_france');
    await this.loadSecteurByActivite('services_alapersonne_france');
    await this.loadSecteurByActivite('services_entreprises_france');
    
    if(this.arrayIdSecteur.length > 0)
    {
      this.db.deleteSecteurNotIn(this.arrayIdSecteur);
      console.log("delete");
    }
  }
  else
  {
      console.log("load from bdd");
      // pas de connexion donc chargement depuis BDD
      await this.db.loadSecteurs().then(async secteurs =>{
        console.log(secteurs);
        this.secteurs = secteurs;
        /*for(var i=0; i < entreprises.length ;i++){
          
        }*/
      });
  }
}


async loadDatas()
{
  const status = await Network.getStatus();
  var isLoadFromWeb : boolean = false;
  console.log(status);
  if(status && status.connected == true)// && status.connectionType != ConnectionType.unknow && status.connectionType != ConnectionType.none)
  {
    console.log("load from web");
    isLoadFromWeb = true;
  }
  else{
    isLoadFromWeb = false;
  }

  await this.downloaderService.mkDirsLogo();
  //peux se faire en arrière plan
  this.loadEntreprises(isLoadFromWeb);

  await this.loadDepartements(isLoadFromWeb);
  await this.loadSecteurs(isLoadFromWeb);
  
}


private async loadSecteurByActivite(currentActivite: string)
{
  var currentSecteur: Secteur;
  console.log(currentActivite);
  //await this.wordpressService.getSecteursByPages(1, 10, currentActivite, []).subscribe(async response => { // Récupère les données wordpress
  await this.wordpressService.getSecteursByPages(1, 100, currentActivite).then(async resultsO => { // Récupère les données wordpress
  //await this.wordpressService.getSecteurs(1, 10, 'commercants_restaurants_france', []).subscribe(async response => {
    //console.log("The results type is", typeof results);
    //console.log(resultsO);
    //console.log("The results0 type is", typeof resultsO);
  // console.log("results getEntreprises");
    // console.log("resultsO : ",resultsO);
    var resultsS = JSON.stringify(resultsO);
    // console.log("resultsS : ",resultsS);
    var results = JSON.parse(resultsS).reverse();
    //console.log("results secteurs : ",results);
    //var results = JSON.stringify(resultsO);
    //var results = resultsO;
    //if( 1 != 1)
    if(results)
    {
      var content = [];
      
      console.log(results.length);

        for(var i=0; i < results.length ;i++){
          //this.entreprisesWP.push(results[i]); // Ajout des entreprisesWP de la bdd wordpress dans un tableau Entreprises
          if(Number(results[i]['count']) > 0)
          {
            currentSecteur = new Secteur();
            currentSecteur.fillFromWeb(results[i]);

            await this.db.getSecteur(results[i]['id']).then(async data =>{
              //console.log("WP secteur: ",results[i]['id']);
              if(data === undefined){ // id Sqlite undefined => ajout
                //console.log("addSecteur");
                this.db.addSecteur(
                  currentSecteur
                ).then(addSecteur => {
                  if(addSecteur !== undefined)
                  {
                    //console.log('home page addSecteur');
                    //console.log(addSecteur);
                    this.secteurs.push(addSecteur);
                  }
                  //télécharger l'image en local
                  this.downloaderService.downloadImage(currentSecteur.lien_media, currentSecteur.name_media, 2);
                })
              }

              else if (data['id_secteur'] === results[i]['id']){ // id sqlite = id wp => afficher
                this.arrayIdSecteur.push(data['id_secteur']);

                /*console.log("results === secteurDb : "); 
                console.log("SQLite : ",data['id_secteur']);
                console.log("WP : ",results[i]['id']);*/
                //Update uniquement si un des champs est différents
                //this.downloaderService.downloadImage(results[i]['image_term']['sizes']['thumbnail'],results[i]['image_term']['filename'], 2);

                var isImageExist = await this.downloaderService.checkImageExist(currentSecteur.name_media, 2);
                if(currentSecteur.checkNeedUpdate(results[i]))
                {
                  this.db.updateSecteur(
                    currentSecteur
                  ).then(async updateEnt => {
                    //TODO : maj image si différente
                    if(currentSecteur.checkImageNeedUpdate(results[i]) || !isImageExist )
                    {
                      this.downloaderService.downloadImage(currentSecteur.lien_media, currentSecteur.name_media, 2);
                    }

                    this.secteurs.push(currentSecteur);
                  })
                }
                else
                {
                  if(!isImageExist)
                  {
                    this.downloaderService.downloadImage(currentSecteur.lien_media, currentSecteur.name_media, 2);
                  }
                  this.secteurs.push(currentSecteur);
                }
                //return results[i];
              }
              
            }) 
          }
        }
        console.log("WP.length : ",this.secteurs.length);
    }
  })
}

  
}