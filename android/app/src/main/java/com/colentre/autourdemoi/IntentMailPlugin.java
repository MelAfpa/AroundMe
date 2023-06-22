package com.colentre.autourdemoi;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import android.os.Bundle; 
import android.util.Log;
import android.text.Html;
// import org.apache.commons.lang.StringEscapeUtils.escapeHtml;
import org.apache.commons.text.StringEscapeUtils;

import android.content.Intent;
import android.content.ActivityNotFoundException;

@CapacitorPlugin(name = "Intent")
public class IntentMailPlugin extends Plugin {

    @PluginMethod()
    public void intent(PluginCall call) {
        String value = call.getString("value");
        
        JSObject data = call.getData();

        String message = "";

Log.d("DEBUG", "IntentMailPlugin");

        final String email = data.has("email") ? data.getString("email") : null;
        Integer action = data.has("action") ? data.getInteger("action") : null;
        String subject1 = "Découvrez AutourDeMoi";
        String subject2 = "Intégrez AutourDeMoi";
        String mail1 = " Bonjour, \n J'ai découvert l'application Autour de Moi et je pense que son partage est intéressant.\n Elle permet de trouver des entrepreneurs respectant une charte défini (éthique, partage, intégrité ...) autour de soi.\n\n<a href='https://play.google.com/store/apps/details?id=com.colentre.autourdemoi'>Voici le lien de téléchargement</a>\n\n Cordialement,\n {{this.nom}}\n\nCe message a été envoyé par le collectif Colentre.\nAucun mail n'est enregistré en base de données.";
        
        String mail2 = "Bonjour, \nJ'ai découvert l'application Autour de Moi, elle permet de dénicher les entreprises et commerces autour de moi, répertoriés selon une charte défini (éthique, partage, intégrité ...).\nVotre commerce n'est pas présent sur le site, que penseriez-vous d'yfigurer ?\n\n<a href='https://autourdemoi.colentre.com/#'>Voici le lien vers le site internet</a>\n <a href='https://play.google.com/store/apps/details?id=com.colentre.autourdemoi'>Et celui de l'application sur Google play</a> \n\n Cordialement,\n{{this.nom}}\n\nCe message a été envoyé par le collectif Colentre.\nAucun mail n'est enregistré en base de données.";

        if(email != null && !email.trim().isEmpty() && action != null){
            
            final Intent emailIntent = new Intent(android.content.Intent.ACTION_SENDTO);
            emailIntent.setType("text/html");
            emailIntent.setData(Uri.parse("mailto:"));
            emailIntent.putExtra(Intent.EXTRA_EMAIL, new String[]{email});

Log.d("Variable", email);
Log.d("Variable", String.valueOf(action));


            if(action == 1){
                emailIntent.putExtra(Intent.EXTRA_SUBJECT, subject1);
                emailIntent.putExtra(Intent.EXTRA_TEXT, Html.fromHtml(mail1));


            } else {
                emailIntent.putExtra(Intent.EXTRA_SUBJECT, subject2);
                emailIntent.putExtra(Intent.EXTRA_TEXT, Html.fromHtml(mail2));

            }


            try {
                this.startActivityForResult(call, emailIntent, 1);
                // call.success();
                message = "success";
            } catch (ActivityNotFoundException activityError) {
                // call.error(activityError.getMessage());
                message = activityError.getMessage();
            }
        } else {
            message = "mail vide";
        }

        JSObject ret = new JSObject();
            ret.put("message", message);
            call.resolve(ret);

    }
}

