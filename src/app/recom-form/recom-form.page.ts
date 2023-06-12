import { Component, OnInit, ViewChild } from '@angular/core';
import type { IonInput } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-recom-form',
  templateUrl: './recom-form.page.html',
  styleUrls: ['./recom-form.page.scss'],
})
export class RecomFormPage implements OnInit {
inputMail = '';
form: FormGroup;
inputMailEnt = '';
regMail = "^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$";
regText = "^[A-Za-z0-9_]$";
formSubmitted = false;
@ViewChild('ionInputMail', {static:true}) ionInputMail: IonInput;
@ViewChild('ionInputMailEnt', {static:true}) ionInputMailEnt: IonInput;

<<<<<<< HEAD
public alertButtons = [ {
  text: 'Ok',
  cssClass: 'alert-button-ok',
},
{
  text: 'Yes',
  cssClass: 'alert-button-confirm',
},];
onInput(ev){
  const value = ev.target!.value;
  const filteredValue = value.replace(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, '');

  this.ionInputMail.value = this.inputMail = filteredValue;
}

  constructor(private formBuilder: FormBuilder) { 
=======
  form: FormGroup;
  formSubmitted = false;
  nom:string;
  choice = {
    select:null
  };

  constructor(private formBuilder: FormBuilder,
    private alert: AlertController) { 
      this.choice.select = "telechargement";
>>>>>>> 4340311 (synchronisation DONE)
  }

  buildForm(){
    this.form = this.formBuilder.group({

      radioChoice: [''],

      
      mailEntrep: ['', [
        Validators.required, 
        Validators.email, 
        Validators.minLength(5),
        Validators.pattern(/.+@.+\..+/)]],

      mailPartage: ['', [Validators.required, 
        Validators.email, 
        Validators.minLength(5),
        Validators.pattern(/.+@.+\..+/)]],
  
      nomUtili: ['', [
        Validators.required,
        Validators.minLength(3)]],

      commentaire: ['', [
        Validators.maxLength(20)]]
    },

    );
  }

  // setMailValidators() {
  //   const mailPartage = this.form.get('mailPartage');
  //   const mailEntrep = this.form.get('mailEntrep');
  //   const nomUtili = this.form.get('nomUtili');

  //   this.form.get('radioChoice').value
  //     .subscribe(radioChoice => {


  //       if (radioChoice === "invite" ) {
  //         mailEntrep.setValidators([Validators.required]);
  //         nomUtili.setValidators([Validators.required]);
  //         mailPartage.setValidators(null);
  //       }

  //       if (radioChoice.value === "share" ) {
  //         mailEntrep.setValidators(null);
  //         nomUtili.setValidators(null);
  //         mailPartage.setValidators([Validators.required]);
  //       }

  //       mailEntrep.updateValueAndValidity();
  //       nomUtili.updateValueAndValidity();
  //       mailPartage.updateValueAndValidity();

  //     });
  // }

  ngOnInit() {
    this.buildForm();
    // this.setMailValidators();
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

  formType(){
  const invite = document.getElementById("invite") as HTMLHeadingElement;
  const shareMail = document.getElementById("mailPartage") as HTMLHeadingElement;
  const mail = document.getElementById("mail") as HTMLHeadingElement;
  const radioChoice = document.getElementById("radioChoice") as HTMLInputElement;


  if(radioChoice.value === "share" )
  {
    invite.style.display = "none";
    shareMail.style.display = "block";
    mail.style.display = "none";
    this.form.controls["mailPartage"].setValidators(Validators.required);
    this.form.controls["mailEntrep"].setValidators(null);
    this.form.controls["nomUtili"].setValidators(null);
  }

  if(radioChoice.value === "invite" )
  {
    shareMail.style.display = "none";
    invite.style.display = 'block';
    mail.style.display = "block";

    this.form.controls["mailPartage"].setValidators(null);
    this.form.controls["mailEntrep"].setValidators(Validators.required);
    this.form.controls["nomUtili"].setValidators(Validators.required);

  }
  
  this.form.get("mailPartage").updateValueAndValidity();
  this.form.get("mailEntrep").updateValueAndValidity();
  this.form.get("nomUtili").updateValueAndValidity();

}

}
