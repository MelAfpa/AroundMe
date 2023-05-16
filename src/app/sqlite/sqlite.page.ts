import { Injectable } from '@angular/core';
import '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';
import { JsonSQLite, CapacitorSQLite} from '@capacitor-community/sqlite';
import { switchMap } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, from, of } from 'rxjs';
import { Device } from '@capacitor/device';
import { Storage } from '@capacitor/storage';

const DB_SETUP_KEY = 'first_db_setup';
const DB_NAME_KEY = 'db_name';

@Injectable({
  providedIn: 'root'
})


export class SqlitePage  {

  dbReady = new BehaviorSubject(false); // Empêcher les requêtes tant que la BDD n'est pas prête
  dbName = 'database.json';

  constructor(private http: HttpClient, private alertCtrl: AlertController) { }

// Demandes de permissions pour utiliser la BDD
  async init(): Promise<void> {
    const info = await Device.getInfo();

    if (info.platform === 'android') {
      try {
        const sqlite = CapacitorSQLite as any;
        await sqlite.requestPermissions();
        this.setupDatabase();
      } catch (e) {
        const alert = await this.alertCtrl.create({
          header: 'No DB access',
          message: 'This app can\'t work without Database access.',
          buttons: ['OK']
        });
        await alert.present();
      }
    } else {
      this.setupDatabase();
    }
  }

  // Téléchargement et importation de la BDD
  private async setupDatabase() {
    const dbSetupDone = await Storage.get({ key: DB_SETUP_KEY });

    if (!dbSetupDone.value) {
      this.downloadDatabase();
      console.log("!dbSetupDone");
    } else {
      this.dbName = (await Storage.get({ key: DB_NAME_KEY })).value;
      await CapacitorSQLite.open({ database: this.dbName });
      this.dbReady.next(true);
      console.log("else dbSetup");

    }
  }

  // Potentially build this out to an update logic:
  // Sync your data on every app start and update the device DB
  private downloadDatabase(update = false) {

    this.http.get('assets/db.sqlite').subscribe(async (jsonExport: JsonSQLite) => {
console.log("après dl");

      const jsonstring = JSON.stringify(jsonExport);
      const isValid = await CapacitorSQLite.isJsonValid({ jsonstring });
console.log(jsonstring);

      if (isValid.result) {
        this.dbName = jsonExport.database;
        await Storage.set({ key: DB_NAME_KEY, value: this.dbName });
        await CapacitorSQLite.importFromJson({ jsonstring });
        await Storage.set({ key: DB_SETUP_KEY, value: '1' });
console.log("isValid");


        // Your potential logic to detect offline changes later
        if (!update) {
          await CapacitorSQLite.createSyncTable({database: this.dbName});
console.log("!update");

        } else {
          await CapacitorSQLite.setSyncDate({ syncdate: '' + new Date().getTime() })
console.log("else update");

        }
        this.dbReady.next(true);
      }
console.log("notValid");

    });
  }

}
