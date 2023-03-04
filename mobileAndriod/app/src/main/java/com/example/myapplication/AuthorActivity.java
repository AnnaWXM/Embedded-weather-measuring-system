package com.example.myapplication;

import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.os.PersistableBundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

public class AuthorActivity extends AppCompatActivity {

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.author);
        Intent intent = getIntent();
        ImageView imageView = findViewById(R.id.imageView);
        imageView.setImageResource(R.drawable.selfie);
    }

    public void toGitHub(View view){
        Uri git=Uri.parse("https://github.com/AnnaWXM\n");
        Intent github = new Intent(Intent.ACTION_VIEW,git);
        try {
            startActivity(github);
        }catch(ActivityNotFoundException e){
            //there is no viewer for web pages (http)
        }
    }

    public void toMain(View view){
        Intent backToMain = new Intent (this,MainActivity.class);
        startActivity(backToMain);
    }
}
