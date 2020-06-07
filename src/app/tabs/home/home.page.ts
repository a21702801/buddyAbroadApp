import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { RestService } from '../../../services/rest-service/rest.service';
import { ToastController } from '@ionic/angular';

import { GetTopVisitsRequest, IGetTopVisitsRequest } from '../../../models/getTopVisitsRequest';
import { GetVisitsNearby, IGetVisitsNearby } from '../../../models/getVisitsNearbyRequest';
import { VisitCard, IVisitCard } from '../../../models/visitCard';

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

  constructor(
      private geolocation: Geolocation,
      public nativeGeocoder: NativeGeocoder,
      private restService: RestService,
      public toastController: ToastController
  ) { }

  ngOnInit() {

      // this.getCoordsInfo();
      this.getTopVisitCards('Portugal', 3 );
      this.getVisitsNearby(38.762396, -9.282215);

      /*Native lines */
      // this.getTopVisitCards(this.country, 3 );
      // this.getVisitsNearby(this.lat, this.long);
  }

  getCoordsInfo() {
    this.geolocation.getCurrentPosition().then((resp) => {

      this.lat = resp.coords.latitude;
      this.lon = resp.coords.longitude;

      const options: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 1
      };

      this.nativeGeocoder.reverseGeocode(this.lat, this.lon, options).then((results => {
        console.log(JSON.stringify(results[0]));
        this.country = results[0].countryName;
      }));

    }).catch((error) => {
      console.log('Error getting location', error);
      return null;
    });
  }

  getTopVisitCards(country: string, quantity: number ) {

    const request: IGetTopVisitsRequest = new GetTopVisitsRequest(country, quantity);

    this.restService.getTopVisitCards(request, this.restService.HOME_ADRESS, '/getTopVisitCards').subscribe(
        async res => {
          this.bestRatedVisitsResposne = res;
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
        },
        error => {
          console.log('Error');
          console.log(error);
          this.presentToast('Problem loading best rated visits', 'danger');
        });
  }

  getVisitsNearby(lat: number, lon: number ) {

    const request: IGetVisitsNearby = new GetVisitsNearby(lat, lon, 'K', 80);

    this.restService.getVisitsNearbyCards(request, this.restService.HOME_ADRESS, '/getTwoVisitsNearbyCards').subscribe(
        async res => {
          this.visitsNearbyResposne = res;
          for ( const card of this.visitsNearbyResposne.cards) {
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
          console.log(this.visitsNearby);
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
    toast.present();
  }
}
