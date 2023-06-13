
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class WordpressService {


  constructor(private http: HttpClient) {}


  // getEntreprises(id:number) {
  //   let entUrl = 'entreprises_locales/';
    
  //   return this.http.get(
  //     environment.wordpress.api_url
  //     + entUrl
  //     +id
      
  //     )
  //   }

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

}
