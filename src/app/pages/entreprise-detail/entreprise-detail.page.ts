/*import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Entreprise } from '../../models/entreprise';

import { Platform } from '@ionic/angular';

import { IonContent } from '@ionic/angular';

@Component({
    selector: 'app-entreprise-detail',
    templateUrl: './entreprise-detail.page.html',
    styleUrls: ['./entreprise-detail.page.scss'],
})



export class EntrepriseDetailPage implements OnInit {
    @ViewChild(IonContent, { static: false }) content: IonContent;
    
    entreprise: Entreprise;
    constructor(private route: ActivatedRoute, private router: Router, private file: File, private platform: Platform,
        )
    {
        console.log("EntrepriseDetailPage constructor");
        this.route.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation().extras.state) {
              this.entreprise = this.router.getCurrentNavigation().extras.state['entreprise'];
            }
          });
        this.route.queryParams.subscribe(params => {
            if (params && params['entreprise']) {
                this.entreprise = JSON.parse(params['entreprise']);
                
                    
                }
                else {
                    console.log("no content");
                }
            });
    }
    ngOnInit() {
    }
}
*/

import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonInput } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Entreprise } from 'src/app/models/entreprise';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'


@Component({
  selector: 'app-entreprise-detail-form',
  templateUrl: './entreprise-detail.page.html',
  styleUrls: ['./entreprise-detail.page.scss'],
})
export class EntrepriseDetailPage implements OnInit {
  entreprise: Entreprise;


 
  constructor(private route: ActivatedRoute, private router: Router,
    private alert: AlertController,
    ) { 
        this.route.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation().extras.state) {
              this.entreprise = this.router.getCurrentNavigation().extras.state['entreprise'];
            }
          });

  }
  infos_entreprise:string ='';
  infos = '';
  livraison_entreprise:boolean;
  monnaie_entreprise:boolean;

  // this.removeTags(this.entreprise.infos_entreprise);

  ngOnInit() {
    this.infos= this.entreprise.infos_entreprise;
    this.infos_entreprise = this.removeTags(this.infos);
    console.log(this.infos_entreprise);

    this.livraison_entreprise = this.entreprise.livraison_entreprise;
    this.monnaie_entreprise = this.entreprise.monnaie_locale_entreprise;

    var livraison = document.getElementById("livraison");
    var monnaie = document.getElementById("monnaie");
console.log(livraison);
console.log(monnaie);
    // if(livraison === 0 || this.monnaie === true){
    //   livraison.innerHTML = "Livraison";
    //   monnaie.innerHTML = "N'accepte pas la monnaie locale";
    //     } 

  }

  removeTags(str) {
    if ((str===null) || (str===''))
        return false;
    else
        str = str.toString();
          
    // Regular expression to identify HTML tags in 
    // the input string. Replacing the identified 
    // HTML tag with a null string.
    return str.replace( /(<([^>]+)>)/ig, '');
}




}
