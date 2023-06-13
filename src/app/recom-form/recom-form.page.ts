import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonInput } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
AlertController

@Component({
  selector: 'app-recom-form',
  templateUrl: './recom-form.page.html',
  styleUrls: ['./recom-form.page.scss'],
})
export class RecomFormPage implements OnInit {

  form: FormGroup;
  formSubmitted = false;
  nom:string;
  choice = {
    select:null
  };

  constructor(private formBuilder: FormBuilder,
    private alert: AlertController) { 
      this.choice.select = "telechargement";
  }

  buildForm(){
    this.form = this.formBuilder.group({

      mailDest: ['', [
        Validators.required,
        Validators.email, 
        Validators.minLength(5),
        Validators.pattern(/.+@.+\..+/)]],
  
      nomUtili: ['', [
        Validators.required,
        Validators.minLength(3)]],
      
        formChoix: ['',[
        Validators.required,
      ]],

      commentaire: ['', [
        Validators.maxLength(20)]]
    },

    );
  }

  // get name(): any {
  //   return this.form.get('nomUtili');

  // }


  ngOnInit() {
    this.buildForm();
  }

  submitForm(event) {
    if (this.form.valid) {
      event.preventDefault();
      this.formSubmitted = true;
      if (this.form.valid) {
        console.log(this.form.value); // Process your form

      }

  }
  
}

affichNom(){
  this.nom = this.form.value['nomUtili'];
}


  selectValue($event) {
    const mailEntrep = document.getElementById("mailEntrep") as HTMLHeadingElement;
    const mailDl = document.getElementById("mailDl") as HTMLHeadingElement;
    const value = $event.target.value;
    
  console.log(value);

    if(value === 'telechargement'){
      mailDl.style.display = "block";
      mailEntrep.style.display = "none";

console.log('telechargement');

    } else {
      mailEntrep.style.display = "block";
      mailDl.style.display = "none";

console.log('entreprise');

    }
  }

  async confirmSubmit() {
    const alert = await this.alert.create({
      cssClass: 'headAlert',
      header: 'Formulaire envoyé avec succès !',
      buttons: [
        {
          text: 'Ok',
          cssClass: 'yesBtn',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

}
