import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { WordpressService } from '../services/wordpress.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Resolve, Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {

<<<<<<< HEAD
  posts: Array<any> = new Array<any>();
=======
  entreprisesWP: Array<any> = new Array<any>();
  id: number;
  results;
  entreprise:any = [];
  entDb: any;
  page:number;
  arrayIdEntreprise:any = [];
>>>>>>> 4340311 (synchronisation DONE)


  constructor(private wordpressService: WordpressService,
    public loadingController: LoadingController,
    private router: Router,
    private route: ActivatedRoute,) { }

<<<<<<< HEAD
ngOnInit(): void {
  this.route.data.subscribe(routeData => {
    const data = routeData['data'];
    console.log(data);

    this.posts = data.posts;
})}


}
=======
  ngOnInit(): void {

    console.log("PostsPage ngOnInit function");

    this.loadEntreprises();

  }

private async  loadEntreprises()
{

  await this.wordpressService.getEntreprisesByPages().then(async resultsO => { // Récupère les données wordpress
    // console.log("results getEntreprises");
    // console.log("resultsO : ",resultsO);
    var resultsS = JSON.stringify(resultsO);
    // console.log("resultsS : ",resultsS);
    var results = JSON.parse(resultsS).reverse();
    console.log("results : ",results);
    
    if(results)
    {
      var content = [];
      console.log(results.length);

        for(var i=0; i < results.length ;i++){
          this.entreprisesWP.push(results[i]); // Ajout des entreprisesWP de la bdd wordpress dans un tableau Entreprises
        

          await this.db.getEntreprise(results[i]['id']).then(async data =>{

            if(data['id_entreprise'] === undefined){ // id Sqlite undefined => ajout
              console.log("SQLite : ",data['id_entreprise']);
              console.log("WP : ",results[i]['id']);

              console.log("addEnt");
              this.db.addEntreprise(this.nom_entreprise, this.id_entreprise, this.telephone_entreprise, this.adresse_entreprise, this.infos_entreprise, this.description_entreprise, 
              this.site_internet_entreprise, this.reseaux_sociaux_entreprise, this.monnaie_locale_entreprise, this.livraison_entreprise, this.latitude_entreprise, 
              this.longitude_entreprise, this.id_departement).then(addEnt => {
                this.entreprisesWP.push(addEnt);

                console.log("Entreprise ajoutée : ");
              })
            }

            else if (data['id_entreprise'] === results[i]['id']){ // id sqlite = id wp => afficher
              this.arrayIdEntreprise.push(data['id_entreprise']);

              console.log("results === entDb : "); 
              console.log("SQLite : ",data['id_entreprise']);
              console.log("WP : ",results[i]['id']);

              return results[i];
            } 
          }) 
        } 

    await this.db.deleteEntNotIn(this.arrayIdEntreprise);
    console.log("delete");

    } 

  }) 


} 
  
}
>>>>>>> 4340311 (synchronisation DONE)
