package com.eismayilzada.fisk;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

public class HomeActivity extends AppCompatActivity {

    private Button signOutBtn;
    private final String sharedPrefFileName = "com.eismayilzada.fisk.sharedprefs.pref";
    private static SharedPreferences sharedPreferences;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);
        signOutBtn = findViewById(R.id.signOutBtn);
        sharedPreferences = getSharedPreferences(sharedPrefFileName,MODE_PRIVATE);
        if(sharedPreferences.contains("authToken")){
            Toast.makeText(HomeActivity.this, "User signed in", Toast.LENGTH_SHORT).show();
        }else{
            signOut();
        }
        signOutBtn.setOnClickListener(view -> {
            signOut();
        });
    }

    public void signOut(){
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.clear();
        editor.apply();
        Intent intent = new Intent(HomeActivity.this, MainActivity.class);
        startActivity(intent);
        finish();
    }
}