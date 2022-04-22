package com.eismayilzada.fisk;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    private Button signUpBtn;
    private Button signInBtn;
    private final String sharedPrefFileName = "com.eismayilzada.fisk.sharedprefs.pref";
    private static SharedPreferences sharedPreferences;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        signUpBtn = findViewById(R.id.signUpBtn);
        signInBtn = findViewById(R.id.signInBtn);
        sharedPreferences = getSharedPreferences(sharedPrefFileName,MODE_PRIVATE);

        if(sharedPreferences.contains("authToken")){
            Intent intent = new Intent(MainActivity.this,HomeActivity.class);
            startActivity(intent);
            finish();
        }
    }

    public void onSignInBtnClick(View view){
        Intent intent  = new Intent(MainActivity.this, SignInActivity.class);
        startActivity(intent);
    }
}