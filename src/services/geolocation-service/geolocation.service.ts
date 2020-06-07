import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { NativeGeocoderOptions } from '@ionic-native/native-geocoder';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor(private geolocation: Geolocation, public nativeGeocoder: NativeGeocoder) {
  }

  getCoordsInfo() {
    this.geolocation.getCurrentPosition().then((resp) => {

      const lat = resp.coords.latitude;
      const long = resp.coords.longitude;

      const options: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 1
      };

      this.nativeGeocoder.reverseGeocode(lat, long, options).then((results => {
        console.log(JSON.stringify(results[0]));
        return JSON.stringify(results[0]);
      }));

    }).catch((error) => {
      console.log('Error getting location', error);
      return null;
    });
  }

  reverseGeocoding(latitude, longitude) {
    const options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 1
    };

    this.nativeGeocoder.reverseGeocode(latitude, longitude, options).then((results => {
      console.log(JSON.stringify(results[0]));
      return JSON.stringify(results[0]);
    }));
  }

}
