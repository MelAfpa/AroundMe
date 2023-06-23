import * as L from 'leaflet';

export const userPosition = L.icon({
  iconUrl: 'assets/uploads/markers/userMarker.png',
  shadowUrl: 'assets/uploads/markers/shadowMarker.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});


export const searchMarker = L.icon({
  iconUrl: 'assets/uploads/markers/searchMarker.png',
  shadowUrl: 'assets/uploads/markers/shadowMarker.png',
  iconSize: [25, 39],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export const orIcon = new L.Icon({
  iconUrl: '  assets/uploads/markers/orMarker.png',
  shadowUrl: 'assets/uploads/markers/shadowMarker.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export enum TypeActivite {
  Commercant = 1,
  Producteur = 2,
  ServicePersonne = 3,
  ServiceEntreprise = 4
};

export class Enums{
  public static userPosition(){
    return userPosition;
  }

  public static searchMarker(){
    return searchMarker;
  }

  public static orIcon(){
    return orIcon;
  }
}