// import { Injectable } from '@angular/core';

// import { Capacitor } from '@capacitor/core';
// import { CapacitorSQLite, SQLiteDBConnection, SQLiteConnection, capSQLiteSet,
//          capSQLiteChanges, capSQLiteValues, capEchoResult, capSQLiteResult 
//         } from '@capacitor-community/sqlite';

// @Injectable()

// export class DatabaseService {
//   sqlite: SQLiteConnection;
//   isService: boolean = false;
//   platform: string;
//     constructor() {
//     }
    
//          /**
//    * Plugin Initialization
//    */
// initializePlugin(): Promise<boolean> {
//   return new Promise (resolve => {
//       this.platform = Capacitor.platform;
//       console.log("*** platform " + this.platform)
//       const sqlitePlugin: any = CapacitorSQLite;
//       this.sqlite = new SQLiteConnection(sqlitePlugin);
//       this.isService = true;
//       console.log("$$$ in service this.isService " + this.isService + " $$$")
//       resolve(true);
//   });
// }

// async echo(value: string): Promise<capEchoResult> {
//   console.log("&&&& in echo this.sqlite " + this.sqlite + " &&&&")
//   if(this.sqlite != null) {
//       return await this.sqlite.echo(value);
//   } else {
//       return null;
//   }
// }

// async createConnection(database:string, encrypted: boolean,
//   mode: string, version: number
//   ): Promise<SQLiteDBConnection | null> {
//     if(this.sqlite != null) {
//     const db: SQLiteDBConnection = await this.sqlite.createConnection(
//           database, encrypted, mode, version);
//       if (db != null) {
//         return db;
//       } else {
//         return null
//       }
//     } else {
//       return null;
//     }
// }
// async closeConnection(database:string): Promise<capSQLiteResult> {
//   if(this.sqlite != null) {
//     return await this.sqlite.closeConnection(database, false);
//   } else {
//     return null;
// }
// }

// }
