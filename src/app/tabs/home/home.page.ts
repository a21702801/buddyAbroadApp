import { Component, OnInit } from '@angular/core';
import {Geolocation, Geoposition} from '@ionic-native/geolocation/ngx';
import {NativeGeocoder, NativeGeocoderResult} from '@ionic-native/native-geocoder/ngx';
import { NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { RestService } from '../../../services/rest-service/rest.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

import { GetTopVisitsRequest, IGetTopVisitsRequest } from '../../../models/getTopVisitsRequest';
import { GetVisitsNearby, IGetVisitsNearby } from '../../../models/getVisitsNearbyRequest';
import { VisitCard, IVisitCard } from '../../../models/visitCard';
import { JwtHandlerService } from '../../../services/jwt-handler/jwt-handler.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public country;
  public bestRatedVisits = [];
  public visitsNearby = [];
  public count = 0;
  private bestRatedVisitsResposne;
  private visitsNearbyResposne;
  private lat;
  private lon;
  public error;
  public loadingCards = true;

  constructor(
      private geolocation: Geolocation,
      public nativeGeocoder: NativeGeocoder,
      private restService: RestService,
      public toastController: ToastController,
      private router: Router,
      private storage: Storage,
      private jwtHandlerService: JwtHandlerService
  ) { }

  ngOnInit() {
      this.loadHomePage();
  }

  async loadHomePage() {
    await this.geolocation.getCurrentPosition().then( (resp: Geoposition) => {
      this.lat = resp.coords.latitude;
      this.lon = resp.coords.longitude;
    }).catch((error) => {
      this.presentToast('Unable to find current location', 'danger');
      this.loadingCards = false;
    });
    await this.nativeGeocoder.reverseGeocode(this.lat, this.lon, { useLocale: true, maxResults: 1 }).then((res: NativeGeocoderResult[]) => {
      this.country = res[0].countryName;
    }).catch((error) => {
      this.error = error;
      this.presentToast('Problems with internet connection', 'danger');
      this.loadingCards = false;
    });
    await this.storage.set('lat', this.lat);
    await this.storage.set('lon', this.lon);
    await this.storage.set('country', this.country);
    await this.getVisitsNearby(this.lat, this.lon);
    await this.getTopVisitCards(this.country, 3 );
    this.loadingCards = false;
  }

  getTopVisitCards(country: string, quantity: number ) {
    const request: IGetTopVisitsRequest = new GetTopVisitsRequest(country, quantity);
    this.restService.getTopVisitCards(request, this.restService.HOME_ADRESS, '/getTopVisitCards').subscribe(
        async res => {
          this.bestRatedVisitsResposne = res;
          // Verify authorization
          if (this.jwtHandlerService.verifyAuthentication(this.bestRatedVisitsResposne.accessToken)) {
            for ( const card of this.bestRatedVisitsResposne.cards) {
              const newCard: IVisitCard = new VisitCard
              (
                  card.id,
                  card.title,
                  card.first_name,
                  card.last_name,
                  card.duration,
                  card.min_group_size,
                  card.max_group_size,
                  card.price_person,
                  card.rating,
                  card.img1
              );
              this.bestRatedVisits.push(newCard);
            }
            console.log(this.bestRatedVisits);
          }
        },
        error => {
          console.log('Error');
          console.log(error);
          this.presentToast('Problem loading best rated visits', 'danger');
        });
  }
  getVisitsNearby(lat: number, lon: number ) {
    console.log('Entrei no getVisitsNearby');
    const request: IGetVisitsNearby = new GetVisitsNearby(lat, lon, 'K', 80);
    this.restService.getVisitsNearbyCards(request, this.restService.HOME_ADRESS, '/getTwoVisitsNearbyCards').subscribe(
        async res => {
          this.visitsNearbyResposne = res;
          if (this.jwtHandlerService.verifyAuthentication(this.visitsNearbyResposne.accessToken)) {
            for (const card of this.visitsNearbyResposne.cards) {
              const newCard: IVisitCard = new VisitCard
              (
                  card.id,
                  card.title,
                  card.first_name,
                  card.last_name,
                  card.duration,
                  card.min_group_size,
                  card.max_group_size,
                  card.price_person,
                  card.rating,
                  card.img1
              );
              this.visitsNearby.push(newCard);
            }
          }
        },
        error => {
          console.log('Error');
          console.log(error);
          this.error = error.message;
          this.presentToast('Problem loading visits nearby', 'danger');
        });
  }
  async presentToast( registerMessage, color ) {
    const toast = await this.toastController.create({
      message: registerMessage,
      duration: 2000,
      color
    });
    await toast.present();
  }

  navigateToVisitPage(visitCard) {
    this.router.navigate(['/visit-page'], visitCard);
  }
}
