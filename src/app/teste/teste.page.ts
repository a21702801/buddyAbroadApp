import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest-service/rest.service';
import { Storage } from '@ionic/storage';
import { JwtHandlerService } from '../../services/jwt-handler/jwt-handler.service';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.page.html',
  styleUrls: ['./teste.page.scss'],
})
export class TestePage implements OnInit {
    public a;
    public b;
    public r;
    public c;

    constructor( private restService: RestService, private storage: Storage, private jwtHandlerService: JwtHandlerService) {
        this.loadTokens();
    }

  ngOnInit() {
  }

  button() {
        this.restService.get().subscribe( res => {
            this.r = res;
            console.log(this.r);
            this.jwtHandlerService.verifyAuthentication(this.r.info);
        },
            error => {
            console.log(error);
            });
  }

  async logout() {
      await this.storage.remove('access_token');
      await this.storage.remove('refresh_token');
      await this.loadTokens();
  }

  async loadTokens() {
      await this.storage.get('access_token').then(value => {this.a = value; });
      await this.storage.get('refresh_token').then(value => {this.b = value; });
  }
}
