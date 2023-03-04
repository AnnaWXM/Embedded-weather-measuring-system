package com.example.myapplication;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.TextView;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;


public class MainActivity extends AppCompatActivity {
    public RequestQueue queue;
    private double tem=0;
    private int pres=900 ;
    private int humi=30;
    private String desc="Sunny";


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        queue = Volley.newRequestQueue(this);
        fetchData(this);
    }

    @Override
    protected void onStart() {
        super.onStart();
        Log.d("MY_APP","MainActivity:onStartCalled");
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
    }

    @Override
    protected void onPause() {
        super.onPause();
    }

    @Override
    protected void onRestart() {
        super.onRestart();
    }

    @Override
    protected void onStop() {
        super.onStop();
    }

    public void toTem(View view){
        Intent toTem= new Intent(this,TemActivity.class);
        //toTem.putExtra("CityName","Tampere");
        startActivity(toTem);
    }
    public void toAuthor(View view){
        Intent author = new Intent(this,AuthorActivity.class);
        startActivity(author);
    }

    public void fetchData(MainActivity view){
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
            JSONObject weatherRespsonse = new JSONObject(response);
            tem = weatherRespsonse.getJSONObject("main").getDouble("temp");
            pres = weatherRespsonse.getJSONObject("main").getInt("pressure");
            humi = weatherRespsonse.getJSONObject("main").getInt("humidity");
            desc =weatherRespsonse.getJSONArray("weather").getJSONObject(0).getString("description");

            TextView temp =findViewById(R.id.tempValue);
            TextView pressure = findViewById(R.id.pValue);
            TextView humidity = findViewById(R.id.hValue);
            TextView description = findViewById(R.id.description);

            temp.setText(""+tem+" C");
            pressure.setText(""+pres+" Pa");
            humidity.setText(""+humi);
            description.setText(desc);

        }catch (JSONException e){
            e.printStackTrace();
        }
    }

    protected void onSaveInstanceState(@NonNull Bundle outState) {
        super.onSaveInstanceState(outState);
        outState.putString("WEATHER_DESCRIPTION",desc);
        outState.putDouble("TEMPERATURE",tem);
        outState.putInt("PRESSURE",pres);
        outState.putInt("HUMIDITY",humi);
    }


    protected void onRestoreInstanceState(@NonNull Bundle savedInstanceState) {
        super.onRestoreInstanceState(savedInstanceState);
        if(savedInstanceState !=null){
            desc =savedInstanceState.getString("WEATHER_DESCRIPTION");
            if(desc==null){
                desc = "Click update to refresh";
            }
            tem =savedInstanceState.getDouble("TEMPERATURE",0);
            pres = savedInstanceState.getInt("PRESSURE",0);
            humi = savedInstanceState.getInt("HUMIDITY",0);
        }
        TextView temp =findViewById(R.id.tempValue);
        TextView pressure = findViewById(R.id.pValue);
        TextView humidity = findViewById(R.id.hValue);
        TextView description = findViewById(R.id.description);
        description.setText(desc);
        temp.setText("" +tem + " C");
        pressure.setText(""+pres+" Pa");
        humidity.setText(""+humi);

    }

}

