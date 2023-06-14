package com.colentre.autourdemoi;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.community.database.sqlite.CapacitorSQLite;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import android.os.Bundle; 
// import android.content.Intent;
// import android.net.Uri;
// import android.os.Bundle;
// import android.view.View;
// import android.widget.Button;
// import android.widget.EditText;
// import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(EchoPlugin.class);
        super.onCreate(savedInstanceState);
    }

}


    // EditText email;
    // EditText subject;
    // EditText body;
    // Button buttonSend;

    // @Override
    // protected void onCreate(Bundle savedInstanceState) {
    //     super.onCreate(savedInstanceState);
    //     setContentView(R.layout.activity_main);

    //     email = findViewById(R.id.etTo);
    //     subject = findViewById(R.id.etSubject);
    //     body = findViewById(R.id.etBody);
    //     buttonSend = findViewById(R.id.btnSend);

    //     buttonSend.setOnClickListener(new View.OnClickListener() {
    //         @Override
    //         public void onClick(View v) {
    //             if (!email.getText().toString().isEmpty() && !subject.getText().toString().isEmpty()
    //                 && !body.getText().toString().isEmpty()) {

    //                 Intent intent = new Intent(Intent.ACTION_SENDTO);
    //                 intent.putExtra(Intent.EXTRA_EMAIL, new String[]{email.getText().toString()});
    //                 intent.putExtra(Intent.EXTRA_SUBJECT, subject.getText().toString());
    //                 intent.putExtra(Intent.EXTRA_TEXT, body.getText().toString());
    //                 intent.setData(Uri.parse("mailto:"));

    //                 if (intent.resolveActivity(getPackageManager()) != null) {
    //                 startActivity(intent);
    //                 } else {
    //                     Toast.makeText(MainActivity.this, "There is no application that support this action",
    //                     Toast.LENGTH_SHORT).show();
    //                 }
    //             } else {
    //                 Toast.makeText(MainActivity.this, "Please fill all the fields",
    //                 Toast.LENGTH_SHORT).show();
    //             }
    //         }
    //     });

    // } 