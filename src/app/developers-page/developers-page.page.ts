import { Component, OnInit } from '@angular/core';
import { DbService, Ent } from '../services/db.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-developers-page',
  templateUrl: './developers-page.page.html',
  styleUrls: ['./developers-page.page.scss'],
})
export class DevelopersPagePage implements OnInit {

  entrep: Ent[] = [];

  products: Observable<any[]>;

  entreprise:any = [];

  selectedView = 'ent';

  constructor(private db: DbService,
              private route: ActivatedRoute,
              private router: Router, 
              private toast: ToastController) 
              
              { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getEnt().subscribe(ent => {
          this.entreprise = ent;
        })
      }
      this.entreprise=this.db.getEnt();
      console.log(this.entreprise);
    });
    
  }

  addEntreprise() {
    
    this.db.addEntreprise(this.entreprise['id_entreprise'], this.entreprise['nom_entreprise'], this.entreprise['telephone_entreprise'], this.entreprise['adresse_entreprise'], this.entreprise['infos_entreprise'], this.entreprise['description_entreprise'], this.entreprise['site_internet_entreprise'], this.entreprise['reseaux_sociaux_entreprise'], this.entreprise['monnaie_locale_entreprise'], this.entreprise['livraison_entreprise'], this.entreprise['latitude_entreprise'], this.entreprise['longitude_entreprise'], this.entreprise['id_departement'])
    .then(_ => {
      this.entreprise = [];
    });
  }

  delete() {
    this.db.deleteEntreprise(this.entreprise.id_entreprise).then(() => {
      this.router.navigateByUrl('/');
    });
  }

  updateEntreprise() {

    this.db.updateEntreprise(this.entreprise).then(async (res) => {
      let toast = await this.toast.create({
        message: 'entreprise updated',
        duration: 3000
      });
      toast.present();
    });
  }



}
