import { Injectable } from '@angular/core';
import '@capacitor-community/sqlite';

import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';

import {Entreprise} from '../models/entreprise';


@Injectable({
  providedIn: 'root'
})

  export class DbService {

    private database: SQLiteObject;
    private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

    entreprises = new BehaviorSubject([]);


  constructor(private plt: Platform, 
              private sqlitePorter: SQLitePorter, 
              private sqlite: SQLite, 
              private http: HttpClient
              ) {         
                this.plt.ready().then(() => {
                  this.sqlite.create({
                    name: 'entreprise.db',
                    location: 'default'
                  })
                  .then((db: SQLiteObject) => {
                      this.database = db;
                      this.createDatabase();
                  });
                });

                }

/**
 * Crée  la base de données à partir du fichier SQL mentionné
 * @returns {any}
 */
  createDatabase() {
    this.http.get('assets/dbV5.sql', { responseType: 'text'})
    .subscribe(sql => {
      this.sqlitePorter.importSqlToDb(this.database, sql)
        .then(_ => {
          this.loadEntreprise();
          this.dbReady.next(true);
        })
        .catch(e => console.error(e));
    });
  }

/**
 * Charge et retourne les entreprises de la base de données
 * @returns {any}
 */
  async loadEntreprise() {
    let entreprises: Entreprise[] = [];
    await this.database.executeSql('SELECT * FROM entreprise', []).then(data => {
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {

	  var currentEntreprise = new Entreprise();
	  currentEntreprise.fill(data.rows.item(i));        

	   entreprises.push(currentEntreprise);
        }
      }
	console.log('dbService', entreprises);
      this.entreprises.next(entreprises);
      //return entreprises;
    }).catch((err) => {
    	return undefined;
    });
    return entreprises;
  }


/**
 * Cherche et affiche l'entreprise dont l'identifiant correspond à l'identifiant saisie en paramètre
 * @param {any} id_entreprise
 * @returns {any}
 */
  getEntreprise(id_entreprise): Promise<Entreprise> {
    return this.database.executeSql('SELECT * FROM entreprise WHERE id_entreprise = ?', [id_entreprise]).then(data => {

      if(data && data.rows && data.rows.length >0)

      { 
        var currentEntreprise = new Entreprise();      
        currentEntreprise.fill(data.rows.item(0));        
        return currentEntreprise;
      }
      else
      {
        return undefined;
      } 
      }).catch((err)=>{
        console.log("getEntreprise err");
        console.log(JSON.stringify(err));
        return undefined;
      });

  }

/**
 * Vérifie l'état de la base de données
 * @returns {any}
 */
  getDatabaseState() {
    return this.dbReady.asObservable();
  }

  /**
 * Affiche les entreprises
 * @returns {any}
 */
  getEnt(): Observable<Entreprise[]>{
    return this.entreprises.asObservable();
  }

  async searchEnt(word: string){
console.log("searchEnt start");

    return await this.database.executeSql("SELECT nom_entreprise from entreprise where nom_entreprise LIKE '%?%'", [word]).then(async data=> {
      this.getEnt();
console.log("before loop");
console.log(JSON.stringify(data)); 

      if(data.rows.length > 0){
        console.log('if loop');
        console.log(data.rows);
        //this.loadEntreprise();
        return data.rows;
      } else {
        console.log("Aucun résultat");
      }
console.log("end db function");
      
    })
  }

  addEntreprise(entreprise: Entreprise){

  return this.database.executeSql('INSERT INTO entreprise (id_entreprise, nom_entreprise, telephone_entreprise, adresse_entreprise, sous_titre_entreprise, infos_entreprise, description_entreprise, site_internet_entreprise, reseaux_sociaux_entreprise, monnaie_locale_entreprise, livraison_entreprise, latitude_entreprise, longitude_entreprise, id_departement, lien_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?)', entreprise.toInsert()).then(data => {
  });
}


   updateEntreprise(entreprise: Entreprise) {
  //   let data = [ent.nom_entreprise, ent.id_entreprise, ent.telephone_entreprise];
     return this.database.executeSql(`UPDATE entreprise SET nom_entreprise = ?, id_entreprise = ?, telephone_entreprise = ?, 
                                    adresse_entreprise = ?, sous_titre_entreprise = ?, infos_entreprise = ?, description_entreprise = ?, site_internet_entreprise = ?, 
                                    reseaux_sociaux_entreprise = ?, monnaie_locale_entreprise = ?, livraison_entreprise = ?, latitude_entreprise = ?, 
                                    longitude_entreprise = ?, id_departement = ?, lien_image = ? WHERE id_entreprise = ${entreprise.id_entreprise}`, entreprise.toUpdate()).then(data => {
                                      
       alert('Entreprise modifiée');
     })
   }


  // deleteEntreprise(id_entreprise) {
  //   return this.database.executeSql('DELETE FROM entreprise WHERE id_entreprise = ?', [id_entreprise]).then(_ => {
  //     alert('Entreprise supprimée');
  //     this.loadEntreprise();
  //   });
  // }

  async deleteEntNotIn(arrayIdEntreprise: Array<any>)
  {
    let array = '(' + arrayIdEntreprise.join(',') + ')';
    console.log(array);
    return await this.database.executeSql('DELETE FROM entreprise WHERE id_entreprise not IN ?', [array])
    .then(data=>{
      console.log(JSON.stringify(data)); 
    }).catch((err)=>{
      console.log("error deleteEnttNotIn");
    });
  }

}
