#include <LiquidCrystal.h>                            // include LCD library
#include <Ethernet.h>                                 // include Ethernet libarty W5500 libr                            // incluide Ethernet library W5100
#include <TimerOne.h>                                 // include timer library
//                RS  E   D4  D5  D6  D7
LiquidCrystal lcd(37, 36, 35, 34, 33, 32);            // LCD pin wiring settings for MEGA
const int analog = 18;
const int BUTTON = 19;                                // Pushbutton Input to Pin No.19
volatile byte BUTTONState = LOW;                      // To store input statusconst int analog=A6;
//unsigned long time1 = 0;                              //for calculate interval
double frq=0;                                           // unit in Hz
double humidity=0;
double total=0;
int i_time = 0;
 double h_max = 0;
void fetch_IP(void);
double counter=0;                                    // when timer interval is 1s, frequency will be equal counter
double SumHum(void);
 

#define  mac_6    0x79     ///     Last mac number  MSB mac numbers at ethernet_mega.c    ///
                           //      Not relevat with Ethershield  
static uint8_t mymac[6] = { 0x44,0x76,0x58,0x10,0x00,mac_6 };

void setup() {
  // put your setup code here, to run once:
    pinMode(analog,INPUT);
    
    Serial.begin(9600);                                 // Serial monitor baudrate  = 9600
  
    lcd.begin(20,4);                                    // Display size defination 20 char  4 row
   
    //lcd.setCursor(0,0);                                 // set curosor to left upper corner
    //         01234567890123456789
    //lcd.print("24.3.2022 Alyk jatk ");                  // print to lCD 

    //Serial.println("Start 11.3.2022");                   // print to serial monitor
    
    fetch_IP();                                         // initialize Ethernet connection
                                                          // get IP number from DHCP
   attachInterrupt(digitalPinToInterrupt(analog), rising, RISING);       //get signal from analog
   Timer1.initialize( 1000000 );
   delay(1000);
   Timer1.attachInterrupt( SumHum ); 
   DDRE=B00010000;
}

void loop() 
{ 
  sprintf(bufa,"IOTJS={\"Humidity\":\"JJA\",\"\"}")
  if(PINE & B00010000){
    lcd.clear();
    lcd.setCursor(0,0);
    lcd.print("The button is pressed");
    lcd.setCursor(0,1);
    lcd.print("The max humidity");
    if(h_max < humidity){ h_max = humidity;}
    lcd.print(h_max);
    lcd.print("%");
    delay(1000);
    }
}

void fetch_IP(void)
{
  byte rev=1;
  lcd.setCursor(0,1);
  //         01234567890123456789  
  lcd.print("     Waiting IP     ");
  rev=Ethernet.begin( mymac);                  // get IP number
  Serial.print( F("\nW5100 Revision ") );
  if ( rev == 0){
                   Serial.println( F( "Failed to access Ethernet controller" ) );
                                                 // 0123456789012345689 
                   lcd.setCursor(0,0); lcd.print(" Ethernet failed   ");
                 }    
     Serial.println( F( "Setting up DHCP" ));
     Serial.print("Connected with IP: "); 
     Serial.println(Ethernet.localIP()); 
  lcd.setCursor(0,1);
  //         012345678901234567890
  lcd.print("                     ");
  lcd.setCursor(0,1);
  lcd.print("myIP=");
  lcd.print(Ethernet.localIP());
  delay(1500);
} 

void rising() {
  counter++;
}
 

double SumHum(){
  lcd.clear();
  if(counter!=0) frq=counter/1000;                            //unit in KHz
  Serial.println(frq);
  humidity = (514-(60*frq)); 
  lcd.setCursor(0,0);
  lcd.print("Frequncy=");
  lcd.print(frq);
  lcd.print("KHz");
  lcd.setCursor(0,1);
  lcd.print("Humidity= ");
  lcd.print(humidity);
  lcd.print("%");
  counter=0;
  i_time++;
  total += humidity;
  if(i_time%10 == 0){
    lcd.setCursor(0,2);
    lcd.print("average:");
    double average=total/i_time;
    lcd.print(average);
    lcd.print("%");
    }
  return humidity;
}