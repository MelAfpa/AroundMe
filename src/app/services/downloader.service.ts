
import { Injectable } from '@angular/core';
import { Http, HttpDownloadFileResult } from '@capacitor-community/http';
import { Filesystem, Directory } from '@capacitor/filesystem';

import { Capacitor } from '@capacitor/core';
/*import { environment } from 'src/environments/environment';
import {Observable, empty, throwError} from 'rxjs';
import {expand, map, reduce} from 'rxjs/operators';
import { from, EMPTY } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { link } from 'fs';*/

@Injectable({
  providedIn: 'root'
})

export class DownloaderService {


  constructor() {}

	async mkDirsLogo()
	{

		/*Filesystem.stat({ directory: Directory.Data, path: '' }).then(result => {
			console.log(result.uri);
		  }).catch(err => {
			console.log('Error', err.message);
		  });
*/
		await Filesystem.stat({ directory: Directory.Data, path: 'logo' }).then(async result => {
			//console.log(result.uri);
		  }).catch(async err => {
			//console.log('Error', err.message);
			await Filesystem.mkdir({path: 'logo', directory: Directory.Data, recursive: true});
		  });

		  await Filesystem.stat({ directory: Directory.Data, path: 'logo/entreprise' }).then(async result => {
			//console.log(result.uri);
		  }).catch(async err => {
			//console.log('Error', err.message);
			await Filesystem.mkdir({path: 'logo/entreprise', directory: Directory.Data, recursive: true});
		  });
		
		
		  await Filesystem.stat({ directory: Directory.Data, path: 'logo/secteur' }).then(async result => {
			//console.log(result.uri);
		  }).catch(async err => {
			//console.log('Error', err.message);
			await Filesystem.mkdir({path: 'logo/secteur', directory: Directory.Data, recursive: true});
		  });


		  await Filesystem.stat({ directory: Directory.Data, path: 'logo/departement' }).then(async result => {
			//console.log(result.uri);
		  }).catch(async err => {
			//console.log('Error', err.message);
			await Filesystem.mkdir({path: 'logo/departement', directory: Directory.Data, recursive: true});
		  });

	}

	async checkImageExist(nameImage: string, typeImage: number):Promise<boolean>
	{
		try{
			await Filesystem.stat({ directory: Directory.Data, path:  this.getPathDir(typeImage) + nameImage });
			return true;
			/*await Filesystem.stat({ directory: Directory.Data, path:  this.getPathDir(typeImage) + nameImage }).then(async result => {
			//console.log(result);
				return true;
		  }).catch(async err => {
			//console.log(err);
			return false;
		  });*/	
		}catch(err)
		{
			console.log(typeImage + " " +nameImage);
			return false;
		}
	}
	
	async getImageUri(name_media: string, typeImage: number)
	{
		const imageUri = await Filesystem.getUri({
			directory: Directory.Data,
			path: this.getPathDir(typeImage) + name_media
		  });
	
		return Capacitor.convertFileSrc(imageUri.uri);
	}

	async getDefaultImageUri(name_media: string)
	{
		const imageUri = await Filesystem.getUri({
			directory: Directory.Data,
			path: name_media
		  });
	
		return Capacitor.convertFileSrc(imageUri.uri);
	}

	getPathDir(typeImage): string{
		switch(typeImage){
			case 1: return '/logo/entreprise/';break;
			case 2: return '/logo/secteur/';break;
			case 3: return '/logo/departement/';break;
		}
		return 'logo/';
	}

  async downloadImage(linkMedia:string, nameMedia: string, typeImage: number){
	/*console.log('downloadImage');
	console.log(linkMedia);
	console.log(nameMedia);
	*/
	if(linkMedia != '' && nameMedia != '')
	{
		const options = {
		url: linkMedia,
		filePath: this.getPathDir(typeImage) + nameMedia,
		fileDirectory: Directory.Data,
		// Optional
		method: 'GET',
		};
	
		// Writes to local filesystem
		const response: HttpDownloadFileResult = await Http.downloadFile(options);
		console.log(response);
		// Then read the file
		if (response.path) {
			
			return true;
		}
		else
			return false;
	}
	else
		return false;
  };

	async readImage(nameMedia: string, typeImage: number)
	{
		const read = await Filesystem.readFile({
			path: this.getPathDir(typeImage) + nameMedia,
			directory: Directory.Data,
		});

		return read;
	}

}
