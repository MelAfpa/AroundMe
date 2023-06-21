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
	  ];
  }
  
  public toUpdate()
  {
  
  //nom_entreprise = ?, telephone_entreprise = ?, 
  //                                  adresse_entreprise = ?, sous_titre_entreprise = ?, infos_entreprise = ?, description_entreprise = ?, site_internet_entreprise = ?, 
  //                                  reseaux_sociaux_entreprise = ?, monnaie_locale_entreprise = ?, livraison_entreprise = ?, latitude_entreprise = ?, 
   //                                 longitude_entreprise = ?, id_departement = ?, lien_image = ?
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
      || this.lien_image != dataFromWeb['meta']['link_media'].trim())
    {
      console.log('modif entreprise');
      return true;
    }
    else
    {
      console.log('not modif entreprise');
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
  
  }
  
  public fillFromWeb(datas)
  {
    //TODO ajouter les autres champs
  	console.log('fillFromWeb');
  	/*console.log(datas);
  	console.log(datas.id);
  	console.log(datas['id']);*/
	  this.id_entreprise = datas['id'];
	  this.nom_entreprise = datas['title']['rendered'].trim();
	
    console.log("The data type is", typeof datas['meta']['sous-titre'])

    var sousTitre:string  = datas['meta']['sous-titre'].toString();// != '' ? datas['meta']['sous-titre'] : '');
	  this.sous_titre_entreprise = sousTitre.trim();
    this.site_internet_entreprise = datas['meta']['site_internet'][0].trim();
        
    var coords =  datas['meta']['sur_la_carte'];
    this.latitude_entreprise = coords[0]['lat'];
    this.longitude_entreprise = coords[0]['lng']
    this.lien_image = datas['meta']['link_media'].trim();

  }
}



