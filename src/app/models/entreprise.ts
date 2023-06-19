/*import { Injectable } from '@angular/core';
import '@capacitor-community/sqlite';

import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
*/


export class Entreprise {
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
  id_departement: number;
  sous_titre_entreprise: string = '';
  lien_image: string = '';
  
  public toInsert(){
  	return [this.id_entreprise, 
  	  this.nom_entreprise, 
  	  this.telephone_entreprise,
	  this.adresse_entreprise,
	  this.sous_titre_entreprise,
	  this.infos_entreprise,
	  this.description_entreprise,
	  this.site_internet_entreprise,
	  this.reseaux_sociaux_entreprise,
	  this.monnaie_locale_entreprise,
	  this.livraison_entreprise,
	  this.latitude_entreprise,
	  this.longitude_entreprise,
	  this.id_departement,
	  this.lien_image,
	];
  }
  
  public toUpdate()
  {
    return [
      	  this.nom_entreprise, 
  	  this.telephone_entreprise,
	  this.adresse_entreprise,
	  this.sous_titre_entreprise,
	  this.infos_entreprise,
	  this.description_entreprise,
	  this.site_internet_entreprise,
	  this.reseaux_sociaux_entreprise,
	  this.monnaie_locale_entreprise,
	  this.livraison_entreprise,
	  this.latitude_entreprise,
	  this.longitude_entreprise,
	  this.id_departement,
	  this.lien_image,
	];
  }
  
  public fill(datas)
  {
  	console.log('fill');
  	//console.log(datas);
	this.id_entreprise = datas.id_entreprise;
	this.nom_entreprise = datas.nom_entreprise;
	
	this.sous_titre_entreprise = datas.sous_titre_entreprise;
        this.site_internet_entreprise = datas.site_internet_entreprise;
        
        this.latitude_entreprise = datas.latitude_entreprise;
        this.longitude_entreprise = datas.longitude_entreprise;
        this.lien_image = datas.lien_image;
  
  }
  
  public fillFromWeb(datas)
  {
  	console.log('fillFromWeb');
  	/*console.log(datas);
  	console.log(datas.id);
  	console.log(datas['id']);*/
	this.id_entreprise = datas['id'];
	this.nom_entreprise = datas['title']['rendered'];
	
	this.sous_titre_entreprise = datas['meta']['sous-titre'];
        this.site_internet_entreprise = datas['meta']['site_internet'][0];
        
        var coords =  datas['meta']['sur_la_carte'];
        this.latitude_entreprise = coords[0]['lat'];
        this.longitude_entreprise = coords[0]['lng']
        this.lien_image = datas['meta']['link_media'];
  
  }
}



