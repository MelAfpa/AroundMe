
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Observable, empty, throwError} from 'rxjs';
import {expand, map, reduce} from 'rxjs/operators';
import { Secteur } from '../models/secteur';
import { from, EMPTY } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WordpressService {


  constructor(private http: HttpClient) {}


  async getEntreprisesById(id:number) {
    
    return await this.http.get(
		'https://autourdemoi.colentre.com/wp-json/wp/v2/entreprises_locales'
      +id
      
      ).toPromise();
    }

  async getPosts() {
		// if we want to query posts by category
		console.log("wordpressService getPosts");

		return await this.http.get(
    'https://autourdemoi.colentre.com/wp-json/wp/v2/posts'
		  // + "posts"
		).toPromise();
	}

    async getEntreprisesByPages(page:number = 1, perPage:number = 100){
		
			console.log("wordpressService getEntreprisesByPages");
				return await this.http.get(
			'https://autourdemoi.colentre.com/wp-json/wp/v2/entreprises_locales?'
			+ 'page='
			+ page
			+'&per_page='
			+ perPage
				// + "posts"
				).toPromise();
			
	}

	async getDepartementsByPages(page:number = 1, perPage:number = 100){
		
		console.log("wordpressService getDepartementsByPages");
		return await this.http.get(
			'https://autourdemoi.colentre.com/wp-json/wp/v2/produit_local_france?'
			+ 'page='
			+ page
			+'&per_page='
			+ perPage
		).toPromise();
	}

/*
	getAllItems(): Observable<any[]> {
		const getRange = (page?: number,perPage?: number, slug?: string, result?: any): Observable<any> => {
			return this.http.get<any>('https://autourdemoi.colentre.com/wp-json/wp/v2/'+slug+'?'
			+ 'page='
			+ page
			+'&per_page='
			+ perPage, {observe: 'response'});
		};
	  
		return getRange().expand((res: Response) => {
			res.headers.get('X-WP-Total')

		  if (res.headers.get('X-WP-Total')) {
			const nextRange = res.headers.get('Next-Range');
	  
			return getRange(page+1, perPage);
		  } else {
			return Observable.empty();
		  }
		}).map((res: Response) => res.json());
	  }*/
/*
	  rows = [];
	  const firstUrl = 'https://autourdemoi.colentre.com/wp-json/wp/v2/commercants_restaurants_france?page=1';
	  const getArtists = (url: string) => from(fetch(url)).pipe(
		  switchMap(response => response.json());
	  )
	  
	  getArtists(firstUrl).pipe(
	   tap(response => rows = rows.concat(response.result)), // on success we concat with the new coming rows
	   expand((previousData) => previousData.next 
				  ? getArtists(previousData.next);
				  : EMPTY;
	   )
	  ).subscribe();
*/
/*
get(url: string): Observable<any> {
    return this.http.get(url).pipe(catchError(this.formatErrors));
  }

  formatErrors(error: any) {
    console.error('error', error);
    return throwError(error.error);
  }

  getByURL(url: string): any {
    return this.get(url);
  }

  getByPageNext(): Observable<any> {
    const url = 'https://autourdemoi.colentre.com/wp-json/wp/v2/commercants_restaurants_france?page=1';
    return this.getByURL(url).pipe(
      expand((response: Array<any>) => {
        if (response && response.length && response[0].next) {
          console.log(response[0]);
          return this.getByURL(response[0].next);
        } else {
          return empty();
        }
      }),
      map(obj => obj[0]),
      reduce((acc, x: any) => acc.concat([x.data]), [])
    );
  }

  secteurs: Array<Secteur>;

  public getSss(): Observable<Array<Secteur>> {

	return new Observable<Array<Secteur>>(observer => {

		this.loadPosts().subscribe(
			response => {
				if (response) {
					this.secteurs = response;
					observer.next(this.secteurs);
					observer.complete();
				} else {
					observer.error(response);   
				}
			},
			error => {
				observer.error(error);
			}
		)
	   
	});
}

loadPosts(): Observable<Array<Secteur>> {
let url = "https://autourdemoi.colentre.com/wp-json/wp/v2/commercants_restaurants_france?pag";

return this.http.get<Array<Secteur>>(url);
}

	public getSecteurs(page:number = 1, perPage:number = 10, slug: string, result): Observable<any>
	{
		return this.http.get<any>('https://autourdemoi.colentre.com/wp-json/wp/v2/'+slug+'?'
			+ 'page='
			+ page
			+'&per_page='
			+ perPage, {observe: 'response'});
	}



	getAllSecteurs(page:number = 1, perPage:number = 10, slug: string, result)
	{

		this.getSecteurs(page, perPage, slug, result).subscribe(async response => {
			console.log(response?.body);
			var results = response?.body;
			var nbTotal = response?.headers?.get('X-WP-Total');
			console.log(nbTotal);
			result.push(results);
			if(results.length == perPage && nbTotal > 10)
			{
				return this.getAllSecteurs(page+1, perPage, slug, result);
			}
			else
				return result;
		});
	}
*/
	/*getSecteursByPages(page:number = 1, perPage:number = 10, slug: string, body): Observable<any>{
			var nbSecteur = 0;
			var nbTotal = 0;
			//var body;
			console.log("wordpressService getDepartementsByPages");
			console.log(page);
			this.http.get(
				'https://autourdemoi.colentre.com/wp-json/wp/v2/'+slug+'?'
				+ 'page='
				+ page
				+'&per_page='
				+ perPage, {observe: 'response'}
			).subscribe(resp => {
				console.log(resp.headers.get('X-WP-Total'));
				//console.log(resp.body);
				nbTotal = Number(resp.headers.get('X-WP-Total'));
				
				if(resp && resp.body)
				{
					var results = JSON.stringify(resp.body);
					var resultsR = JSON.parse(results).reverse()
					console.log(resultsR);
					nbSecteur = resultsR.length;
					body.push(resultsR);
				}
				//nbSecteur = resp.body;
				
				console.log(nbSecteur);
				console.log(perPage);
				console.log(nbTotal);
				if(nbSecteur == perPage && nbTotal > 10)
				{
					return this.getSecteursByPages(page+1, perPage, slug, body);
				}
				else{
					return body;
				}
	
				//body = resp.body;
			});
			return undefined;
			// 5 résultats => 1 page et total 5
			// 15 résultats => 2 pages : 1 de 10 et 1 de 5
			//.toPromise();
		}*/

    async getSecteursByPages(page:number = 1, perPage:number = 100, slug: string){
		//var body;
		console.log("wordpressService body");


		return await this.http.get(
			'https://autourdemoi.colentre.com/wp-json/wp/v2/'+slug+'?'
			+ 'page='
			+ page
			+'&per_page='
			+ perPage
		).toPromise();
		
		
	}

}
