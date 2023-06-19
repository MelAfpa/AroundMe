import { Injectable } from '@angular/core';
import '@capacitor-community/sqlite';

import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';



export interface Ent {
  id_entreprise: number,
  nom_entreprise: string,
  telephone_entreprise: string,
  adresse_entreprise: string,
  infos_entreprise: string,
  description_entreprise: string,
  site_internet_entreprise: string,
  reseaux_sociaux_entreprise: string,
  monnaie_locale_entreprise: boolean,
  livraison_entreprise: boolean,
  latitude_entreprise: number,
  longitude_entreprise: number,
  id_departement: number,
}



@Injectable({
  providedIn: 'root'
})

  export class DbService {

    private database: SQLiteObject;
    private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

    entreprise = new BehaviorSubject([]);


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
    this.http.get('assets/dbV4.sql', { responseType: 'text'})
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
  loadEntreprise() {
    return this.database.executeSql('SELECT * FROM entreprise', []).then(data => {
      let entreprise: Ent[] = [];
      
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
        

          entreprise.push({
            id_entreprise: data.rows.item(i).id_entreprise,
            nom_entreprise: data.rows.item(i).nom_entreprise,
            telephone_entreprise: data.rows.item(i).telephone_entreprise,
            adresse_entreprise: data.rows.item(i).adresse_entreprise,
            infos_entreprise: data.rows.item(i).infos_entreprise,
            description_entreprise: data.rows.item(i).description_entreprise,
            site_internet_entreprise: data.rows.item(i).site_internet_entreprise,
            reseaux_sociaux_entreprise: data.rows.item(i).reseaux_sociaux_entreprise,
            monnaie_locale_entreprise: data.rows.item(i).monnaie_locale_entreprise,
            livraison_entreprise: data.rows.item(i).livraison_entreprise,
            latitude_entreprise: data.rows.item(i).latitude_entreprise,
            longitude_entreprise: data.rows.item(i).longitude_entreprise,
            id_departement: data.rows.item(i).id_departement

          });
        }
      }
console.log('dbService',entreprise);
      this.entreprise.next(entreprise);
    });
  }


/**
 * Cherche et affiche l'entreprise dont l'identifiant correspond à l'identifiant saisie en paramètre
 * @param {any} id_entreprise
 * @returns {any}
 */
  getEntreprise(id_entreprise): Promise<Ent> {
    return this.database.executeSql('SELECT * FROM entreprise WHERE id_entreprise = ?', [id_entreprise]).then(data => {

      if(data && data.rows && data.rows.length >0)

      { 
        return {
          id_entreprise: data.rows.item(0).id_entreprise,
          nom_entreprise: data.rows.item(0).nom_entreprise,
          telephone_entreprise: data.rows.item(0).telephone_entreprise,
          adresse_entreprise: data.rows.item(0).adresse_entreprise,
          infos_entreprise: data.rows.item(0).infos_entreprise,
          description_entreprise: data.rows.item(0).description_entreprise,
          site_internet_entreprise: data.rows.item(0).site_internet_entreprise,
          reseaux_sociaux_entreprise: data.rows.item(0).reseaux_sociaux_entreprise,
          monnaie_locale_entreprise: data.rows.item(0).monnaie_locale_entreprise,
          livraison_entreprise: data.rows.item(0).livraison_entreprise,
          latitude_entreprise: data.rows.item(0).latitude_entreprise,
          longitude_entreprise: data.rows.item(0).longitude_entreprise,
          id_departement: data.rows.item(0).id_departement
        }
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
  getEnt(): Observable<Ent[]>{
    return this.entreprise.asObservable();
  }

  async searchEnt(word: string){
console.log("searchEnt start");

    return await this.database.executeSql("SELECT nom_entreprise from entreprise where nom_entreprise LIKE '%?%'", [word]).then(async data=> {
      this.getEnt();
console.log("before loop");
console.log(JSON.stringify(data)); 

      if(data.rows.length > 0){
        console.log('if loop');
      // this.pushEntreprise(data);
        return data.rows;
      } else {
        console.log("Aucun résultat");
      }
console.log("end db function");
      
    })
  }

  // async pushEntreprise(data){
  //   var entreprise: Ent[] = [];

  //   for(let i = 0; i < data.rows.length; i++){
  //     return {
  //       id_entreprise: data.rows.item(0).id_entreprise,
  //       nom_entreprise: data.rows.item(0).nom_entreprise,
  //       telephone_entreprise: data.rows.item(0).telephone_entreprise,
  //       adresse_entreprise: data.rows.item(0).adresse_entreprise,
  //       infos_entreprise: data.rows.item(0).infos_entreprise,
  //       description_entreprise: data.rows.item(0).description_entreprise,
  //       site_internet_entreprise: data.rows.item(0).site_internet_entreprise,
  //       reseaux_sociaux_entreprise: data.rows.item(0).reseaux_sociaux_entreprise,
  //       monnaie_locale_entreprise: data.rows.item(0).monnaie_locale_entreprise,
  //       livraison_entreprise: data.rows.item(0).livraison_entreprise,
  //       latitude_entreprise: data.rows.item(0).latitude_entreprise,
  //       longitude_entreprise: data.rows.item(0).longitude_entreprise,
  //       id_departement: data.rows.item(0).id_departement
  //     }
  //   }
  // }

  addEntreprise(nom_entreprise, id_entreprise, telephone_entreprise, adresse_entreprise, infos_entreprise, description_entreprise, 
                site_internet_entreprise, reseaux_sociaux_entreprise, monnaie_locale_entreprise, livraison_entreprise, latitude_entreprise, 
                longitude_entreprise, id_departement) {

    let data = [nom_entreprise, id_entreprise, telephone_entreprise, adresse_entreprise, infos_entreprise, description_entreprise, 
  site_internet_entreprise, reseaux_sociaux_entreprise, monnaie_locale_entreprise, livraison_entreprise, latitude_entreprise, 
  longitude_entreprise, id_departement];

  return this.database.executeSql('INSERT INTO entreprise (nom_entreprise, id_entreprise, telephone_entreprise, adresse_entreprise, infos_entreprise, description_entreprise, site_internet_entreprise, reseaux_sociaux_entreprise, monnaie_locale_entreprise, livraison_entreprise, latitude_entreprise, longitude_entreprise, id_departement) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)', data).then(data => {
    
    this.loadEntreprise();
  });
}


  updateEntreprise(ent: Ent) {
    let data = [ent.nom_entreprise, ent.id_entreprise, ent.telephone_entreprise];
    return this.database.executeSql(`UPDATE entreprise SET nom_entreprise = ?, id_entreprise = ?, telephone_entreprise = ?, 
                                    adresse_entreprise = ?, infos_entreprise = ?, description_entreprise = ?, site_internet_entreprise = ?, 
                                    reseaux_sociaux_entreprise = ?, monnaie_locale_entreprise = ?, livraison_entreprise = ?, latitude_entreprise = ?, 
                                    longitude_entreprise = ?, id_departement = ? WHERE id = ${ent.id_entreprise}`, data).then(data => {
                                      
                                      alert('Entreprise modifiée');
                                      this.loadEntreprise();
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
