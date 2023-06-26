import { Injectable } from '@angular/core';
import '@capacitor-community/sqlite';

import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';

import {Entreprise} from '../models/entreprise';
import {Departement} from '../models/departement';
import {Secteur} from '../models/secteur';

@Injectable({
  providedIn: 'root'
})

  export class DbService {

    private database: SQLiteObject;
    private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

    entreprises = new BehaviorSubject([]);
    departements = new BehaviorSubject([]);
    secteurs = new BehaviorSubject([]);

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
    this.http.get('assets/dbV6.sql', { responseType: 'text'})
    .subscribe(sql => {
      this.sqlitePorter.importSqlToDb(this.database, sql)
        .then(_ => {
          //this.loadEntreprise();
          this.dbReady.next(true);
        })
        .catch(e => console.error(e));
    });
  }

  degToRad(deg: number): number{
    return deg * (Math.PI / 180.0);
  };


/**
 * Charge et retourne les entreprises de la base de données
 * @returns {any}
 */
  async loadEntreprise() {
    let entreprises: Entreprise[] = [];
    await this.database.executeSql('SELECT * FROM entreprise', []).then(async data => {
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {

          var currentEntreprise = new Entreprise();
          currentEntreprise.fill(data.rows.item(i));    
          currentEntreprise.secteur = await this.getSecteur(currentEntreprise.code_secteur);
          currentEntreprise.departement = await this.getDepartement(currentEntreprise.id_departement);
              

          entreprises.push(currentEntreprise);
        }
      }
	    console.log('dbService', entreprises);
      this.entreprises.next(entreprises);
      //return entreprises;
    }).catch((err) => {
    	//return undefined;
    });
    return entreprises;
  }


/**
 * Cherche et affiche l'entreprise dont l'identifiant correspond à l'identifiant saisie en paramètre
 * @param {any} id_entreprise
 * @returns {any}
 */
