import { Type } from "@angular/core";
import { TypeSecteur } from "./enums";
import { Secteur } from "./secteur";
import { Departement } from "./departement";

export class Entreprise {
  id_entreprise: number;
  nom_entreprise: string;
  telephone_entreprise: string;
  adresse_entreprise: string;
  infos_entreprise: string;
  description_entreprise: string;
  site_internet_entreprise: string;
  reseaux_sociaux_entreprise: string;
  monnaie_locale_entreprise: boolean;
  livraison_entreprise: boolean;
  latitude_entreprise: number;
  longitude_entreprise: number;
  id_departement: number;
  sous_titre_entreprise: string = '';
  lien_image: string = '';
  cp_entreprise: string = '';
  ville_entreprise: string = '';
  horaires_entreprise: string = '';
  fb_entreprise: string = '';
  insta_entreprise: string = '';
  link_entreprise: string = '';
  secteur_entreprise:string = '';

  name_media: string = '';
  md5_media: string = '';
  distance: string = '';
  code_secteur: number;
  secteur: Secteur;
  departement: Departement;
  path_media: string= '';
  
  public toInsert(){
  	return [this.id_entreprise, 
      this.nom_entreprise, 
      this.telephone_entreprise,
      this.adresse_entreprise,
      this.sous_titre_entreprise,
      this.infos_entreprise,
      this.description_entreprise,
      this.site_internet_entreprise,
      this.reseaux_sociaux_entreprise,
      this.monnaie_locale_entreprise,
      this.livraison_entreprise,
      this.latitude_entreprise,
      this.longitude_entreprise,
      this.id_departement,
      this.lien_image,
      this.name_media,
      this.md5_media
	  ];
  }
  
  public toUpdate()
  {
  
    return [
      this.nom_entreprise, 
  	  this.telephone_entreprise,
      this.adresse_entreprise,
      this.sous_titre_entreprise,
      this.infos_entreprise,
      this.description_entreprise,
      this.site_internet_entreprise,
      this.reseaux_sociaux_entreprise,
      this.monnaie_locale_entreprise,
      this.livraison_entreprise,
      this.latitude_entreprise,
      this.longitude_entreprise,
      this.id_departement,
      this.lien_image,
      this.name_media,
      this.md5_media
    ];
  }
  
  public checkNeedUpdate(dataFromWeb)
  {
  	//TODO ajouter les autres champs
	  var coords =  dataFromWeb['meta']['sur_la_carte'];
    var sousTitre : string  = dataFromWeb['meta']['sous-titre'].toString();
    
  	if(this.nom_entreprise != dataFromWeb['title']['rendered'].trim()
  	  ||  this.sous_titre_entreprise != sousTitre.trim()
      ||  this.site_internet_entreprise != dataFromWeb['meta']['site_internet'][0].trim()
      || this.latitude_entreprise != coords[0]['lat']
      || this.longitude_entreprise != coords[0]['lng']
      || this.lien_image != dataFromWeb['meta']['link_media'].trim()
      || (dataFromWeb['meta']['name_media'] && this.name_media != dataFromWeb['meta']['name_media'].trim())
      || this.checkImageNeedUpdate(dataFromWeb))
    {
      //console.log('modif entreprise');
      return true;
    }
    else
    {
      //console.log('not modif entreprise');
      return false;
    }
  }

  public checkImageNeedUpdate(dataFromWeb)
  {
    if(dataFromWeb['meta']['md5_media'] && this.md5_media != dataFromWeb['meta']['md5_media'].trim())
    {
      //console.log('modif logo entreprise');
      return true;
    }
    else
    {
      //console.log('not modif logo entreprise');
      return false;
    }
  }
  
