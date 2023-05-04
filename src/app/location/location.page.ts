import { Component, OnInit } from '@angular/core';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@capacitor/geolocation';

// import { NativeGeocoderOptions, NativeGeocoderResult, NativeGeocoder } from '@awesome-cordova-plugins/native-geocoder/ngx';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {

  geoLatitude: number;
  geoLongitude: number;
  geoAccuracy:number;
  geoAddress: string;
 
  watchLocationUpdates:any; 
  loading:any;
  isWatching:boolean;
 
  //Geocoder configuration
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };

  constructor(private nativeGeocoder: NativeGeocoder ) {this.ngOnInit() }
ngOnInit(){}

address() {
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
  };

  this.nativeGeocoder.reverseGeocode(52.5072095, 13.1452818, options)
    .then((result: NativeGeocoderResult[]) => console.log(JSON.stringify(result[0])))
    .catch((error: any) => console.log(error));

  this.nativeGeocoder.forwardGeocode('Berlin', options)
    .then((result: NativeGeocoderResult[]) => console.log('The coordinates are latitude=' + result[0].latitude + ' and longitude=' + result[0].longitude))
    .catch((error: any) => console.log(error));
  }



  // ----------------------------------------- GEOCODING -----------------------------------------


// latitude:string="48.390394";
// longitude:string=" -4.486076";
// results:NativeGeocoderResult;
// keys:string[]=[];

 

//     options: NativeGeocoderOptions = {
//     useLocale: true,
//     maxResults: 5
// };

// this.nativeGeocoder.reverseGeocode(this.latitude, this.longitude, this.options)
//   .then((result: NativeGeocoderResult[]) => {
//     console.log(JSON.stringify(result[0]));
//     return result[0];
//   })


}
