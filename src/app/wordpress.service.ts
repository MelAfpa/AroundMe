
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
}
