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

@ViewChild('ionInputMail', {static:true}) ionInputMail: IonInput;
@ViewChild('ionInputMailEnt', {static:true}) ionInputMailEnt: IonInput;

public alertButtons = ['OK'];
onInput(ev){
  const value = ev.target!.value;
  const filteredValue = value.replace(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, '');

//   this.ionInputMail.value = this.inputMail = filteredValue;
}

  constructor(private formBuilder: FormBuilder) { 
    this.form = this.formBuilder.group({

      btnRadio: [''],
      
      mailEnt: ['', [Validators.required, Validators.email]],

      // shareMail: ['', [Validators.required, Validators.email]],
  
      idUtil: ['', [Validators.required]],

      comEnt: ['', [Validators.maxLength(20)]]

  });
  
  }

  ngOnInit() {

  }

  submitForm() {
    if (this.form.valid) {
      console.log(this.form.value);
      
      return console.log('Le formulaire est validé !');
      
  
  } else {
  
      return console.error('Le formulaire n\'est pas valide !');
  
  }
    // console.log(this.form.value);
  }

  formType(){
  const invite = document.getElementById("invite") as HTMLHeadingElement;
  const shareMail = document.getElementById("shareMail") as HTMLHeadingElement;
  const mail = document.getElementById("mail") as HTMLHeadingElement;
  const radioChoice = document.getElementById("radioChoice") as HTMLInputElement;


  if(radioChoice.value === "share" ){
    invite.style.display = "none";
    shareMail.style.display = "block";
    mail.style.display = "none";
    console.log("shareMail");
  }
  if(radioChoice.value === "invite" ){
    shareMail.style.display = "none";
    invite.style.display = 'block';
    mail.style.display = "block";
    console.log("inviter");
  }}

}
