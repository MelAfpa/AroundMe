import { Injectable } from '@angular/core';
// import { HomePage } from '../home/home.page';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor
(    
  // private homePage: HomePage
  ) { 
  }

  showDetails(data:any ): string{
return '' +
    "<div id='popupContent' style='display:flex;justify-content:space-between;width: 300px;height: 120px'>"+
"  <img id='imgPopup' src='${data.img}' alt='logo ${data.nom}' style='max-width:30%;margin-right:10px;object-fit:contain'/>"+

            " <div style='width:65%;text-align:center;overflow:scroll;display:flex;flex-direction: column;'>" +
            " <p id='titlePopup' style='font-size:1.4em;font-weight:bold;margin:-4px 0px -7px 0px;'>n</p>${data.nom}"+
              "<p id='textPopup' style='padding 7px;' >${data.infos}</p>"+
            
              "<a id='sitePopup' style='background-color: #004569; color: white;padding: 10px;border-radius: 10px;text-decoration:none;' href='${data.site}' >Site internet</a>"+
              "<div></div>"
  }
}
