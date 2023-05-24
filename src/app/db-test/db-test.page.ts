import { Component, OnInit } from '@angular/core';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-db-test',
  templateUrl: './db-test.page.html',
  styleUrls: ['./db-test.page.scss'],
})
export class DbTestPage implements OnInit {

  constructor(private dbService: DbService,
    private dbservice: DbService) {

console.log("HomePage constructor");

     }

  ngOnInit() {

    console.log("home ngOnInit");


  }





}
