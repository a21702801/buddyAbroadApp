import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RestService } from '../../services/rest-service/rest.service';
import {AccessToken, IAccessToken} from './testeInterface';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.page.html',
  styleUrls: ['./teste.page.scss'],
})
export class TestePage implements OnInit {

  constructor(
      private httpClient: HttpClient,
      private authService: RestService,
  ) { }

  ngOnInit() {

  }

  teste() {
      // tslint:disable-next-line:max-line-length
      // let token = new JSON({accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTA1OTU2NjYsImV4cCI6MTU5MDU5NjI2Nn0.GRKdXVwKS-scbUveDApZ_E2OMUOT9joWYISofcS-Q3E'});
      // tslint:disable-next-line:max-line-length
      const token: IAccessToken = new AccessToken( 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTA1OTc3MDEsImV4cCI6MTU5MDU5ODMwMX0.v7527QEXZPfsunHqAb6f9KUoSjg0lkB5GC9kbKTIk6Q');
      this.authService.postToken(token, this.authService.AUTH_ADRESS, '/att').subscribe(
          res => {
              console.log('entreiAqui');
              console.log(res);
          },
          error => {
              console.log(error);
          });
  }
}