getEntreprise(id_entreprise): Promise<Entreprise> {
  return this.database.executeSql('SELECT * FROM entreprise WHERE id_entreprise = ?', [id_entreprise]).then(async data => {

  if(data && data.rows && data.rows.length >0)

  { 
    var currentEntreprise = new Entreprise();      
    currentEntreprise.fill(data.rows.item(0));    
    currentEntreprise.secteur = await this.getSecteur(currentEntreprise.code_secteur);
    currentEntreprise.departement = await this.getDepartement(currentEntreprise.id_departement);
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
    let entreprises: Entreprise[] = [];

    var query = "SELECT * from entreprise where nom_entreprise LIKE '%"+word+"%'";
    var params = [];
    await this.database.executeSql(query, params).then(async data => {
      console.log("data : ",data); 

      if(data && data.rows && data.rows.length >0){
        for (var i = 0; i < data.rows.length; i++) {
          var currentEntreprise = new Entreprise();
          currentEntreprise.fill(data.rows.item(i));        
          currentEntreprise.secteur = await this.getSecteur(currentEntreprise.code_secteur);
          currentEntreprise.departement = await this.getDepartement(currentEntreprise.id_departement);

          entreprises.push(currentEntreprise);
        }
        console.log(entreprises);
      } else{
        console.log("Error");
      }
    
    }).catch((err)=>{
      console.log("searchEnt err");
      console.log(JSON.stringify(err));
      //return undefined;
    });
      
    console.log("-- end search function ");
    return entreprises;
  }

  addEntreprise(entreprise: Entreprise){

    return this.database.executeSql('INSERT INTO entreprise (id_entreprise, nom_entreprise, telephone_entreprise, adresse_entreprise, sous_titre_entreprise, infos_entreprise, description_entreprise, site_internet_entreprise, reseaux_sociaux_entreprise, monnaie_locale_entreprise, livraison_entreprise, latitude_entreprise, longitude_entreprise, id_departement, lien_image, name_media, md5_media) '
    + ' VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?)', entreprise.toInsert()).then(data => {
          
      console.log('db.Service addEntreprise data');
      console.log(data);
  
        //entreprise.id_entreprise = data.id_entreprise;
	//return entreprise;
  
  });
}


   updateEntreprise(entreprise: Entreprise) {
  //   let data = [ent.nom_entreprise, ent.id_entreprise, ent.telephone_entreprise];
     return this.database.executeSql(`UPDATE entreprise SET nom_entreprise = ?, telephone_entreprise = ?, 
                                    adresse_entreprise = ?, sous_titre_entreprise = ?, infos_entreprise = ?, description_entreprise = ?, site_internet_entreprise = ?, 
                                    reseaux_sociaux_entreprise = ?, monnaie_locale_entreprise = ?, livraison_entreprise = ?, latitude_entreprise = ?, 
                                    longitude_entreprise = ?, id_departement = ?, lien_image = ?, name_media = ?, md5_media = ? WHERE id_entreprise = ${entreprise.id_entreprise}`, entreprise.toUpdate()).then(data => {
                                      
       //alert('Entreprise modifiée');
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
    return await this.database.executeSql('DELETE FROM entreprise WHERE id_entreprise not IN (?)', [array])
    .then(data=>{
      console.log(JSON.stringify(data)); 
    }).catch((err)=>{
      console.log("error deleteEnttNotIn");
      console.log(JSON.stringify(err))
      console.log(array);
    });
  }




  /****************   DEPARTEMENT   ************************ */


  /**
 * Charge et retourne les entreprises de la base de données
 * @returns {any}
 */
  async loadDepartements() {
    let departements: Departement[] = [];
    await this.database.executeSql('SELECT * FROM departement', []).then(data => {
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {

          var currentDepartement = new Departement();
          currentDepartement.fill(data.rows.item(i));        

          departements.push(currentDepartement);
        }
      }
	    console.log('dbService', departements);
      this.departements.next(departements);
      //return entreprises;
    }).catch((err) => {
    	//return undefined;
    });
    return departements;
  }


/**
 * Cherche et affiche le deparement dont l'identifiant correspond à l'identifiant saisie en paramètre
 * @param {any} id_departement
 * @returns {any}
 */
getDepartement(id_departement): Promise<Departement> {
  if(id_departement !== null && id_departement !== undefined)
  {
    return this.database.executeSql('SELECT * FROM departement WHERE id_departement = ?', [id_departement]).then(data => {

      if(data && data.rows && data.rows.length >0)

      { 
        var currentDepartement = new Departement();      
        currentDepartement.fill(data.rows.item(0));        
        return currentDepartement;
      }
      else
      {
        return undefined;
      } 
      }).catch((err)=>{
        console.log("getDepartemrent err");
        console.log(JSON.stringify(err));
        return undefined;
      });
  }
  else
    return null;
}


  async addDepartement(departement: Departement){

    return await this.database.executeSql('INSERT INTO departement (id_departement, nom_departement, numero_departement, slug_departement, name_media, md5_media)' 
      + 'VALUES (?, ?, ?, ?, ?, ?)', departement.toInsert()).then(data => {
                  console.log('db.Service addEntreprise data');
                  console.log(data);
                  departement.id_departement = data.insertId;
                  return departement;
        
    
          //entreprise.id_entreprise = data.id_entreprise;
    //return entreprise;
    
    });
  }
  
  
     updateDepartement(departement: Departement) {
    //   let data = [ent.nom_entreprise, ent.id_entreprise, ent.telephone_entreprise];
       return this.database.executeSql(`UPDATE departement SET nom_departement = ?, numero_departement = ?, slug_departement = ?, name_media = ?, md5_media = ? 
         WHERE id_departement = ${departement.id_departement}`, departement.toUpdate()).then(data => {
                                        
         //alert('Entreprise modifiée');
       })
     }
  
  
    // deleteEntreprise(id_entreprise) {
    //   return this.database.executeSql('DELETE FROM entreprise WHERE id_entreprise = ?', [id_entreprise]).then(_ => {
    //     alert('Entreprise supprimée');
    //     this.loadEntreprise();
    //   });
    // }
  
    async deleteDepartementNotIn(arrayIdDepartement: Array<any>)
    {
      let array = '(' + arrayIdDepartement.join(',') + ')';
      console.log(array);
      return await this.database.executeSql('DELETE FROM departement WHERE id_entreprise not IN (?)', [array])
      .then(data=>{
        console.log(JSON.stringify(data)); 
      }).catch((err)=>{
        console.log("error deleteDepartementtNotIn");
        console.log(JSON.stringify(err))
        console.log(array);
      });
    }

    /****************   SECTEUR   ************************ */


  /**
   * Charge et retourne les entreprises de la base de données
   * @returns {any}
   */
  async loadSecteurs() {
    let secteurs: Secteur[] = [];
    await this.database.executeSql('SELECT * FROM secteur', []).then(data => {
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {

          var currentSecteur = new Secteur();
          currentSecteur.fill(data.rows.item(i));        

          secteurs.push(currentSecteur);
        }
      }
	    console.log('dbService', secteurs);
      this.secteurs.next(secteurs);
      //return entreprises;
    }).catch((err) => {
    	//return undefined;
    });
    return secteurs;
  }

/**
 * Cherche et affiche le deparement dont l'identifiant correspond à l'identifiant saisie en paramètre
 * @param {any} id_departement
 * @returns {any}
 */
getSecteur(id_secteur): Promise<Secteur> {
  if(id_secteur !== null && id_secteur !== undefined)
  {
    return this.database.executeSql('SELECT * FROM secteur WHERE id_secteur = ?', [id_secteur]).then(data => {

      if(data && data.rows && data.rows.length >0)

      { 
        var currentSecteur = new Secteur();      
        currentSecteur.fill(data.rows.item(0));        
        return currentSecteur;
      }
      else
      {
        return undefined;
      } 
      }).catch((err)=>{
        console.log("getSecteur err");
        console.log(JSON.stringify(err));
        return undefined;
      });
  }
  return null;

}


async addSecteur(secteur: Secteur){

  return await this.database.executeSql('INSERT INTO secteur (id_secteur, nom_secteur, code_type_activite, slug_secteur, name_media, md5_media)' 
    + 'VALUES (?, ?, ?, ?, ?, ?)', secteur.toInsert()).then(data => {
                console.log('db.Service addSecteur data');
                console.log(data);
                secteur.id_secteur = data.insertId;
                return secteur;
      
  
        //entreprise.id_entreprise = data.id_entreprise;
  //return entreprise;
  
  }).catch((err)=>{
    console.log("error addSecteur");
    console.log(JSON.stringify(err));
    console.log(JSON.stringify(secteur));
    return null;
  });;
}


  updateSecteur(secteur: Secteur) {
//   let data = [ent.nom_entreprise, ent.id_entreprise, ent.telephone_entreprise];
    return this.database.executeSql(`UPDATE secteur SET nom_secteur = ?, code_type_activite = ?, slug_secteur = ?, name_media = ?, md5_media = ? 
      WHERE id_departement = ${secteur.id_secteur}`, secteur.toUpdate()).then(data => {
                                    
      //alert('Entreprise modifiée');
    })
  }


async deleteSecteurNotIn(arrayIdSecteur: Array<any>)
{
  let array = '(' + arrayIdSecteur.join(',') + ')';
  console.log(array);
  return await this.database.executeSql('DELETE FROM secteur WHERE id_secteur not IN (?)', [array])
  .then(data=>{
    console.log(JSON.stringify(data)); 
  }).catch((err)=>{
    console.log("error deleteSecteurNotIn");
  });
}



}
