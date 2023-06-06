import { Component, OnInit } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { WordpressService } from '../services/wordpress.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-entreprise-resolver',
  templateUrl: './entreprise-resolver.page.html',
  styleUrls: ['./entreprise-resolver.page.scss'],
})
export class Posts implements Resolve<any> {


  constructor(private wordpressService: WordpressService,
    
    ) { }


    resolve(route: ActivatedRouteSnapshot): Observable<any>  {
  
      return this.wordpressService.getPosts()
      .pipe(
        map((posts) => {
          return { posts };
        })
      )
    }
}