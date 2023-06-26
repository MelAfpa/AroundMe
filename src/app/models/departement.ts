export class Departement {
  id_departement: number;
  nom_departement: string;
  numero_departement: number;
  slug_departement: string;
  name_media: string = '';
  md5_media: string = '';
  lien_media: string = '';
  
  public toInsert(){
  	return [this.id_departement, 
      this.nom_departement, 
      this.numero_departement,
      this.slug_departement,
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
      this.nom_departement, 
      this.numero_departement,
      this.slug_departement,
      this.name_media,
      this.md5_media,
    ];
  }
  
  public checkNeedUpdate(dataFromWeb)
  {
  	//TODO ajouter les autres champs

  	if(this.id_departement != dataFromWeb['id']
  	  || this.nom_departement != dataFromWeb['name'].trim()
      || this.numero_departement != dataFromWeb['numero_departement']
      || this.slug_departement != dataFromWeb['slug'].trim()
      || dataFromWeb['image_term'] && this.name_media != dataFromWeb['image_term']['filename'].trim()
      || this.checkImageNeedUpdate(dataFromWeb))
    {
      //console.log('modif departement');
      return true;
    }
    else
    {
      //console.log('not modif departement');
      return false;
    }
  }
  
  public checkImageNeedUpdate(dataFromWeb)
  {
    if(dataFromWeb['image_term'] && this.md5_media != dataFromWeb['image_term']['sizes']['thumbnail_md5'].trim())
    {
      //console.log('modif logo departement');
      return true;
    }
    else
    {
      //console.log('not modif logo departement');
      return false;
    }
  }

  public fill(datas)
  {
    //TODO ajouter les autres champs
  	//console.log('fill');
  	//console.log(datas);
    this.id_departement = datas.id_departement;
    this.nom_departement = datas.nom_departement;
    
    this.numero_departement = datas.numero_departement;
    this.slug_departement = datas.slug_departement;
    
    this.name_media = datas.name_media;
    this.md5_media = datas.md5_media;
  }
  
  public fillFromWeb(datas)
  {
    //TODO ajouter les autres champs
  	//console.log('fillFromWeb');
  	/*console.log(datas);
  	console.log(datas.id);
  	console.log(datas['id']);*/
    this.id_departement = datas['id'];
    this.nom_departement = datas['name'].trim();
    this.numero_departement = datas['numero_departement'];
    this.slug_departement = datas['slug'].trim();
    this.name_media = (datas['image_term'] ?datas['image_term']['filename'].trim() : "");
    this.md5_media = (datas['image_term'] ?datas['image_term']['sizes']['thumbnail_md5'].trim() : "");
    this.lien_media = (datas['image_term'] ?datas['image_term']['sizes']['thumbnail'].trim() : "");
  }
}



