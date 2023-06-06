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

  posts: Array<any> = new Array<any>();


  constructor(private wordpressService: WordpressService,
    public loadingController: LoadingController,
    private router: Router,
    private route: ActivatedRoute,) { }

ngOnInit(): void {
  this.route.data.subscribe(routeData => {
    const data = routeData['data'];
    console.log(data);

    this.posts = data.posts;
})}


}
