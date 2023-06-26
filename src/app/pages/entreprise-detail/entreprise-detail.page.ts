import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonInput } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Entreprise } from 'src/app/models/entreprise';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { DownloaderService } from 'src/app/services/downloader.service';
import { IonContent } from '@ionic/angular';
import { escape } from 'querystring';



  @Component({
    selector: 'app-entreprise-detail-form',
    templateUrl: './entreprise-detail.page.html',
    styleUrls: ['./entreprise-detail.page.scss'],
  })


export class EntrepriseDetailPage implements OnInit {

  @ViewChild(IonContent, { static: false }) content: IonContent;

  entreprise: Entreprise;

  constructor(private route: ActivatedRoute, private router: Router,
    private alert: AlertController, private downloaderService: DownloaderService) { 
      this.route.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation().extras.state) {
              this.entreprise = this.router.getCurrentNavigation().extras.state['entreprise'];
            }
          });
  }

  infos_entreprise:string ='';
  infos = '';
  nom = '';
  nom_entreprise = '';

  ngOnInit() {
    this.getInfos();
  }

  getInfos(){
    this.infos= this.entreprise.infos_entreprise;
    this.infos_entreprise = (this.removeTags(this.infos)).replaceAll("&apos;", "'");  
    this.nom = this.entreprise.nom_entreprise;
    this.nom_entreprise = (this.nom).replace("&apos;", "'");
  }
  
  removeTags(str) {
    if ((str===null) || (str===''))
        return false;
    else
        str = str.toString();

    return str.replace( /(<([^>]+)>)/ig, '');
}




}
