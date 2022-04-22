package com.eismayilzada.fisk;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

public class SignInActivity extends AppCompatActivity {

    private TextView emailTextView;
    private TextView passwordTextView;
    private Button signInBtn2;
    private RequestQueue queue;
    private final String sharedPrefFileName = "com.eismayilzada.fisk.sharedprefs.pref";
    private static SharedPreferences sharedPreferences;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_in);
        emailTextView = findViewById(R.id.emailTextView);
        passwordTextView = findViewById(R.id.passwordTextView);
        signInBtn2 = findViewById(R.id.signInBtn2);
        sharedPreferences = getSharedPreferences(sharedPrefFileName,MODE_PRIVATE);
    }
    public void onSignInBtn2Click(View view){
        String emailAddress = emailTextView.getText().toString();
        String password = passwordTextView.getText().toString();
        if(!emailAddress.isEmpty() && !password.isEmpty()){
            queue = Volley.newRequestQueue(SignInActivity.this);
            String url = "https://api.receipttracker.me/Account/SignIn?emailAddress="+emailAddress+"&Password="+password;
            JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.POST, url,
                    null, new Response.Listener<JSONObject>() {
                @SuppressLint("NotifyDataSetChanged")
                @RequiresApi(api = Build.VERSION_CODES.N)
                @Override
                public void onResponse(JSONObject response) {
                    try{
                        if(response!=null){
                            String status = response.getString("status");
                            if(status.equals("200")){
                                String token = response.getString("token");
                                signIn(token);
                                System.out.println(token);
                            }
                        }
                    } catch(JSONException e){
                        e.printStackTrace();
                    }

                }
            }, new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {
                    Log.e("Receipt Tracker API", "Failed to get data: "+error);
                }
            });
            queue.add(jsonObjectRequest);
        }
    }

    public void signIn(String token){
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.clear();
        editor.putString("authToken",token);
        editor.apply();
        Intent intent = new Intent(SignInActivity.this,HomeActivity.class);
        startActivity(intent);
        finish();
    }
}