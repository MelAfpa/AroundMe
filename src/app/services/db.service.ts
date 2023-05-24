import { Injectable } from '@angular/core';
import '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';
import { JsonSQLite, CapacitorSQLite, SQLiteDBConnection, SQLiteConnection, capSQLiteSet,
  capSQLiteChanges, capSQLiteValues, capEchoResult, capSQLiteResult } from '@capacitor-community/sqlite';
import { switchMap } from 'rxjs/operators';
import { AlertController, Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, from, of, Observable } from 'rxjs';
import { Device } from '@capacitor/device';
import { Storage } from '@capacitor/storage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';

const DB_SETUP_KEY = 'first_db_setup';
const DB_NAME_KEY = 'db_name';

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
  id_departement: number

}


@Injectable({
  providedIn: 'root'
})

  
  export class DbService {

    private database: SQLiteObject;
    private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

    entreprise = new BehaviorSubject([]);
  // dbReady = new BehaviorSubject(false); // Empêcher les requêtes tant que la BDD n'est pas prête
  // dbName = '';

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
                      this.seedDatabase();
                  });
                });

                }

  seedDatabase() {
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

  addEntreprise(nom_entreprise, id_entreprise, telephone_entreprise, adresse_entreprise, infos_entreprise, description_entreprise, site_internet_entreprise, reseaux_sociaux_entreprise, monnaie_locale_entreprise, livraison_entreprise, latitude_entreprise, longitude_entreprise, id_departement) {
    let data = [nom_entreprise, id_entreprise, telephone_entreprise, adresse_entreprise, infos_entreprise, description_entreprise, site_internet_entreprise, reseaux_sociaux_entreprise, monnaie_locale_entreprise, livraison_entreprise, latitude_entreprise, longitude_entreprise, id_departement];
    return this.database.executeSql('INSERT INTO entreprise (nom_entreprise, id_entreprise, telephone_entreprise, adresse_entreprise, infos_entreprise, description_entreprise, site_internet_entreprise, reseaux_sociaux_entreprise, monnaie_locale_entreprise, livraison_entreprise, latitude_entreprise, longitude_entreprise, id_departement) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)', data).then(data => {
      this.loadEntreprise();
    });
  }

  getEntreprise(id_entreprise): Promise<Ent> {
    return this.database.executeSql('SELECT * FROM entreprise WHERE id_entreprise = ?', [id_entreprise]).then(data => {

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

    });

  }

  deleteEntreprise(id_entreprise) {
    return this.database.executeSql('DELETE FROM entreprise WHERE id_entreprise = ?', [id_entreprise]).then(_ => {
      this.loadEntreprise();
    });
  }

  getDatabaseState() {
    return this.dbReady.asObservable();
  }

  getEnt(): Observable<Ent[]>{
    return this.entreprise.asObservable();
  }

  updateEntreprise(ent: Ent) {
    let data = [ent.nom_entreprise, ent.id_entreprise, ent.telephone_entreprise];
    return this.database.executeSql(`UPDATE entreprise SET nom_entreprise = ?, id_entreprise = ?, telephone_entreprise = ?, adresse_entreprise = ?, infos_entreprise = ?, description_entreprise = ?, site_internet_entreprise = ?, reseaux_sociaux_entreprise = ?, monnaie_locale_entreprise = ?, livraison_entreprise = ?, latitude_entreprise = ?, longitude_entreprise = ?, id_departement = ? WHERE id = ${ent.id_entreprise}`, data).then(data => {
      this.loadEntreprise();
    })
  }

  // searchEnt(word: string){
  //   return this.database.executeSql('SELECT * from entreprise where nom_entreprise LIKE `%?%`', [word]).then(_=> {
  //     this.loadEntreprise();
  //   })
  // }

  // createMarker(){
  //   return this.database.executeSql('SELECT nom_entreprise, infos_entreprise, site_internet_entreprise, latitude_entreprise, longitude_entreprise from entreprise').then(_ => {
  //     this.loadEntreprise();
  //   });
  // }

  // test(){
  //   return this.database.executeSql('SELECT * from entreprise', ).then(_=> {
  //     this.loadEntreprise();
  //   })
  // }




// // Demandes de permissions pour utiliser la BDD
//   async init(): Promise<void> {
//     const info = await Device.getInfo();

//     if (info.platform === 'android') {
//       try {
//         const sqlite = CapacitorSQLite as any;
//         await sqlite.requestPermissions();
//         this.setupDatabase();
// console.log("init if try");//

//       } catch (e) {
//         const alert = await this.alertCtrl.create({
//           header: 'No DB access',
//           message: 'This app can\'t work without Database access.',
//           buttons: ['OK']
//         });
//         await alert.present();
// // console.log("init if catch");

//       }
//     } else {
//       this.setupDatabase();
// // console.log("init else");

//     }
// // console.log("init away loop");

  
//   }

//   // Téléchargement et importation de la BDD
//   private async setupDatabase() {
//     const dbSetupDone = await Storage.get({ key: DB_SETUP_KEY });
//     await CapacitorSQLite.createConnection({ database: this.dbName })
// console.log(dbSetupDone.value);
// console.log(!dbSetupDone.value);

//     if (!dbSetupDone.value) {
//       this.downloadDatabase();
// console.log("setupDatabase if");
//     } else {
//       this.dbName = (await Storage.get({ key: DB_NAME_KEY })).value;
//       await CapacitorSQLite.open({ database: this.dbName });
//       this.dbReady.next(true);

// console.log("setupDatabase else");

//     }
// console.log("setupDatabase away loop"); //

//   }

//   // Potentially build this out to an update logic:
//   // Sync your data on every app start and update the device DB
//   private downloadDatabase(update = false) {

//     this.http.get('assets/db.json').subscribe(async (jsonExport: JsonSQLite) => {
// console.log("après dl");

//       const jsonstring = JSON.stringify(jsonExport);
//       const isValid = await CapacitorSQLite.isJsonValid({ jsonstring });

// console.log("before loop");
// console.log(isValid.result);
// console.log(jsonstring);

//       if (isValid.result) {
// console.log('in the loop');
//         this.dbName = jsonExport.database;
//         await Storage.set({ key: DB_NAME_KEY, value: this.dbName });
//         await CapacitorSQLite.importFromJson({ jsonstring });
//         await Storage.set({ key: DB_SETUP_KEY, value: '1' });
// console.log("isValid");


//         // Your potential logic to detect offline changes later
//         if (!update) {
//           await CapacitorSQLite.createSyncTable({database: this.dbName});
// console.log("!update");

//         } else {
//           await CapacitorSQLite.setSyncDate({ syncdate: '' + new Date().getTime() })
// console.log("else update");

//         }
//         this.dbReady.next(true);
//         console.log("dbnext");

//       }
// console.log("notValid");

//     });
//   }


//   // Liste des entreprises
//   ngetBuisinessList() {
//     return this.dbReady.pipe(
//       switchMap(isReady => {
//         if (!isReady) {
//           return of({ values: [] });
//         } else {
//           const statement = 'SELECT * FROM entreprise;';
//           return from(CapacitorSQLite.query({ statement, values: [] }));
//         }
//       })
//     )
//   }
  
//   // Entreprise par son identifiant
//   async getBuisinessById(id) {
//     const statement = `SELECT * FROM entreprise LEFT JOIN vendors ON vendors.id=entreprise.vendorid WHERE entreprise.id=${id} ;`;
//     return (await CapacitorSQLite.query({ statement, values: [] })).values[0];
//   }
  
//   // Exporter la BDD
//   getDatabaseExport(mode) {
//     return CapacitorSQLite.exportToJson({ jsonexportmode: mode });
//   }
  
//   // addDummyBuisiness(name) {
//   //   const randomValue = Math.floor(Math.random() * 100) + 1;
//   //   const randomVendor = Math.floor(Math.random() * 3) + 1
//   //   const statement = `INSERT INTO entreprise (id_entreprise, nom_entreprise, telephone_entreprise, 
//   //     adresse_entreprise, infos_entreprise, description_entreprise, site_internet_entreprise,
//   //     reseaux_sociaux_entreprise, monnaie_locale_entreprise, livraison_entreprise, latitude_entreprise, 
//   //     longitude_entreprise, vendorid) VALUES ('${name}','EUR', ${randomValue}, ${randomVendor});`;
//   //   return CapacitorSQLite.execute({ statements: statement });
//   // }
  
//   // deleteBuisiness(BuisinessId) {
//   //   const statement = `DELETE FROM entreprise WHERE id = ${BuisinessId};`;
//   //   return CapacitorSQLite.execute({ statements: statement });
//   // }

}
