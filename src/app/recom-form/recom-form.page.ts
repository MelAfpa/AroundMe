import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonInput } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { registerPlugin } from '@capacitor/core';


const Intent = registerPlugin<IntentMailPlugin>('Intent');
const entityMap = new Map<string, string>(Object.entries({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': '&quot;',
  "'": '&#39;',
  "/": '&#x2F;'
  }))

export default Intent;

export interface IntentMailPlugin {
    intent(options: { 
      email: string, 
      nomUtil: string,
      action: number, 

    }): Promise<{ message: string }>;
}
  
export function escape_html(source: string) {
  return String(source).replace(/[&<>"'\/]/g, (s: string) => entityMap.get(s)!);
}

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

  email:string;
  nomUtil:string;
  action: number =1;
  subject1: string;
  subject2: string;
  mail1: string;
  mail2: string;

  async intent(){

    this.email = this.form.value['mailDest'];
    this.nomUtil = this.form.value['nomUtili'];

const { message } = await Intent.intent({ email: this.email, nomUtil:this.nomUtil, action: this.action});

console.log('Response from native:', this.email,this.nomUtil,this.action);
console.log(message);


  }

  

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

  ngOnInit() {
    this.buildForm();
  }

  submitForm(event) {
    if (this.form.valid) {
      this.intent();        

      event.preventDefault();
      this.formSubmitted = true;
      console.log(this.form.value); // Process your form
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
    this.action = 1;

  } else {
    mailEntrep.style.display = "block";
    mailDl.style.display = "none";
    this.action = 2;
    }
  }

// async confirmSubmit() {
//   const alert = await this.alert.create({
//     cssClass: 'headAlert',
//     header: 'Formulaire envoyé avec succès !',
//     buttons: [
//       {
//         text: 'Ok',
//         cssClass: 'yesBtn',
//         handler: () => {
//           console.log('Confirm Okay');
//         }
//       }
//     ]
//   });

//   await alert.present();
// }

}
