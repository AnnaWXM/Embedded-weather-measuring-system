package com.example.myapplication;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

public class TemActivity extends AppCompatActivity {
    public RequestQueue queue;
    private double realTime = 0.1;
    private double min = 0.1;
    private double max = 0.2;
    private double feels = 0.1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.temperature);
        queue = Volley.newRequestQueue(this);
        fetchData(this);
    }

    public void fetchData(TemActivity view){
        String url = "https://api.openweathermap.org/data/2.5/weather?q=tampere&units=metric&appid=6c433438776b5be4ac86001dc88de74d\n" ;
        StringRequest stringRequest =new StringRequest(Request.Method.GET, url,
                new Response.Listener<String>() {

                    public void onResponse(String response) {
                        Log.d("WEATHER_APP",response);
                        parseJsonAndUpdateUI(response);
                    }
                }, new Response.ErrorListener() {

            @Override
            public void onErrorResponse(VolleyError error) {
                Log.d("WEATHER_APP",error.toString());
            }

        });
        queue.add(stringRequest);
    }

    public void parseJsonAndUpdateUI(String response) {
        try {
            JSONObject temRespsonse = new JSONObject(response);
            realTime = temRespsonse.getJSONObject("main").getDouble("temp");
            min = temRespsonse.getJSONObject("main").getDouble("temp_min");
            max = temRespsonse.getJSONObject("main").getDouble("temp_max");
            feels = temRespsonse.getJSONObject("main").getDouble("feels_like");

            TextView realTimeTem = findViewById(R.id.realTimeTem);
            TextView minTem = findViewById(R.id.minTam);
            TextView maxTem = findViewById(R.id.maxTem);
            TextView feelTem = findViewById(R.id.feelTem);

            realTimeTem.setText(""+realTime+" C");
            minTem.setText(""+min+" C");
            maxTem.setText(""+max+" C");
            feelTem.setText(""+feels+" C");

        }catch (JSONException e){
            e.printStackTrace();
        }
    }
    public void toAuthor(View view){
        Intent author = new Intent(this,AuthorActivity.class);
        startActivity(author);
    }
    public void toMain(View view){
        Intent backToMain = new Intent (this,MainActivity.class);
        startActivity(backToMain);
    }

    protected void onSaveInstanceState(@NonNull Bundle outState) {
        super.onSaveInstanceState(outState);
        outState.putDouble("TEM",realTime);
        outState.putDouble("MIN",min);
        outState.putDouble("MAX",max);
        outState.putDouble("FEEL",feels);
    }


    protected void onRestoreInstanceState(@NonNull Bundle savedInstanceState) {
        super.onRestoreInstanceState(savedInstanceState);
        if(savedInstanceState !=null){
            realTime =savedInstanceState.getDouble("TEM",0);
            min =savedInstanceState.getDouble("MIN",0);
            max =savedInstanceState.getDouble("MAX",0);
            feels =savedInstanceState.getDouble("FEEL",0);
        }
        TextView realTimeTem = findViewById(R.id.realTimeTem);
        TextView minTem = findViewById(R.id.minTam);
        TextView maxTem = findViewById(R.id.maxTem);
        TextView feelTem = findViewById(R.id.feelTem);

        realTimeTem.setText(""+realTime+" C");
        minTem.setText(""+min+" C");
        maxTem.setText(""+max+" C");
        feelTem.setText(""+feels+" C");

    }
}