  public fill(datas)
  {
  	console.log('fill');

    this.id_entreprise = datas.id_entreprise,
	  this.nom_entreprise = datas.nom_entreprise,
		this.telephone_entreprise = datas.telephone_entreprise,
		this.adresse_entreprise = datas.adresse_entreprise,
		this.infos_entreprise = datas.infos_entreprise,
		this.description_entreprise = datas.description_entreprise,
		this.sous_titre_entreprise = datas.sous_titre_entreprise,
    this.site_internet_entreprise = datas.site_internet_entreprise,
		this.reseaux_sociaux_entreprise = datas.reseaux_sociaux_entreprise,
		this.monnaie_locale_entreprise = datas.monnaie_locale_entreprise,
		this.livraison_entreprise = datas.livraison_entreprise,
		this.latitude_entreprise = datas.latitude_entreprise,
    this.longitude_entreprise = datas.longitude_entreprise,
    this.lien_image = datas.lien_image,
		this.id_departement = datas.id_departement;
  
    this.name_media = (datas['meta']['name_media'] ? datas['meta']['name_media'].trim() : "");
    this.md5_media = (datas['meta']['md5_media'] ? datas['meta']['md5_media'].trim() : "");

    this.id_departement = (datas['produit_local_france'] && datas['produit_local_france'][0] ? Number(datas['produit_local_france'][0]) : null);
  }
  
  public fillFromWeb(datas)
  {
    //TODO ajouter les autres champs
  	console.log('fillFromWeb');

	  this.id_entreprise = datas['id'];
	  this.nom_entreprise = datas['title']['rendered'].trim();
    this.telephone_entreprise = datas['meta']['telephone'][0];
		this.adresse_entreprise = datas['meta']['adresse_txt'][0];
    this.cp_entreprise = datas['meta']['code_postal_txt'][0];
    this.ville_entreprise = datas['meta']['villetitle'][0];
    this.infos_entreprise = datas['meta']['description_infos_supp'][0]; 
    this.horaires_entreprise = datas['meta']['horaires'][0];
    this.monnaie_locale_entreprise = datas['meta']['accepte_la_monnaie_locale_'][0];
		this.livraison_entreprise = datas['meta']['livraison_possible_'][0];
    this.site_internet_entreprise = datas['meta']['site_internet'][0].trim();
    this.fb_entreprise = datas['meta']['facebook'][0]; 
    this.insta_entreprise = datas['meta']['instagram'][0]; 
    this.link_entreprise = datas['meta']['linkedin'][0];

    var sousTitre:string  = datas['meta']['sous-titre'].toString();// != '' ? datas['meta']['sous-titre'] : '');
	  this.sous_titre_entreprise = sousTitre.trim();

    var coords =  datas['meta']['sur_la_carte'];
    this.latitude_entreprise = coords[0]['lat'];
    this.longitude_entreprise = coords[0]['lng']
    this.lien_image = datas['meta']['link_media'].trim();
		
    this.secteur_entreprise = datas['meta']['type_d_entreprise'][0].replaceAll('_', ' ');
   

		// this.description_entreprise = datas['meta']['sur_la_carte'];

  }

  
  public getTypeSecteur(datas)
  {
    if(datas['commercants_restaurants_france'] && datas['commercants_restaurants_france'][0])
    {
      return TypeSecteur.Commercant;
    }
    if(datas['producteurs_fabricants_france'] && datas['producteurs_fabricants_france'][0])
    {
      return TypeSecteur.Producteur;
    }
    if(datas['services_alapersonne_france'] && datas['services_alapersonne_france'][0])
    {
      return TypeSecteur.ServicePersonne;
    }
    if(datas['services_entreprises_france'] && datas['services_entreprises_france'][0])
    {
        return TypeSecteur.ServiceEntreprise;
    }

    return null;
  }

  public getCodeSecteur(datas, typeSecteur)
  {
    switch(typeSecteur)
    {
      case TypeSecteur.Commercant : return Number(datas['commercants_restaurants_france'][0]);break;
      case TypeSecteur.Producteur: return Number(datas['producteurs_fabricants_france'][0]);break;
      case TypeSecteur.ServicePersonne: return Number(datas['services_alapersonne_france'][0]);break;
      case TypeSecteur.ServiceEntreprise: return Number(datas['services_entreprises_france'][0]);break;
      default : return null;break;
    }
    
  }
}



