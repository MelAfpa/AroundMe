import { Component } from '@angular/core';
import { LoadingController, Platform } from '@ionic/angular';
import { DbService } from './services/db.service';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';

//import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor( private platform: Platform,

    private dbService: DbService,
    private loadingCtrl: LoadingController,
   // private router: Router
   ) 
    {
      // this.platform.ready().then(async () => {
      //   const loading = await this.loadingCtrl.create();
      //   // await loading.present();
      //   this.dbService.init()});

      //this.router.navigate(['home']);
    }




//     async initializeApp() {
//       this.platform.ready().then(async () => {
//         const loading = await this.loadingCtrl.create();
//         // await loading.present();
//         this.dbService.init();
        
//       });
    
// }

}
