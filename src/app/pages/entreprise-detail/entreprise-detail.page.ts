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


  ngOnInit() {

  }

  conv(){
    var livraison = document.getElementById("liv");
    var monnaie = document.getElementById("mon");

    if(livraison === '0'){

    }
  }

}
