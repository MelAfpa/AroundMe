import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Map, tileLayer, marker, icon } from 'leaflet';
import * as L from 'leaflet';
// import { antPath } from 'leaflet-ant-path';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
// import { HttpClient, HttpClientModule } from '@angular/common/http';

import { Geolocation } from '@capacitor/geolocation';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  // Création de la map
  ionViewDidEnter() {
    const map = L.map('map').setView([47.383333, 0.683333], 8);
    // Ajout des mentions OpenStreetMap, obligatoire
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 5,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

// ----------------------------------------- MARKERS -----------------------------------------

var greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

var purpleIcon = new L.Icon({
  iconUrl: '  https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

var redIcon = new L.Icon({
  iconUrl: '  https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});




L.marker([48.390394,  -4.486076], {icon: greenIcon}).addTo(map);
L.marker([47.26667, -0.08333], {icon: purpleIcon}).addTo(map).bindPopup('Saumur');
L.marker([46.887619,  9.657000], {icon: redIcon}).addTo(map).bindPopup('Alpes').openPopup;

  }




  constructor(private nativeGeocoder: NativeGeocoder, 
    // private http: HttpClient
    ) {
 
  //   this.readAPI('localhost/home')
  //   .subscribe((data) => {
  //   console.log(data);
  // });
    
    this.locate();}

  
    

  
  // ----------------------------------------- GEOCODING -----------------------------------------
  coords: any;
  latitude: number;
  longitude: number;

  async locate() {
try{
    const coordinates = await Geolocation.getCurrentPosition();
    this.latitude = coordinates.coords.latitude;
    this.longitude = coordinates.coords.longitude;
    this.coords = coordinates.coords;
    console.log('position : ', this.coords);}
    catch(e){
      console.log(e);    
    }
  }

  latLng(){
    const btnCoord = document.getElementById("location") as HTMLHeadingElement;

  const latlng = document.getElementById("latlng") as HTMLHeadingElement;

  if(latlng.style.display === "block"){
    latlng.style.display = "none";
  } else {
    latlng.style.display = "block";


  }

}

// results:any;
// lat:any;
// keys:string[]=[];
// adresse:any;
// addressApiUrl:any;
// userData = {
//   adresse: '',
//   postalCode: ''
// }

// readAPI(URL: string) {
//   return this.http.get(URL);
// }

address() {
  let options: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 1
};

this.nativeGeocoder.reverseGeocode(this.latitude, this.longitude, options)
  .then((result: NativeGeocoderResult[]) => console.log(JSON.stringify(result[0])))
  .catch((error: any) => console.log(error));


this.nativeGeocoder.forwardGeocode('Berlin', options)
  .then((result: NativeGeocoderResult[]) => console.log('The coordinates are latitude=' + result[0].latitude + ' and longitude=' + result[0].longitude))
  .catch((error: any) => console.log(error));


// this.addressApiUrl = 'localhost/home';
// this.readAPI(this.addressApiUrl)
// .subscribe((data) => {
//   console.groupCollapsed(data);
//   this.userData.adresse = data['addressLines'];
//   this.userData.postalCode = data['postalCode']; 
// });

//   this.lat = this.latitude;
  // console.log("latitude : "+this.lat);


}



  // ----------------------------------------- FONCTIONS -----------------------------------------
click(){
  const affMap = document.getElementById("map") as HTMLHeadingElement;
  const btnMap = document.getElementById("btnMap") as HTMLHeadingElement;

  if(affMap.style.display === "block"){
    affMap.style.display = "none";
    btnMap.innerHTML = "Afficher la carte";
  } else {
    affMap.style.display = "block";
    btnMap.innerHTML = "Masquer la carte";


  }

}



}
