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
        registerPlugin(IntentMailPlugin.class);
        super.onCreate(savedInstanceState);
    }

}