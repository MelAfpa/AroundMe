import { TypeSecteur, TypeSecteurLib } from "./enums";

export class Secteur {
  id_secteur: number;
  nom_secteur: string;
  slug_secteur: string;
  code_type_activite: number;
  name_media: string = '';
  md5_media: string = '';
  lien_media: string = '';

  public toInsert(){
  	return [this.id_secteur, 
      this.nom_secteur, 
      this.code_type_activite,
      this.slug_secteur,
      this.name_media,
      this.md5_media
	  ];
  }
  
  public toUpdate()
  {
  
  //nom_entreprise = ?, telephone_entreprise = ?, 
  //                                  adresse_entreprise = ?, sous_titre_entreprise = ?, infos_entreprise = ?, description_entreprise = ?, site_internet_entreprise = ?, 
  //                                  reseaux_sociaux_entreprise = ?, monnaie_locale_entreprise = ?, livraison_entreprise = ?, latitude_entreprise = ?, 
   //                                 longitude_entreprise = ?, id_departement = ?, lien_image = ?
    return [
      this.nom_secteur, 
      this.code_type_activite,
      this.slug_secteur,
      this.name_media,
      this.md5_media,
    ];
  }
  
  public checkNeedUpdate(dataFromWeb)
  {
  	//TODO ajouter les autres champs

  	if(this.id_secteur != dataFromWeb['id']
  	  || this.nom_secteur != dataFromWeb['name'].trim()
      || this.slug_secteur != dataFromWeb['slug'].trim()
      || (dataFromWeb['image_term'] && this.name_media != dataFromWeb['image_term']['filename'].trim())
      || this.code_type_activite != this.getTypeActivite(dataFromWeb['taxonomy'].trim())
      || this.checkImageNeedUpdate(dataFromWeb))
    {
      //console.log('modif secteur');
      return true;
    }
    else
    {
      //console.log('not modif secteur');
      return false;
    }
  }
  
  public checkImageNeedUpdate(dataFromWeb)
  {
    if(dataFromWeb['image_term'] && this.md5_media != dataFromWeb['image_term']['sizes']['thumbnail_md5'].trim())
    {
      //console.log('modif logo secteur');
      return true;
    }
    else
    {
      //console.log('not modif logo secteur');
      return false;
    }
  }

  public fill(datas)
  {
    //TODO ajouter les autres champs
  	//console.log('fill');
  	//console.log(datas);
    this.id_secteur = datas.id_secteur;
    this.nom_secteur = datas.nom_secteur;
    
    this.code_type_activite = datas.code_type_activite;
    this.slug_secteur = datas.slug_secteur;
    
    this.name_media = datas.name_media;
    this.md5_media = datas.md5_media;
  }
  
  public fillFromWeb(datas)
  {
    //TODO ajouter les autres champs
  	//console.log('fillFromWeb');
    //console.log(datas);
  	/*console.log(datas);
  	console.log(datas.id);
  	console.log(datas['id']);*/
    this.id_secteur = datas['id'];
    this.nom_secteur = datas['name'].trim();
    this.code_type_activite = this.getTypeActivite(datas['taxonomy'].trim());

    this.slug_secteur = datas['slug'].trim();
    this.name_media = (datas['image_term'] ? datas['image_term']['filename'].trim(): "");
    this.md5_media = (datas['image_term'] ?datas['image_term']['sizes']['thumbnail_md5'].trim() : "");
    this.lien_media = (datas['image_term'] ?datas['image_term']['sizes']['thumbnail'].trim() : "");
  }

  public getTypeActivite(strTypeActivite: string)
  {
    var typeActivite = 0;
    switch(strTypeActivite)
    {
      case 'commercants_restaurants_france':typeActivite = TypeSecteur.Commercant;break;
      case 'producteurs_fabricants_france':typeActivite = TypeSecteur.Producteur;break;
      case 'services_alapersonne_france':typeActivite = TypeSecteur.ServicePersonne;break;
      case 'services_entreprises_france':typeActivite = TypeSecteur.ServiceEntreprise;break;
      default: break;
    }
    return typeActivite;
  }

  public getTypeActiviteLib(){
    switch(this.code_type_activite)
    {
      case TypeSecteur.Commercant: return TypeSecteurLib.Commercant;break;
      case TypeSecteur.Producteur: return TypeSecteurLib.Producteur;break;
      case TypeSecteur.ServicePersonne: return TypeSecteurLib.ServicePersonne;break;
      case TypeSecteur.ServiceEntreprise: return TypeSecteurLib.ServiceEntreprise;break;
      default: return ""; break;
    }
  }
}



